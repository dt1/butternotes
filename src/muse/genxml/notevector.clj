(ns muse.genxml.notevector
  (:require [clojure.string :as c-str]
            [muse.genxml.scale_maps :as gsm]))

(def note-letters-vec ["C" "D" "E" "F" "G" "A" "B"])

(def all-note-seed [["C" -1] ["C" nil] ["C" 1]
                    ["D" -1] ["D" nil] ["D" 1]
                    ["E" -1] ["E" nil] ["E" 1]
                    ["F" -1] ["F" nil] ["F" 1]
                    ["G" -1] ["G" nil] ["G" 1]
                    ["A" -1] ["A" nil] ["A" 1]
                    ["B" -1] ["B" nil] ["B" 1]])

;(repeatedly 1 #(rand-nth all-note-seed))

(def sharp-note-seed [["C" nil] ["C" 1] ["D" nil] ["D" 1]
                      ["E" nil] ["F" nil] ["F" 1] ["G" nil]
                      ["G" 1] ["A" nil] ["A" 1] ["B" nil]])

(def flat-note-seed [["C" nil] ["D" -1] ["D" nil] ["E" -1]
                     ["E" nil] ["F" nil] ["G" -1] ["G" nil]
                     ["A" -1] ["A" nil] ["B" -1] ["B" nil]])

(def major-url-notes {"c" ["C" nil]
                      "c-sharp" ["C" 1]
                      "d-flat" ["D" -1]
                      "d" ["D" nil]
                      "d-sharp" ["D" 1]
                      "e-flat" ["E" -1]
                      "e" ["E" nil]
                      "e-sharp" ["E" 1]
                      "f-flat" ["F" -1]
                      "f" ["F" nil]
                      "f-sharp" ["F" 1]
                      "g-flat" ["G" -1]
                      "g" ["G" nil]
                      "g-sharp" ["G" 1]
                      "a-flat" ["A" -1]
                      "a" ["A" nil]
                      "a-sharp" ["A" 1]
                      "b-flat" ["B" -1]
                      "b" ["B" nil]
                      "b-sharp" ["B" 1]
                      "c-flat" ["C" -1]})

;; 10x on C; 6x
(defn rotate-notes [root-note note-seed]
  (vec (concat (subvec note-seed (.indexOf note-seed root-note))
               (subvec note-seed 0 (.indexOf note-seed root-note))
               (vector root-note))))

(def note-letters "CDEFGAB")

; 5x on C; 3x
(defn rotate-note-letters [root-note]
  (apply str (subs note-letters (.indexOf note-letters root-note))
         (subs note-letters 0 (.indexOf note-letters root-note))))

(defn get-note-seed [root-note]
  (if (= (root-note 1) 1)
    sharp-note-seed
    flat-note-seed))

;; 5x on C; 3x
(defn init-scale [root-note]
  (let [note-seed (get-note-seed root-note)
        [tonic _ supertonic _ mediant
         subdominant _ dominant _ submediant _
         leading-tone tonic] (rotate-notes root-note note-seed)]
    [tonic supertonic mediant subdominant dominant submediant
     leading-tone tonic]))


(defn valid-scale? [scale-candidate]
  (let [flattened-scale (filter string? (flatten scale-candidate))]
    (= (dec (count flattened-scale))
       (count (set flattened-scale)))))

(defn fix-scale-helper [s-can rotated-scale r-lett]
  (for [i rotated-scale]
    (if (= (str r-lett) (str (i 0)))
      (vector (str r-lett) (- (.indexOf rotated-scale s-can)
                              (.indexOf rotated-scale i))))))

(defn fix-scale [root-note scale-candidate]
  (let [note-seed (get-note-seed root-note)
        rotated-scale (rotate-notes root-note note-seed)
        rotated-letters (rotate-note-letters (root-note 0))]
    (into []
          (for [[s-can r-lett] (map list scale-candidate
                                    rotated-letters)]
            (if (= (str r-lett) (str (s-can 0)))
              s-can
              (first
               (remove nil?
                       (fix-scale-helper s-can
                                         rotated-scale
                                         r-lett))))))))

(defn create-scale [root-note]
  (let [scale-candidate (init-scale root-note)]
    (if (valid-scale? scale-candidate)
      scale-candidate
      (vec (concat
            (fix-scale root-note scale-candidate)
            (vector root-note))))))

;(create-scale ["C" nil])

(defn flatten-note [note]
  (let [dm {nil -1
            1 nil}]
    (if (contains? dm (note 1))
      (assoc note 1 (dm (note 1)))
      (update note 1 dec))))

(defn sharpen-note [note]
  (let [dm {nil 1
            -1 nil}]
    (if (contains? dm (note 1))
      (assoc note 1 (dm (note 1)))
      (update note 1 inc))))

(defmulti nmethod
  (fn [scale-info]
    (:scale-type scale-info)))

(defmethod nmethod "chromatic-scale" [scale-info]
  (let [rn (:root-note scale-info)]
    (if (= (rn 1) -1)
      (rotate-notes rn flat-note-seed)
      (rotate-notes rn sharp-note-seed))))

(defn fs-scale-notes [scl op nums]
  (loop [scl scl
         nums nums]
    (if (empty? nums)
      scl
      (recur (assoc scl (first nums) (op (scl (first nums))))
             (vec (rest nums))))))

(defn nil-note [scl nums]
  (loop [scl scl
         nums nums]
    (if (empty? nums)
      scl
      (recur (assoc scl (first nums) nil)
             (vec (rest nums))))))

(defn nat-note [scl nums]
  (loop [scl scl
         nums nums]
    (if (empty? nums)
      scl
      (recur (assoc scl (first nums) (scl (dec (first nums))))
             (vec (rest nums))))))


;; scales

(defmethod nmethod "major-scale" [scale-info]
  (let [root-note (:root-note scale-info)]
    (if (contains? (gsm/scale-map "major-scale") root-note)
      ((gsm/scale-map "major-scale") root-note)
      (create-scale root-note))))

(defn major-scale [scale-info]
  (nmethod {:scale-type "major-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "ionian-scale" [scale-info]
  (major-scale scale-info))

(defmethod nmethod "dorian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [2 6])))

(defmethod nmethod "lydian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale sharpen-note [3])))

(defmethod nmethod "phrygian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [1 2 5 6])))

(defmethod nmethod "aeolian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [2 5 6])))

(defmethod nmethod "mixolydian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [6])))

(defmethod nmethod "natural-minor-scale" [scale-info]
  (nmethod {:scale-type "aeolian-scale"
            :root-note (:root-note scale-info)}))

(defn aeolian-scale [root-note]
  (nmethod {:scale-type "aeolian-scale"
            :root-note (:root-note root-note)}))

(defmethod nmethod "harmonic-minor-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [3 6])))

(defmethod nmethod "melodic-minor-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [2])))

(defmethod nmethod "locrian-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [1 2 4 5 6])))

(defn locrian-scale [root-note]
  (nmethod {:scale-type "locrian-scale"
            :root-note (:root-note root-note)}))

(defmethod nmethod "major-pentatonic-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (nil-note scale [3 5]))))

(defmethod nmethod "minor-pentatonic-scale" [scale-info]
  (let [scale (nmethod {:scale-type "natural-minor-scale"
                        :root-note (:root-note scale-info)})]
    (filterv #(not (nil? %))
             (nil-note scale [1 5]))))

(defmethod nmethod "acoustic-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (-> scale
        (fs-scale-notes sharpen-note [3])
        (fs-scale-notes flatten-note [6]))))

(defn acoustic-scale [scale-info]
  (nmethod {:scale-type "acoustic-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "overtone-scale" [scale-info]
  (acoustic-scale scale-info))

(defmethod nmethod "lydian-dominant-scale" [scale-info]
  (acoustic-scale scale-info))

(defmethod nmethod "lydian-flat-seven-scale" [scale-info]
  (acoustic-scale scale-info))

(defmethod nmethod "whole-tone-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (fs-scale-notes sharpen-note [3 4 5])
                 (nil-note [6])))))

(defmethod nmethod "major-hexatonic-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (nil-note scale [6]))))

(defmethod nmethod "minor-hexatonic-scale" [scale-info]
  (let [scale (nmethod {:scale-type "aeolian-scale"
                        :root-note (:root-note scale-info)})]
    (filterv #(not (nil? %))
             (nil-note scale [5]))))

(defmethod nmethod "augmented-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (nat-note [3 5])
                 (nil-note [1])
                 (fs-scale-notes flatten-note [2])
                 (fs-scale-notes sharpen-note [5])))))

(defmethod nmethod "prometheus-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (fs-scale-notes sharpen-note [3])
                 (nil-note [4])
                 (fs-scale-notes flatten-note [6])))))

(defmethod nmethod "blues-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (nat-note [5])
                 (nil-note [1])
                 (fs-scale-notes flatten-note [2 4 6])))))

(defmethod nmethod "tritone-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (nat-note [5])
                 (fs-scale-notes flatten-note [1 4 6])
                 (nil-note [3])))))

