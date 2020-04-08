(ns muse.page.lab
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [clojure.data.xml :refer :all]
            [ring.util.anti-forgery :refer [anti-forgery-field]]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn lab-page [& arr]
  

   [:head 
    [:title "Butter Notes | Lab"]
    [:meta {:description "Butter Notes, Browse Labs"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)

    (if arr
      (for [x (mhd/headers {:head-type "abcweb"})]
        x))
    
    (for [x (mhd/headers {:head-type "sounds"})]
      x)]

   [:div.row

    [:h1 {:style "font-size:2em;"} "Lab: Work in Progress Ideas:"]
    
    [:p [:a {:href "/lab/generate-sheet-music"}
         "Generate Sheet Music"]]

    [:p [:a {:href "/lab/record-to-file"} "Record to File"]]])
