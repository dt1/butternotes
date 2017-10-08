(ns muse.page.sidenav
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
  (let [x (vxm/valid-xn-map scl)]
    [:ul.menu.vertical.nested
     (for [xx x]
       [:li
        [:a {:href (str "/" scl "/" xx
                        "/c-" (apply str (butlast xx)))}
         (-> xx
             (c-str/replace #"scales" "")
             (c-str/replace #"modes" "")
             (c-str/replace #"chords" "")
             (c-str/replace #"-" " ")
             (capitalize-scales))]])]))

(defn scales-nav []
  [:ul.menu.vertical.nested
   [:li
    [:a {:href "/chromatic-scales/c-chromatic-scale"} "Chromatic"]]
   [:li
    [:a {:href "/major-scales/c-major-scale"} "Major"]]
   [:li
    [:a {:href "#"} "Minor"]
    (submenu-links "minor-scales")]
   [:li
    [:a {:href "#"} "Diatonic"]
    (submenu-links "diatonic-scales")]
   [:li
    [:a {:href "#"} "Pentatonic"]
    (submenu-links "pentatonic-scales")]
   [:li
    [:a {:href "#"} "Hexatonic"]
    (submenu-links "hexatonic-scales")]
   [:li
    [:a {:href "#"} "Hepatonic"]
    (submenu-links "hepatonic-scales")]
   [:li
    [:a {:href "#"} "Octonic"]
    (submenu-links "octonic-scales")]])

(defn chords-nav []
  [:ul.menu.vertical.nested
   [:li
    [:a {:href "#"} "Major"]
    (submenu-links "major-chords")]
   [:li
    [:a {:href "#"} "Minor"]
    (submenu-links "minor-chords")]
   [:li
    [:a {:href "#"} "Augmented"]
    (submenu-links "augmented-chords")]
   [:li
    [:a {:href "#"} "Diminished"]
    (submenu-links "diminished-chords")]])

(defn music-links []
  [:ul.menu.vertical.nested
   [:li
    [:a {:href "/music/explore"} "Explore Musicians"]
    [:a {:href "/music/my-music"} "My Music (coming soon)"]]])

(defn side-nav []
   [:ul.vertical.menu
    {:data-accordion-menu "data-accordion-menu"}
    [:li
     [:a.black {:href "#"} "Scales"]
     (scales-nav)]
    [:li [:a.black {:href "#"} "Modes"]
     (submenu-links "modes")]
    [:li [:a.black {:href "#"} "Chords"]
     (chords-nav)]
    [:li [:a.black {:href "/lab"} "Lab"]]
    [:li [:a.black {:href "/random-sheet-music-generator"} "RSMG"]]
    [:li [:a.black {:href "/#"} "Music"]
     (music-links)]
    [:li [:a.black {:href "/metronome"} "Metronome"]]
    [:li [:a.black {:href "/blog"} "Blog"]]
    [:li [:a.black {:href "/advertise"} "Advertise"]]
    [:li [:a.black {:href "/about"} "About"]]
    [:li [:a.black {:href "/help-wanted"} "Help Wanted"]]])
