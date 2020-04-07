(ns muse.page.topnav
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.valid_xn_map :as vxm]
            [clojure.string :as c-str]))

(defn capitalize-scales [s]
  "Capitalize every word in a string"
  (->>
   (c-str/split (str s) #"\b")
   (map c-str/capitalize)
   c-str/join))

(defn submenu-links [scl]
  (let [x (sort (vxm/valid-xn-map scl))]
    [:ul.submenu.menu.vertical
     {:data-submenu "data-submenu"}
     (for [xx x]
       [:li.has-submenu
        [:a {:href (str "/" scl "/" xx
                        "/c-" (apply str (butlast xx)))}
         (-> xx
             (c-str/replace #"scales" "")
             (c-str/replace #"-" " ")
             (capitalize-scales))]])]))

(defn scales-nav []
  [:ul.submenu.menu.vertical
   [:li
    [:a {:href "/chromatic-scales/c-chromatic-scale"} "Chromatic"]]
   [:li
    [:a {:href "/major-scales/c-major-scale"} "Major"]]
   [:li.has-submenu
    [:a {:href "#"} "Minor"]
    (submenu-links "minor-scales")]
   [:li.has-submenu
    [:a {:href "#"} "Diatonic"]
    (submenu-links "diatonic-scales")]
   [:li.has-submenu
    [:a {:href "#"} "Pentatonic"]
    (submenu-links "pentatonic-scales")]
   [:li.has-submenu
    [:a {:href "#"} "Hexatonic"]
    (submenu-links "hexatonic-scales")]
   [:li.has-submenu
    [:a {:href "#"} "Hepatonic"]
    (submenu-links "hepatonic-scales")]
   [:li.has-submenu
    [:a {:href "#"} "Octonic"]
    (submenu-links "octonic-scales")]])

(defn music-links []
  [:ul.submenu.menu.vertical
   {:data-submenu "data-submenu"}
   [:li.has-submenu
    [:a {:href "/music/explore"} "Explore Musicians"]
    [:a {:href "/music/my-music"} "My Music (coming soon)"]]])

(defn top-nav []
  [:div 
   [:div.title-bar.wh_bkg
    {:data-hide-for "medium", :data-responsive-toggle "main-menu"}
    [:button.menu-icon {:data-toggle "data-toggle", :type "button"
                        :style "background-color: black;"}]
    [:div.title-bar-title {:style "color: black;"} "Menu"]]
   [:div#main-menu.top-bar
    [:div.top-bar-left
     [:h1 {:style "font-size: 1em;"}
      [:a.black {:href "/"} "Butter Notes"]
      [:br]
      [:small.black "Explore & Practice Music."]]
     [:ul.dropdown.menu
      {:data-dropdown-menu "data-dropdown-menu"}]]
    [:div.top-bar-left
     [:ul.menu
      {:data-responsive-menu "drilldown medium-dropdown"}
      [:li.has-submenu
       [:a {:href "#"} "Scales"]
       (scales-nav)]
      [:li [:a {:href "#"} "Modes"]
       (submenu-links "modes")]
      [:li [:a {:href "#"} "Chords"]
       (submenu-links "chords")]
      [:li [:a {:href "/lab"} "Lab"]]
      [:li [:a {:href "/random-sheet-music-generator"} "RSMG"]]
      [:li [:a {:href "/#"} "Music"]
       (music-links)]
      [:li [:a {:href "/metronome"} "Metronome"]]
      [:li [:a {:href "/blog"} "Blog"]]
      [:li [:a {:href "/about"} "About"]]
      [:li "|"]
      ;; [:li [:a..fi-mail
      ;;       {:href "/newsletter"
      ;;        :style "font-size:36px;"}]]
      ;; [:li [:a..fi-social-twitter
      ;;       {:href "https://twitter.com/ButternotesWeb"
      ;;        :style "font-size:36px;"}]]
      ;; [:li [:a..fi-social-facebook
      ;;       {:href "https://www.facebook.com/butternotescom-1735463286766016/"
      ;;        :style "font-size:36px;"}]]
      ;; [:li [:a.fi-social-pinterest
      ;;       {:href "https://www.pinterest.com/butternotes/"
      ;;        :style "font-size:36px;"}]]
      ]]]])
