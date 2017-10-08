(ns muse.page.musician_review_page
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.db.conn :as sql]))

(def mmap-list [[:website "fi-web"]
                [:youtube "fi-social-youtube"]
                [:facebook "fi-social-facebook"]
                [:twitter "fi-social-twitter"]
                [:instagram "fi-social-instagram"]
                [:bandcamp "Bandcamp"]
                [:patreon "Patreon"]
                [:amazon "fi-social-amazon"]
                [:apple "fi-social-apple"]])

(defn musician-review-page [musician-id]
  (let [musician-info (first
                       (sql/musician-page sql/db
                                          {:musician-id musician-id}))]

    (pg/html-wrapper

     [:head mhd/item-scope
      [:title (str "Butter Notes | "
                   (:musician_name musician-info)
                   " Mini-Review")]
      [:meta {:description (str "A Mini Review of "
                                (:musician_name
                                 musician-info))}]
      (for [x (mhd/headers {:head-type "global"})]
        x)]

     (let [mmap musician-info]
       [:div.medium-12.columns
        [:img {:src (:photo_path mmap)}]
        [:h1 (:musician_name mmap)]
        [:p (:genre mmap)]
        [:p (:review mmap)]
        (for [x mmap-list
              :let [lnk ((x 0) mmap)]
              :when lnk]
          (if (clojure.string/includes? (x 1) "fi-")
            [:span {:style "margin-right:1em;"}
             [:a {:href ((x 0) mmap)
                  :class (x 1)
                  :style "font-size:36px; color:black"}]]
            [:p
             [:a {:href ((x 0) mmap)} (x 1)]]))
        [:p (:youtube_video mmap)]]))))
