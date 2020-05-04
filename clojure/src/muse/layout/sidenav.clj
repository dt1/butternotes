(ns muse.layout.sidenav
  (:require [muse.valid_xn_map :as vxm]
            [muse.utils.utils :as utils]
            [clojure.string :as c-str]
            [muse.db.dbfns :as sql-fn]
            [muse.db.conn :as sql]))
(defn submenu-links [scl]
  (let [x (vxm/valid-xn-map scl)]
     (for [xx x]
         {:href (str "/" scl "/" xx
                     "/c-" (apply str (butlast xx)))
          :name
          (as->
              (c-str/replace xx #"scales" "") s
              (c-str/replace s #"modes" "")
              (c-str/replace s #"chords" "")
              (c-str/replace s #"-" " ")
              (utils/capitalize-string s))})))

(defn scales-nav []
  (vector {:name "Chromatic"
           :href "/chromatic-scales/c-chromatic-scale"}
          {:name "Major"
           :href "/major-scales/c-major-scale"}
          {:name "Minor"
           :href "#"
           :sub2 (submenu-links "minor-scales")}
          {:name "Diatonic"
           :href "#"
           :sub2 (submenu-links "diatonic-scales")}
          {:name "Pentatonic"
           :href "#"
           :sub2 (submenu-links "pentatonic-scales")}
          {:name "Hexatonic"
           :href "#"
           :sub2 (submenu-links "hexatonic-scales")}
          {:name "Hepatonic"
           :href "#"
           :sub2 (submenu-links "hepatonic-scales")}
          {:name "Octonic"
           :href "#"
           :sub2 (submenu-links "octonic-scales")}))

(defn chords-nav []
  (vector {:name "Major"
           :href "#"
           :sub2 (submenu-links "major-chords")}
          {:name "Minor"
           :href "#"
           :sub2 (submenu-links "minor-chords")}
          {:name "Augmented"
           :href "#"
           :sub2 (submenu-links "augmented-chords")}
          {:name "Diminished"
           :href "#"
           :sub2 (submenu-links "diminished-chords")}))

(defn lab-nav []
  (vector {:name "RSMG"
           :href "/lab/random-sheet-music-generator"}
          {:name "Metronome"
           :href "/lab/metronome"}))

(defn review-subnav [x]
  (let [menu {:plugins (sql-fn/plugin-menu sql/db)}]
    (menu x)))

(defn review-nav []
  (vector ;; {:name "Hardware"
          ;;  :href "/reviews/hardware"}
          {:name "Plugins"
           :href "#"
           :sub2 (review-subnav :plugins)}
          ;; {:name "Gear"
          ;;  :href "/reviews/hardware"}
          ;; {:name "Instruments"
          ;; :href "/reviews/hardware"}
          ))

(defn side-nav []
  {:sidenav (vector
             {:title "Scales"
              :href "#"
              :sub1 (scales-nav)}
             {:title "Modes"
              :href "#"
              :sub1 (submenu-links "modes")}
             {:title "Chords"
              :href "#"
              :sub1 (chords-nav)}
             {:title "Lab"
              :href "#"
              :sub1 (lab-nav)}
             {:title "Reviews"
              :href "#"
              :sub1 (review-nav)}
             {:title "On Programming"
              :href "#"
              :sub1 (sql-fn/on-programming-menu sql/db)}
             {:title "Resources"
              :href "/resources"}
             {:title "About"
              :href "/about"})})
