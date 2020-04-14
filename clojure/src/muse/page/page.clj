(ns muse.page.page
  (:require [compojure.core :refer :all]))


(def major-links-vec
  ["c" "c-sharp"
   "d-flat" "d" "d-sharp"
   "e-flat" "e" "e-sharp"
   "f-flat" "f" "f-sharp"
   "g-flat" "g" "g-sharp"
   "a-flat" "a" "a-sharp"
   "b-flat" "b" "b-sharp"
   "c-flat"])

(def dim-links-vec
  ["c"
   "d-flat" "d"
   "e-flat" "e"
   "f" "f-sharp"
   "g-flat" "g"
   "a-flat" "a"
   "b-flat" "b"])
