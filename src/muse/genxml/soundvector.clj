(ns muse.genxml.soundvector
  (:require [clojure.string :as c-str]))

(def note-letters "CDEFGAB")

(defn css2 [note f]
  (let [n (note 0)
        octave (note 2)
        letter-index (c-str/index-of note-letters n)
        new-letter (get note-letters (f letter-index))]
    [(str new-letter) nil octave]))

(defn css-helper [note]
  (let [bb {nil nil
            1 "#"
            -1 "b"}
        sf (note 1)]
    (cond (= sf 2)
          (css2 note inc)

          (= sf -2)
          (css2 note dec)

          :else
          (assoc note 1 (bb sf)))))

(defn scale-sound-vector [scale]
  (let [sv (mapv #(css-helper %) scale)
        scale-slug (mapv #(apply str %) sv)
        scale-string (str scale-slug)]
    (-> scale-string
        (c-str/replace #"\" \"" "','")
        (c-str/replace #"\"" "'"))))

(defn return-random-sound-vector [sv]
  (-> sv
      (c-str/replace #"\]\" \"\[" "', '")
      (c-str/replace #"\[\"" "")
      (c-str/replace #"\]\"" "'")
      (c-str/replace #"\\\"" "'")
      (c-str/replace #"nil" "")
      (c-str/replace #"' " "")
      (c-str/replace #"''" "'")
      (c-str/replace #"'#" "#")
      (c-str/replace #"'b" "b")
      (c-str/replace #" " "")))

