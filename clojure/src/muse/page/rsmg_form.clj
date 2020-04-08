(ns muse.page.rsmg_form
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [ring.util.anti-forgery :refer [anti-forgery-field]]
            [muse.page.clefs :as clf]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn create-radio-clef-group []
  [:div.medium-12.columns
   [:p "Choose a Clef:"]
   (for [i clf/clef-radio-list]
     [:input {:type "radio" :name "clef" :class "clef"
              :style "margin-left: 20px;" :value (i 0)}
      [:img {:src (i 1)}]])
   [:input {:type "radio" :name "clef" :checked "checked" :class "clef"
            :style "margin-left: 20px;" :value "random"}
    "random"]])

(def key-sig-map {"Random"
                  [["random" "Random"]]

                  "No Sharps:"
                  [["c-major-scale" "C / Am"]]

                  "Sharps:"
                  [["g-major-scale" "G / Em (1)"]
                   ["d-major-scale" "D / Bm (2)"]
                   ["a-major-scale" "A / F&#9839;m (3)"]
                   ["e-major-scale" "E / C&#9839;m (4)"]
                   ["b-major-scale" "B / G&#9839;m (5)"]
                   ["f-sharp-major-scale" "F&#9839; / D&#9839;m (6)"]
                   ["c-sharp-major-scale" "C&#9839; (7)"]]

                  "Flats:"
                  [["f-major-scale" "F / Dm (1)"]
                   ["b-flat-major-scale" "B&#9837; / Gm (2)"]
                   ["e-flat-major-scale" "E&#9837; / Cm (3)"]
                   ["a-flat-major-scale" "A&#9837; / Fm (4)"]
                   ["d-flat-major-scale" "D&#9837; / B&#9837;m (5)"]
                   ["g-flat-major-scale" "G&#9837; / E&#9837;m (6_"]
                   ["c-flat-major-scale" "C&#9837; (7)"]]})

(defn create-key-sig-group []
  [:div.row
   [:div.medium-4.columns
    [:p "Select the Key Signature:"]
    [:select {:name "key-sig"}
     (for [[k v] key-sig-map]
       [:optgroup {:label k}
        (for [vv v]
          [:option {:value (vv 0)} (vv 1)])])]]
   [:div.medium-8.columns]])

(defn create-key-group []
  [:div.row
   [:div.medium-4.columns
    [:p "Select the Key:"]
    [:select {:name "key"}
     (for [[k v] key-sig-map]
       [:optgroup {:label k}
        (for [vv v]
          [:option {:value (vv 0)} (vv 1)])])]]
   [:div.medium-8.columns]])

(defn create-octave-dd []
  [:div.row
   [:div.medium-4.columns
    [:p "Select Octave"]
    [:select {:name "octaves"}
     [:option {:value "random"} "random"]
     [:option {:value "0"} "1"]
     [:option {:value "1"} "2"]
     [:option {:value "2"} "2 octaves (1 & 2)"]]]])

(defn create-bars []
  [:div.row
   [:div.medium-4.columns
   [:p "How Many Bars?"]
    [:input {:type "number" :min "0" :max "100" :name "bars"
             :required "true"}]]])

(defn rsmg []
  

   [:head 
    [:title (str "Butter Notes | Random Sheet Music Generator")]
    [:meta {:description "A Random Sheet Music Generator"}]
    (for [hh ["global"]
          :let [x (mhd/headers {:head-type hh})]]
      (for [xx x]
        xx))]

   [:form {:method "POST" :action "/random-sheet-music-generator-result"}
    [:h1 {:style "font-size: 2em;"} "Random Sheet Music Generator"]
    (create-bars)
    (create-radio-clef-group)
    (create-key-sig-group)
    (create-key-group)
    (create-octave-dd)
    [:br]
    [:div.row
     [:p "4/4 Time Signature;"]
     [:p "All Quarter Notes;"]
     [:p "(options coming soon!)"]]
    (anti-forgery-field)
    [:input {:type "submit" :value "Go Go Go!" :class "button"}]])
