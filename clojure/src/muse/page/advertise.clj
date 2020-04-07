(ns muse.page.advertise
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn advertise []
  (pg/html-wrapper

   [:head 
    [:title "Butter Notes | About"]
    [:meta {:description "Information About Butter Notes"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]
   
   [:div.row
    [:h1 {:style "font-size:2em;"} "Advertise on Butter Notes"]

    [:h2 {:style "font-size:1.5em;"} "How Advertising Works"]

    [:p "The images ads found on the upper left corner are served from
this site. The ads are rotated, at random."]

    [:h2 {:style "font-size:1.5em;"} "The Numbers:"]

    [:p "In June 2017, Butter Notes recieved nearly 26,807 page views. It was
unusual because one article went viral. July 2017 on track to have 3,000+
pageviews with 1,000 visitors."]
    
    [:h2 {:style "font-size:1.5em;"} "Ad Standards:"]

    [:p "Images should be 285px × 50px in PNG format."]

    [:p "All user-tracking, outside affiliate codes, is strictly
forbidden."]

    [:h2 {:style "font-size:1.5em;"} "Advertising Plans:"]

    [:p "Ads are 10c per impression, with a minimal order of $100. All orders
should be even money, ie, $101, not $100.10. "]

    [:p "Affilate links are welcome, however, the affiliate percentage is not
allowed to replace or go against the base impression fee."]

    [:p "Ads do not show up in the store area or in any area that users log in."]

    [:h2 {:style "font-size:1.5em;"} "Order an Ad:"]

    [:p "To order an ad, please contact me at "
     [:a {:href "mailto:david.t@butternotes.com?subject=advertise&body=Hello, David;"} "david.t@butternotes.com"]]

    [:p "Please include an image of your ad with the URL you would like to link to. 
After approval, I will contact you and set your account up."]]))
