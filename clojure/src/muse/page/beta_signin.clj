(ns muse.page.login
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [ring.util.anti-forgery :refer [anti-forgery-field]]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn login-page [& err]
  (pg/html-wrapper

   [:head 
    [:title "Butter Notes | About"]
    [:meta {:description "Information About Butter Notes"}]
    [:meta {:name "robots" :content "noindex"}]

    (for [x (mhd/headers {:head-type "global"})]
      x)]

   [:div.row
    (if err
      [:p {:style "color: red"} err])
    [:form {:method "post"}
     [:p "email"]
     [:input {:type "email" :style "width: 300px;"
              :required "required"
              :name "email"}]
     [:p "password (minimum 8 characters"]
     [:input {:type "password" :style "width: 300px;"
              :required "required" :pattern ".{8,}"
              :title "minimum 8 characters"
              :name "pwd"}]
     [:p "re-enter password"]
     [:input {:type "password" :style "width: 300px;"
              :required "required" :pattern ".{8,}"
              :name "pwd2"}]
     (anti-forgery-field)
     [:input {:type "submit" :class "button" :value "submit"}]]]))
