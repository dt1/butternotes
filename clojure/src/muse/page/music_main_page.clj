(ns muse.page.music_main_page
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn music-main-page []
  (pg/html-wrapper

   [:head 
    [:title "Butter Notes | Music Main Page"]
    [:meta {:description "Butter Notes Music Main Page"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]
   
     [:div.medium-12.columns
      [:p [:a {:style "color: blue;"
               :href "/music/explore"} "Explore Interesting Music"]]
      [:p [:a {:style "color: blue;"
               :href "/music/my-music"} "My Music (coming soon)"]]]))
