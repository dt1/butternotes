(ns muse.genxml.genxml
  (:require [clojure.data.xml :refer :all]
            [clojure.math.numeric-tower :as math]
            [clojure.string :as c-str]
            [muse.genxml.scale_maps :as gsm]
            [muse.genxml.notevector :as nvr]
            [muse.utils.utils :as utils]))


(def key-nums ["0" "1" "2" "3" "4" "5" "6" "7"
               "-1" "-2" "-3" "-4" "-5" "-6" "-7"])

(def clefs ["G1" "F1" "F3" "C1" "C2" "C3" "C4"])

(defn decide-key-sig [m]
  (if (not= (m "key-sig") "random")
    (m "key-sig")
    (key-nums (rand-int (count key-nums)))))

;; etc
(defn add-octave [scale octave]
  (vec (concat (mapv #(conj % octave) scale))))

(defn get-subvec [scale sharp]
  (if (not (some #(= "C" %) (flatten scale)))
    (subvec scale (.indexOf scale ["D" sharp]))
    (subvec scale (.indexOf scale ["C" sharp]))))

(defn get-subvec-zero [scale sharp]
  (if (not (some #(= "C" %) (flatten scale)))
    (subvec scale 0 (.indexOf scale ["D" sharp]))
    (subvec scale 0 (.indexOf scale ["C" sharp]))))

(defn get-octave-info [root-note]
  (if (some #(= (root-note 0) %) ["A" "B" "C"])
    3
    4))

(defn get-2nd-root-octave-info [root-note]
  (if (some #(= (root-note 0) %) ["C" "D" "E" "F" "G"])
    (conj root-note 5)
    (conj root-note 4)))

(defn get-sharp-info-helper [coll note]
  (if (= (ffirst coll) note)
    ((first coll) 1)
    (recur (next coll) note)))

(defn get-sharp-info [scale]
  (if (some #(= "C" %) (flatten scale))
    (get-sharp-info-helper scale "C")
    (get-sharp-info-helper scale "D")))

(defn flatten-minor-note [note]
  (let [dm {nil -1
            1 nil}]
    (if (contains? dm (note 1))
      (assoc note 1 (dm (note 1)))
      (update note 1 dec))))

(defn minor-down [scale]
  (let [vscale (vec scale)
        flat6 (flatten-minor-note (vscale 1))
        flat7 (flatten-minor-note (vscale 0))]
    (-> vscale
        (assoc 0 flat7)
        (assoc 1 flat6))))

;; 2x on C;
(defn scale-vector [scale scale-type]
  (let [root-note (scale 0)
        octave-info (get-octave-info root-note)
        sharp-info (get-sharp-info scale)
        root-2nd-octave (get-2nd-root-octave-info root-note)
        scale-bottom (add-octave
                      (get-subvec-zero scale sharp-info) octave-info)
        scale-top (add-octave (get-subvec scale sharp-info)
                              (inc octave-info))]
    (cond (= scale-type "melodic-minor-scale")
          (vec (concat
                scale-bottom
                (butlast scale-top)
                [root-2nd-octave]
                (minor-down
                 (concat
                  (rest
                   (reverse
                    scale-top))
                  (reverse
                   scale-bottom)))))

          (and (contains? gsm/scale-map scale-type)
               (contains? (gsm/scale-map scale-type) root-note))
              ((gsm/scale-map scale-type) root-note)

          :else
          (vec (concat
                scale-bottom
                (butlast scale-top)
                (vector root-2nd-octave)
                (rest
                 (reverse
                  scale-top))
                (reverse
                 scale-bottom))))))

(def aa  (scale-vector [["C" nil] ["D" nil] ["E" nil] ["F" nil] ["G" nil] ["A" nil] ["B" nil] ["C" nil]] "major"))

(repeatedly 40 #(rand-nth aa))

(defn chord-vector [chord]
  (let [root-note (chord 0)
        octave-info (get-octave-info root-note)
        sharp-info (get-sharp-info chord)
        chord-bottom (add-octave
                      (get-subvec-zero chord sharp-info) octave-info)
        chord-top (add-octave (get-subvec chord sharp-info)
                              (inc octave-info))]
    (vec (concat
          chord-bottom
          chord-top))))

(defn convert-accidentals [s]
  (-> s
      (c-str/replace " Flat" "♭")
      (c-str/replace " Sharp" "♯")))

(def el element)

(defn gen-work [scale]
  (let [cscale (convert-accidentals
                (c-str/replace
                 (utils/capitalize-string scale)
                 "-" " "))]
    (el :work {}
        (el :work-title {} cscale))))

(defn gen-identification []
  (el :identification {}
      (el :encoding {}
          (el :software {} "butternotes.com"))))

(defn gen-part-list []
  (el :part-list {}
      (el :score-part {:id "P1"}
          (el :part-name {}  ""))))

(defn gen-attributes [&m]
  (el :attributes {}
      (el :divisions {} 32)
      (el :key {}
          (if (:key-sig &m)
            (el :fifths {} (:key-sig &m))
            (el :fifths {} 0)))
      (if (:clef  &m)
        (el :clef {}
            (el :sign {} (str (first (:clef &m))))
            (el :line {} (str (second (:clef &m)))))

        (el :clef {}
            (el :sign {} "G")
            (el :line {} "2")))

      (if (:time-sig &m)
        (el :time {}
            (el :beats {} (str (first (:time-sig &m))))
            (el :beat-type {} (str (second (:time-sig &m)))))
        ;; (el :time {}
        ;;     (el :beats {} "4")
        ;;     (el :beat-type {} "4"))
        )))

(def hexatonic-scales  ["augmented-scale"
                        "blues-scale"
                        "major-hexatonic-scale"
                        "minor-hexatonic-scale"
                        "prometheus-scale"
                        "tritone-scale"
                        "two-semitone-tritone-scale"
                        "whole-tone-scale"])

(defn dnorder-fn [dnorder tsv diff-n]
  (into []
        (for [zz dnorder
              :when (not= zz \,)
              :let [zz (- diff-n (Integer/parseInt (str zz)))]]
          (tsv zz))))

(defn create-dnorder [x]
  (-> x
      (c-str/replace #"\\" "")
      (c-str/replace #" " "")
      (c-str/replace #"\(" "")
      (c-str/replace #"\)" "")
      (reverse)
      (rest)))

;; 2x for C; 2x
(defn sv [scale scale-type m]
  (if (or (empty? m)
          (nil? m)
          (= (:norder m) ""))
    (scale-vector scale scale-type)

    (let [tsv (scale-vector scale scale-type)
          unorder (:norder m)
          dnorder (create-dnorder (:norder m))]
      (concat
       (into []
             (for [z unorder
                   :when (not= z \,)
                   :let [z (Integer/parseInt (str z))]]
               (tsv z)))

       (cond (some #(= scale-type %) ["major-pentatonic-scale"
                                      "minor-pentatonic-scale"])
             (dnorder-fn dnorder tsv 10)

             (some #(= scale-type %) hexatonic-scales)
             (dnorder-fn dnorder-fn tsv 12)

             (= scale-type "diminished-scale")
             (dnorder-fn dnorder tsv 18)

             (= scale-type "chromatic-scale")
             (dnorder-fn dnorder tsv 24)

             :else
             (dnorder-fn dnorder tsv 14))))))

(defn update-octave [scale m]
  (if (not (:octave m))
    scale
    (let [dif (- (Integer/parseInt (:octave m))
                 (((vec scale) 0) 2))]
      (into []
            (for [n scale]
              (assoc n 2 (+ (n 2) dif)))))))

;; (defn gen-scale-xml [scale scale-type m]
;;   (let [nscale (update-octave scale m)]
;;     (prn (count nscale))
;;         (for [[notes x] (map list (partition 4 nscale)
;;                             (range 1 (inc (count nscale))
;;                                    ))]
;;           (el :measure {:number x}
;;               (if (= x 1)
;;                 (gen-attributes m))
;;               (for [note notes]
;;                 (if note
;;                   (el :note {}
;;                       (el :pitch {}
;;                           (el :step {} (note 0))
;;                           (if (note 1)
;;                             (el :alter {} (note 1)))
;;                           (el :octave {} (note 2)))
;;                       (el :duration {} 32))
;;                   (el :note {}
;;                 ;                      (el :rest {})
;;                       (el :pitch {}
;;                           (el :step {} "F")
;;                           (el :octave {} "3"))
;;                       (el :duration {} 32)
;; ;                      (el :voice {} 1)
;;                       ))
;;                 )))))

(defn gen-scale-xml [scale scale-type m]
  (let [nscale (update-octave scale m)]
    (for [note nscale]
      (el :note {}
          (el :pitch {}
              (el :step {} (note 0))
              (if (note 1)
                (el :alter {} (note 1)))
              (el :octave {} (note 2)))
          (el :duration {} 32)
          (el :type {} "quarter")))))

(def chord-inversion-map {"root" 0
                          nil 0
                          "1st" 1
                          "2nd" 2})

(defn update-chord-octave [c]
  (for [i c]
    (if (nil? i)
      (assoc i 2 1)
      (update i 2 inc))))

(defn invert-chord [chord m]
  (let [i (chord-inversion-map (:inversion m))]
    (vec (concat (subvec chord i)
                 (update-chord-octave (subvec chord 0 i))))))

(defn gen-chord-xml [chord chord-type m]
  (let [nchord (invert-chord
                (update-octave chord m)
                m)]
    (for [note nchord]
      (el :note {}
          (if (not= (ffirst nchord) (note 0))
            (el :chord))
          (el :pitch {}
              (el :step {} (note 0))
              (if (note 1)
                (el :alter {} (note 1)))
              (el :octave {} (note 2)))
          (el :duration {} 128)
;          (el :type {} "quarter")
          ))))


(defn convert-fs [note-vector]
  (let [bb {1 "-sharp"
            -1 "flat"
            nil ""}]
    (if (contains? bb (note-vector 1))
      (vector
       (apply str
              (c-str/lower-case (note-vector 0))
              (bb (note-vector 1))))
      ["theory"])))


(defn gen-measure-one [scale iname m]
  (let [scale-type (nvr/get-ntype iname)]
    (el :part {:id "P1"}
        (el :measure {:number 1}
            (gen-attributes m)
            (cond (or (not (nil? (re-matches #".*scale" scale-type)))
                      (not (nil? (re-matches #".*mode" scale-type))))
                  (gen-scale-xml scale scale-type m)

                  (not (nil? (re-matches #".*chord" scale-type)))
                  (gen-chord-xml scale scale-type m))))))

(defn gen-sheet-music [scale iname &m]
  (el :score-partwise {:version "3.1"}
      (gen-work iname)
      (gen-identification)
      (gen-part-list)
      (gen-measure-one scale iname &m)))

(def octaves {"G1" [4 5 6 7]
              "F1" [1 2 3]
              "F3" [1 2 3]
              "C1" [3 4]
              "C2" [3 4]
              "C3" [3 4]
              "C4" [3 4]})

(subvec (octaves "G1") 0 2)

(def sharp-nil-flat [-1 nil 1])

(def note-letters "CDEFGAB")

(defn rall-notes [bars]
  (repeatedly bars #(rand-nth nvr/all-note-seed)))


(defn randomized-notes [bars notes]
  (repeatedly bars #(rand-nth notes)))

(defmulti gen-rsmg-vector
  (fn [x]
    (:vtype x)))

(defmethod gen-rsmg-vector "random" [x]
  (let [clef ((:m x) :clef)
        bars (* 4 ((:m x) :bars))
        random-note-vec (rall-notes bars)
        octaves ((:m x) :octave)]
    (into []
          (for [x random-note-vec]
            (conj x (rand-nth octaves))))))

(defmethod gen-rsmg-vector "not-random" [x]
  (let [clef ((:m x) :clef)
        bars (* 4 ((:m x) :bars))
        note-vec (randomized-notes bars (nvr/get-notes ((:m x) :key)))
        octaves ((:m x) :octave)]
    (into []
          (for [x note-vec]
            (conj x (rand-nth octaves))))))


(defn decide-clef [m]
  (if (not= (m "clef") "random")
    (m "clef")
    (clefs (rand-int (count clefs)))))

(defn decide-octave [m clef]
  (cond (= (m "octaves") "random")
        (octaves clef)

        (= (m "octaves") "0")
        (subvec (octaves clef) 0 1)

        (= (m "octaves") "1")
        (subvec (octaves clef) 1 2)

        (= (m "octaves") "2")
        (subvec (octaves clef) 0 2)))


(defn decide-key [m]
  (let [k (m "key")]
    (if (not= k "random")
      (nvr/get-ntype k)
      "random")))

(defn init-rsmg [pm]
  (let [clef (decide-clef pm)
        m {:clef clef
           :key-sig (decide-key-sig pm)
           :time-sig "44"
           :octave (decide-octave pm clef)
           :bars (Integer/parseInt (pm "bars"))
           :key (pm "key")
           }]
    (if (= (pm "key") "random")
      (gen-rsmg-vector {:vtype "random"
                                :m m})
      (gen-rsmg-vector {:vtype "not-random"
                                :m m}))))

(defn gen-random-sheet-music [rsmg-vec pm]
  (let [clef (decide-clef pm)
        m {:clef clef
           :key-sig (decide-key-sig pm)
           :time-sig "44"
           :bars (Integer/parseInt (pm "bars"))}]
    (el :score-partwise {:version "3.0"}
        (gen-work "Random Music")
        (gen-identification)
        (gen-part-list)
        (el :part {:id "P1"}
            (for [[i x] (map list (partition 4 rsmg-vec)
                             (range 1 (inc (count rsmg-vec))))]
              (el :measure {:number x}
                  (if (= x 1)
                    (gen-attributes m))
                  (for [j i]
                    (el :note {}
                        (el :pitch {}
                            (el :step {}
                                (j 0))
                            (el :alter {} 
                               (j 1))
                            (el :octave {}
                                (j 2)))
                        (el :duration {} 32)
                        (el :type {} "quarter")))))))))