(defmethod nmethod "two-semitone-tritone-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (filterv #(not (nil? %))
             (-> scale
                 (nat-note [2])
                 (fs-scale-notes flatten-note [1 5])
                 (fs-scale-notes sharpen-note [3])
                 (nil-note [6])))))

(defmethod nmethod "diminished-scale" [scale-info]
  (let [rn scale-info]
    (cond (some #(= rn %) [["D" -1] ["E" nil] ["G" nil] ["B" -1]])
          (rotate-notes rn ((gsm/scale-map "dim-scale") "degb"))

          (some #(= rn %) [["E" -1] ["F" 1] ["A" nil] ["C" nil]])
          (rotate-notes rn ((gsm/scale-map "dim-scale") "efac"))

          (some #(= rn %) [["D" nil] ["F" nil] ["A" -1] ["B" nil]])
          (rotate-notes rn ((gsm/scale-map "dim-scale") "dfab"))

          (some #(= rn %) [["G" -1]])
          (rotate-notes rn ((gsm/scale-map "dim-scale") "g-flat")))))

(defmethod nmethod "altered-scale" [scale-info]
  (let [scale (locrian-scale scale-info)]
    (fs-scale-notes scale flatten-note [3])))

(defmethod nmethod "double-harmonic-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [1 5])))

(defmethod nmethod "enigmatic-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (-> scale
        (fs-scale-notes flatten-note [1])
        (fs-scale-notes sharpen-note [3 4 5]))))

(defmethod nmethod "flamenco-scale" [scale-info]
  (nmethod {:scale-type "phrygian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "flamenco-mode" [scale-info]
  (nmethod {:scale-type "phrygian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "half-diminished-scale" [scale-info]
  (let [scale (locrian-scale scale-info)]
    (fs-scale-notes scale sharpen-note [1])))

(defmethod nmethod "locrian-sharp-two-scale" [scale-info]
  (let [scale (locrian-scale scale-info)]
    (fs-scale-notes scale sharpen-note [1])))

(defmethod nmethod "lydian-augmented-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale sharpen-note [3 4])))

(defmethod nmethod "neapolitan-minor-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [1 2 5])))

(defmethod nmethod "neapolitan-major-scale" [scale-info]
  (let [scale (major-scale scale-info)]
    (fs-scale-notes scale flatten-note [1 2])))

(defmethod nmethod "persian-scale" [scale-info]
  (let [scale (locrian-scale scale-info)]
    (fs-scale-notes scale sharpen-note [2 6])))

(defmethod nmethod "harmonic-major-scale" [scale-info]
  (let [scale (major-scale scale-info)
        flat6 (flatten-note (scale 5))]
    (fs-scale-notes scale flatten-note [5])))


;; modes

(defmethod nmethod "ionian-mode" [scale-info]
  (major-scale scale-info))

(defmethod nmethod "dorian-mode" [scale-info]
  (nmethod {:scale-type "dorian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "phrygian-mode" [scale-info]
  (nmethod {:scale-type "phrygian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "lydian-mode" [scale-info]
  (nmethod {:scale-type "lydian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "mixolydian-mode" [scale-info]
  (nmethod {:scale-type "mixolydian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "aeolian-mode" [scale-info]
  (nmethod {:scale-type "aeolian-scale"
            :root-note (:root-note scale-info)}))

(defmethod nmethod "locrian-mode" [scale-info]
  (nmethod {:scale-type "locrian-scale"
            :root-note (:root-note scale-info)}))

;; chords

(defmethod nmethod "major-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4])))

(defmethod nmethod "major-seventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 6])))

(defmethod nmethod "major-seventh-sharp-eleventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (conj
     (mapv #(scale %) [0 2 4 6])
     (sharpen-note (scale 3)))))

;; (nmethod {:scale-type "mss"
;;           :root-note ["C" nil]})

;; (nmethod {:scale-type "major-seventh-sharp-eleventh-chord"
;;           :root-note ["C" nil]})

(defmethod nmethod "major-ninth-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1])))

(defmethod nmethod "major-eleventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1 3])))

(defmethod nmethod "major-thirteenth-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1 5])))

(defmethod nmethod "major-sixth-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 5])))

;; (defmethod nmethod "major-seventh-sharp-eleventh-chord" [scale-info]
;;   (let [scale (nmethod {:scale-type "lydian-scale"
;;                         :root-note scale-info})]
;;     (mapv #(scale %) [0 2 4 6 3])))

(defmethod nmethod "major-sixth-ninth-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (mapv #(scale %) [0 2 4 5 1])))

(defmethod nmethod "minor-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4])))

(defmethod nmethod "minor-seventh-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 6])))

(defmethod nmethod "minor-ninth-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1])))

(defmethod nmethod "minor-eleventh-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1 3])))

(defmethod nmethod "minor-thirteenth-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 6 1 5])))

(defmethod nmethod "minor-sixth-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 5])))

(defmethod nmethod "minor-major-seventh-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (conj (mapv #(scale %) [0 2 4])
          (sharpen-note (scale 6))
          (scale 3))))

(defmethod nmethod "minor-sixth-ninth-chord" [scale-info]
  (let [scale (aeolian-scale scale-info)]
    (mapv #(scale %) [0 2 4 5 1])))

(defmethod nmethod "augmented-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (conj (mapv #(scale %) [0 2 4])
          (sharpen-note (scale 4)))))

(defmethod nmethod "augmented-major-seventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (conj (mapv #(scale %) [0 2])
          (sharpen-note (scale 4))
          (scale 6))))

(defmethod nmethod "diminished-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (into
     (vector (scale 0))
     (mapv #(flatten-note (scale %)) [2 4]))))

(defmethod nmethod "diminished-seventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (into
     (vector (scale 0))
     (mapv #(flatten-note (scale %)) [2 4 6]))))

(defmethod nmethod "diminished-major-seventh-chord" [scale-info]
  (let [scale (major-scale scale-info)]
    (into
     (vector (scale 0))
     (conj (mapv #(sharpen-note (scale %)) [2 4])
           (scale 6)))))

(defn nroot-type-helper [f n url]
  (c-str/join "-" (f n (c-str/split url #"-"))))

(defn get-ntype [url]
  (let [second-word (second (clojure.string/split url #"-"))]
    (if (some #(= second-word %) ["sharp" "flat"])
      (nroot-type-helper drop 2 url)
      (nroot-type-helper drop 1 url))))

(defn get-root-note [url]
  (let [second-word (second (clojure.string/split url #"-"))]
    (if (some #(= second-word %) ["sharp" "flat"])
      (nroot-type-helper take 2 url)
      (nroot-type-helper take 1 url))))

(defn get-notes [url]
  (let [root-note (get-root-note url)
        ntype (get-ntype url)]
    (nmethod {:scale-type ntype
              :root-note (major-url-notes root-note)})))
