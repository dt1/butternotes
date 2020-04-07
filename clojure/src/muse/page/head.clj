(ns muse.page.head
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]

            [muse.utils.utils :as utils]))

(def osmd
  [:script {:src "/js/osmd/opensheetmusicdisplay.min.js"}])

(def xml-loader
  [:script {:scr "/js/osmd/xml-loader.js"}])

(def wad
  [:script {:src "/js/wad/wad.min.js"}])

(def zurb-css
  [:link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/foundation/6.2.4-rc2/foundation.min.css"}])

(def zurb-js
  [:script {:src "https://cdn.jsdelivr.net/foundation/6.2.4-rc2/foundation.min.js"}])

(def font-awsome
  [:link {:rel "stylesheet " :href "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"}])

(def main-css
  [:link {:rel "stylesheet" :href "/css/main3.css"}])

(def norder-css
  [:link {:rel "stylesheet" :href "/css/norder.css"}])

(def sortable
  [:script {:src "/js/sortable/sortable.js"}])

(defn note-to-str [s]
  (utils/capitalize-string (clojure.string/replace s #"-" " ")))


(defmulti headers
  (fn [x]
    (:head-type x)))

(defmethod headers "global" [x]
  [
   font-awsome
   main-css])

(defmethod headers "sounds" [x]
  [wad])

(defmethod headers "recording" [x]
  [wad])

(defmethod headers "osmd" [x]
  [osmd])

(defn head [note]
  [:head
   [:title (apply str "unknown | " (note-to-str note) " ")]
   [:meta {:name "description"
           :content (apply str "Learn the notes of the "
                           (note-to-str note) ". Listen, rearrange the notes, change the clefs, change the key signatures")
           
           }]
   (for [hh ["global" "osmd" "sounds"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))
   norder-css
   sortable])

(defn lab-head []
  [:head
   [:title "unknown | Lab"]
   (for [hh ["global" "osmd"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))])

(defn metronome-head []
  [:head
   [:title "unknown | Metronome"]
   (for [hh ["global" "sounds"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))])
