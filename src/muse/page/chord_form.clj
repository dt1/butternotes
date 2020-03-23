(ns muse.page.chord_form
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.clefs :as clf]
            [muse.page.page :as pg]
            [muse.page.head :as mhd])) 

(def key-sig-map {"No Sharps:"
                  [["0" "C / Am"]]

                  "Sharps:"
                  [["1" "G / Em"]
                   ["2" "D / Bm"]
                   ["3" "A / F&#9839;m"]
                   ["4" "E / C&#9839;m"]
                   ["5" "B / G&#9839;m"]
                   ["6" "F&#9839; / D&#9839;m"]
                   ["7" "C&#9839;"]]

                  "Flats:"
                  [["-1" "F / Dm"]
                   ["-2" "B&#9837; / Gm"]
                   ["-3" "E&#9837; / Cm"]
                   ["-4" "A&#9837; / Fm"]
                   ["-5" "D&#9837; / B&#9837;m"]
                   ["-6" "G&#9837; / E&#9837;m"]
                   ["-7" "C&#9837;"]]})

(defn create-radio-clef-group [&m]
  [:div.medium-12.columns
   [:p [:b "Use this form to make changes to the notation."]]
   [:p [:b  "You can change 1 item, all the items, anything in between."]]
   [:p "Change the Clef:"]
   (for [i clf/clef-radio-list]
     (cond (= (:clef &m) (i 0))
       [:input {:type "radio" :name "clef"
                :style "margin-left: 20px;" :value (i 0)
                :checked "checked"}
        [:img {:src (i 1)}]]
       
       (and (not (:clef &m))
            (= (i 0) "G1"))
       [:input {:type "radio" :name "clef"
                :style "margin-left: 20px;" :value (i 0)
                :checked "checked"}
        [:img {:src (i 1)}]]
              
       :else
       [:input {:type "radio" :name "clef"
                :style "margin-left: 20px;" :value (i 0)}
        [:img {:src (i 1)}]]))])

(defn create-key-sig-group [&m]
  [:select {:name "key-sig"}
   (for [[k v] key-sig-map]
     [:optgroup {:label k}
      (for [vv v]
        (cond (= (vv 0) (:key-sig &m))
              [:option {:value (vv 0)
                        :selected "selected"} (vv 1)]

              (and (not (:key-sig &m))
                   (= (vv 0) "0"))
              [:option {:value (vv 0)
                        :selected "selected"} (vv 1)]

              :else
              [:option {:value (vv 0)} (vv 1)]))])])

(defn chord-form [chord-name chord-type m]
  [:div.medium-8.columns
   [:ul.accordion {:data-accordion "data-accordion"
                   :data-allow-all-closed "true"}
    [:li.accordion-item
     [:a.accordion-title
      {:href "#collapse1"
       :role "tab"
       :id "collapse1-heading"
       :style "border-color: black"}"Show Scale Alteration Form"]
     [:div.accordion-content
      {:role "tabpanel"
       :data-tab-content "data-tab-content"
       :aria-labelledby "panel1d-heading"}

      [:form {:method "GET"}
       [:div.row
        (create-radio-clef-group m)]

       [:p]
       [:div.row
        [:div.medium-5.columns
         [:p "Change the Octave:"]
         (if (:octave m)
           [:input {:type "number" :min "1" :max "8" :step "1"
                    :style "width: 100px;" :name "octave"
                    :value (:octave m)}]
           [:input {:type "number" :min "1" :max "8" :step "1"
                    :style "width: 100px;" :name "octave"
                    :value "4"}])]]
       [:br]
       [:div.row
        [:div.medium-4.columns
         [:p "Change the Key Signature:"]
         (create-key-sig-group m)]]
       [:br]
       [:div.row
        [:div.medium-12.columns
         [:p "Change the Inversion::"]

         [:select {:style "width:100px" :name "inversion"}
          (for [i ["root" "1st" "2nd"]]
            (cond (= (:inversion m) i)
                  [:option {:value i
                            :selected "selected"} i]

                  (and (not (:inversion m))
                       (= i "root"))
                  [:option {:value i
                            :selected "selected"} i]

                  :else
                  [:option {:value i} i]))]]]
       
       [:br]
       [:div.row
        [:div.medium-12.columns
         [:input.button {:type "submit" :value "Submit"}]]]]]]]])

(defn chord-page [chord-type chord-name m &w]
  (pg/html-wrapper

   [:head 
    [:title (str "Butter Notes | " chord-name)]
    [:meta {:description "Butter Notes Blog Page"}]
    (for [hh ["global" "abcweb" "sounds"]
          :let [x (mhd/headers {:head-type hh})]]
      (for [xx x]
        xx))]
        
    [:div.row
     (pg/create-sublinks chord-type)
      [:div#notation.medium-12.columns]
     (chord-form chord-name chord-type m)
     [:div#test-div {:style "display:none"}
      &w]]))
