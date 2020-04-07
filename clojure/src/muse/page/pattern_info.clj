(ns muse.page.pattern_info
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.db.conn :as sql]))

(defn pattern [scale-type]
  (let [scale-info (sql/select_scale_info sql/db
                                          {:scale_type scale-type})]
     [:div.medium-12.columns
      [:ul.accordion {:data-accordion "data-accordion"
                      :data-allow-all-closed "true"}
       [:li.accordion-item
        [:a.accordion-title
         {:href "#collapse1"
          :role "tab"
          :id "collapse1-heading"
          :style "border-color: black"}"Show Scale Patterns"]
        [:div.accordion-content
         {:role "tabpanel"
          :data-tab-content "data-tab-content"
          :aria-labelledby "panel1d-heading"}
         [:p  "Step Pattern: "(:scale_wh_pattern (first scale-info))]
         [:p  "Notation Pattern: "
          (:scale_fsn_pattern (first scale-info))]
         ]]]]))
