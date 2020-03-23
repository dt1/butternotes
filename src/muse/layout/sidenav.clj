(ns muse.layout.sidenav
  (:require [muse.valid_xn_map :as vxm]
            [muse.utils.utils :as utils]
            [clojure.string :as c-str]))

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
  (vector {:name "Chromatic" :href "/chromatic-scales/c-chromatic-scale"}
          {:name "Major" :href "/major-scales/c-major-scale"}
          {:name "Minor" :href "#"
           :sub2 (submenu-links "minor-scales")}
          {:name "Diatonic" :href "#"
           :sub2 (submenu-links "diatonic-scales")}
          {:name "Pentatonic" :href "#"
           :sub2 (submenu-links "pentatonic-scales")}
          {:name "Hexatonic" :href "#"
           :sub2 (submenu-links "hexatonic-scales")}
          {:name "Hepatonic" :href "#"
           :sub2 (submenu-links "hepatonic-scales")}
          {:name "Octonic" :href "#"
           :sub2 (submenu-links "octonic-scales")}))

(defn chords-nav []
  (vector {:name "Major"
           :sub2 (submenu-links "major-chords")}
          {:name "Minor"
           :sub2 (submenu-links "minor-chords")}
          {:name "Augmented"
           :sub2 (submenu-links "augmented-chords")}
          {:name "Diminished"
           :sub2 (submenu-links "diminished-chords")}))

(defn side-nav []
  {:sidenav (vector
             {:title "Scales"
              :sub1 (scales-nav)}
             {:title "Modes"
              :sub1 (submenu-links "modes")}
             {:title "Chords"
              :sub1 (chords-nav)}
             {:title "Lab"
              :href "/lab"}
             {:title "RSMG"
              :href "/random-sheet-music-generator"}
             {:title "Metronome" :href "#"})})
