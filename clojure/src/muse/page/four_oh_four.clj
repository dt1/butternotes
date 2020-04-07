(ns muse.page.four_oh_four
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn four-oh-four []
  (pg/html-wrapper
   
   [:head 
    [:title "Butter Notes | Page Not Found"]
    [:meta {:description "Page Not Found"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]

   [:p "404. Page is missing or under construction."]))
