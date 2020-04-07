(ns muse.utils.utils
  (:require [clojure.string :as c-str]))

(defn capitalize-string [s]
  "Capitalize every word in a string"
  (->>
   (c-str/split (str s) #"\b")
   (map c-str/capitalize)
   c-str/join))
