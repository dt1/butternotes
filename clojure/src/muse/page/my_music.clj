(ns muse.page.my_music
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.db.conn :as sql]))

(defn my-music-page []
  (pg/html-wrapper
   
   [:head 
    [:title "Butter Notes | My Music"]
    [:meta {:description "My Music"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]
   
   "coming soon"))
