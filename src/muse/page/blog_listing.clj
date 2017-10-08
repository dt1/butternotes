(ns muse.page.blog_listing
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.db.conn :as sql]))

(defn blog-list-page []
  (let [blog-titles (sql/get-blog-titles sql/db)]
    (pg/html-wrapper

     [:head mhd/item-scope
      [:title "Butter Notes | Blog Listing"]
      [:meta {:description "Butter Notes Blog Page"}]
      (for [x (mhd/headers {:head-type "global"})]
        x)]

     [:div
      [:h1 "Blog Articles"]
      (for [i blog-titles]
        [:div           
         [:p [:a {:href (str "/blog/" (:blog_id i))}
              (:blog_title i)]]])])))
