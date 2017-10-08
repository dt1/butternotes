(ns muse.page.explore_music_page
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.db.conn :as sql]))

(defn gen-musician-links []
  (let [links (sql/explore-musician-links sql/db)]
    (for [i links]
      [:div
       [:hr]
       [:p
        [:a {:href (str "/music/explore/" (:musician_id i))}
         (:musician_name i)] " ("(:genre i) ")"]
       [:img {:src (:thumbnail_path i)}]])))

(defn explore-musician-page []
  (pg/html-wrapper

   [:head mhd/item-scope
    [:title "Butter Notes | Explore Musicians"]
    [:meta {:description "Butter Notes Blog Page"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]
   
   [:div.medium-8.columns
    [:h1 {:style "font-size:2em;"} "Explore Music"]
    [:p "This is a collection of music I enjoy, focusing on lesser-known artists. This is an ecclectic mix;
discover something that amazes you. Come back often, as I add one new artist per day."]
    (gen-musician-links)]))
