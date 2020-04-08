(ns muse.page.page
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]

            [muse.page.head :as mhd]
            [muse.page.topnav :as tnav]
            [muse.layout.sidenav :as snav]
            [muse.page.scale_form :as scm]
            [muse.page.pattern_info :as ppi]

            [clojure.string :as c-str]

            [muse.valid_xn_map :as vxm]
            [muse.db.conn :as sql]
            [muse.page.utils.playscale :as pscale]
            [muse.utils.utils :as utils]))

(defn note-to-str [s]
  (utils/capitalize-string
   (c-str/replace s #"-" " ")))

(defn mode-to-str [m]
  (note-to-str
   (last (c-str/split m #"/"))))

(defn gen-minor-url [dnotes]
  (-> ((vec dnotes) 5)
      (c-str/replace #"-aeolian-mode" "-natural-minor-scale")
      (c-str/replace #"/modes/aeolian-modes/"
                     "/minor-scales/natural-minor-scales/")
      (c-str/lower-case)))

(defn gen-minor-link [dnotes]
  (c-str/replace
   (mode-to-str ((vec dnotes) 5))
   #"Aeolian Mode" "Natural Minor Scale"))

(def major-links-vec
  ["c" "c-sharp"
   "d-flat" "d" "d-sharp"
   "e-flat" "e" "e-sharp"
   "f-flat" "f" "f-sharp"
   "g-flat" "g" "g-sharp"
   "a-flat" "a" "a-sharp"
   "b-flat" "b" "b-sharp"
   "c-flat"])

(def dim-links-vec
  ["c"
   "d-flat" "d"
   "e-flat" "e"
   "f" "f-sharp"
   "g-flat" "g"
   "a-flat" "a"
   "b-flat" "b"])

(def accidentals [["flat" "&#9837;"] ["" ""] ["sharp" "&#9839;"]])

(defn getscale [scl]
  (if (and (some #(= scl %) (keys vxm/valid-xn-map))
           (not (.contains scl "chords")))
    ""
    (for [[k v] (map list
                     (keys vxm/valid-xn-map)
                     (vals vxm/valid-xn-map))
          :when (some #(= scl %) v)]
      k)))


(defn build-ad-list []
  (let [apple-ad (first (sql/get-one-apple-ad sql/db))
        amazon-ad (first (sql/get-one-amazon-ad sql/db))]
    [:div.medium-6.columns
     [:ul.menu
      [:li [:a.fi-social-apple.black
            {:href (:apple_affiliate_link apple-ad)
             :style "font-size:24px;"}
            (:musician_name apple-ad)]]
      [:li [:a.fi-social-amazon.black
            {:href (:amazon_link amazon-ad)
             :style "font-size:24px;"}
            (:musician_name amazon-ad)]]]]))

(defn build-image-ad []
  (let [image-ad (first (sql/get-one-image-ad sql/db))]
    [:div.medium-5.columns
     [:a
      {:href (:ad_link image-ad)
       :style "padding:0;"}
      [:img {:src (:ad_image image-ad)}]]]))

(defn mode-links [note dnotes]
  [:div.medium-12.columns
   [:ul.accordion {:data-accordion "data-accordion"
                   :data-allow-all-closed "true"}
    [:li.accordion-item
     [:a.accordion-title
      {:href "#collapse1"
       :role "tab"
       :id "collapse1-heading"
       :style "border-color: black"}"Show Modes and Relative Minor"]
     [:div.accordion-content
      {:role "tabpanel"
       :data-tab-content "data-tab-content"
       :aria-labelledby "panel1d-heading"}
      [:div.medium-4.columns
       [:p [:b "Modes for the " (note-to-str note)]]
       (for [x dnotes]
         [:p [:a {:href (c-str/lower-case x)} (mode-to-str x)]])]
      [:div.medium-8.columns
       [:p [:b "Relative Minor for the " (note-to-str note)]]
       [:p [:a {:href (gen-minor-url dnotes)}
            (gen-minor-link dnotes)]]]]]]])

(def tonics ["tonic"
             "supertonic"
             "mediant"
             "subdominant"
             "dominant"
             "submediant"
             "leading tone"
             "octave"])

(defn show-notes [scl & scale-type]
  (let [x (-> scl
              (c-str/replace #"'" "")
              (c-str/replace #"[0-9]" "")
              (c-str/replace #"\[" "")
              (c-str/replace #"\]" "")
              (c-str/replace "," ", "))]
    [:div.medium-12.columns
     [:ul.accordion {:data-accordion "data-accordion"
                     :data-allow-all-closed "true"}
      [:li.accordion-item
       [:a.accordion-title
        {:href "#collapse1"
         :role "tab"
         :id "collapse1-heading"
                                        ;:style "border-color: black"
         } "Show Notes"]
       [:div.accordion-content
        {:role "tabpanel"
         :data-tab-content "data-tab-content"
         :aria-labelledby "panel1d-heading"}
        [:p x]
        (if (= (first scale-type) "major-scales")
          (for [[xx tt]
                (map list (c-str/split x #",") tonics)]
            [:p tt ": " xx]))]]]]))

(defn download-musicxml []
  [:div.medium-12.columns
   [:ul.accordion {:data-accordion "data-accordion"
                   :data-allow-all-closed "true"}
    [:li.accordion-item
     [:a.accordion-title
      {:href "#collapse1"
       :role "tab"
       :id "collapse1-heading"
                                        ;:style "border-color: black"
       } "Download MusicXML"]
     [:div.accordion-content
      {:role "tabpanel"
       :data-tab-content "data-tab-content"
       :aria-labelledby "panel1d-heading"}
      [:button {:onclick "download()"
                :class "button"} "Download MusicXML"]]]]])
