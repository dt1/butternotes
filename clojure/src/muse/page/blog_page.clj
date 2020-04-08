(ns muse.page.blog_page
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.db.conn :as sql]))

(defn blog-page [blog-id]
  (let [blog-info (first
                   (sql/blog-content sql/db {:blog_id blog-id}))]
    

     [:head 
      [:title (str "Butter Notes | " (:blog_title blog-info))]
      [:meta {:description (:blog_title blog-info)}]
      (for [x (mhd/headers {:head-type "global"})]
        x)]
     
     [:div.row
      [:h1 {:style "font-size: 2em;"}
       (:blog_title blog-info)]
      (:blog_content blog-info)]))
