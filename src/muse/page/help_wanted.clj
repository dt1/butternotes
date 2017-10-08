(ns muse.page.help_wanted
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn help-wanted []
  (pg/html-wrapper

   [:head mhd/item-scope
    [:title "Butter Notes | Help Wanted"]
    [:meta {:description "Butter Notes Help Wanted Page"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]

   [:div.row
    [:h1 "Help Wanted at Butter Notes"]

    [:h2 {:style "font-size:1.5em;"} "Freelance Designer for T-Shirts, etc."]

    [:p "I have a few design ideas for t-shirts I'd like to sell. I would like to expand the product line to include other items, like mugs, and who knows what else. I'm starting by selling one-color, screen-printed t-shirts."]

    [:p "I don't have enough work to hire someone full time, but I would like to work with one individual for as long as possible. Ideally, I'd like to keep a relatively consistent style. I would like to release one shirt every 1 to 2 weeks, to start."]

    [:p "I'm not interested in working with a company. Due to locality, I'd like to work with someone based in the United States."]

    [:p "I will only make a decision based on your portfolio, and, in part, what you would like to charge. I'm open to all sorts of arrangements, but I'm not entirely sure what price is fair, since I'm looking for a
on-going deal."]

    [:p "Please contact me at "
     [:a {:href "mailto:david.t@butternotes.com?subject=Designer"}
                                 "david.t@butternotes.com"]]]))
