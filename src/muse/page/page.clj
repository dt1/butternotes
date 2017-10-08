(ns muse.page.page
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]

            [muse.page.head :as mhd]
            [muse.page.topnav :as tnav]
            [muse.page.sidenav :as snav]
            [muse.page.scale_form :as scm]
            [muse.page.pattern_info :as ppi]

            [clojure.string :as c-str]

            [muse.valid_xn_map :as vxm]
            [muse.db.conn :as sql]
            
            [muse.page.utils.playscale :as pscale]))

(def jquery-load
  [:script "
   $(document).ready(function() {
     $(document).foundation();
   })"])

(defn capitalize-scales
  "Capitalize every word in a string"
  [s]
  (->> (c-str/split (str s) #"\b")
       (map c-str/capitalize)
       c-str/join))

(defn note-to-str [s]
  (capitalize-scales
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

(defn capitalize-scales [s]
  "Capitalize every word in a string"
  (->>
   (c-str/split (str s) #"\b")
   (map c-str/capitalize)
   c-str/join))

(defn create-sublinks-helper [stype scl]
  [:ul.menu
   (for [n major-links-vec]
     [:li [:a {:href (c-str/replace
                      (str "/"
                           (first scl)
                           "/"
                           stype
                           "/"
                           n
                           "-"
                           (apply str (butlast stype)))
                      #"\/\/" "/")}
           (-> n
               (c-str/replace #"-" "")
               (c-str/replace #"flat" "&#9837;")
               (c-str/replace #"sharp" "&#9839;"))]])])

(defn create-sublinks [stype]
  (let [scl (getscale stype)]
    [:div [:span
           (-> stype
               (capitalize-scales)
               (c-str/replace "-" " ")
               (str ":"))]
     (create-sublinks-helper stype scl)]))

;; (defn create-diminished-sublinks [stype]
;;   (let [scl (getscale stype)]
;;     [:div [:span (str (c-str/replace
;;                        (capitalize-scales stype)
;;                        #"-" " ") ":")]
;;      [:ul.menu
;;       (for [n dim-links-vec]
;;         [:li [:a {:href (c-str/replace
;;                          (str "/"
;;                               (first scl)
;;                               "/"
;;                               stype
;;                               "/"
;;                               n
;;                               "-"
;;                               (apply str (butlast stype)))
;;                          #"\/\/" "/")}
;;               (-> n
;;                   (c-str/replace #"-" "")
;;                   (c-str/replace #"flat" "&#9837;")
;;                   (c-str/replace #"sharp" "&#9839;"))]])]]))

;; (defn create-diminished-sublinks [scale-type]
;;   (let [sv (scale-paths scale-type)]
;;     [:div [:span (apply str (sv 0) ":")]
;;      [:ul.menu
;;       (for [n dim-links-vec]
;;         [:li [:a {:href (apply str (sv 1) n (sv 2))}
;;               (-> n
;;                   (c-str/replace #"-" "")
;;                   (c-str/replace #"flat" "&#9837;")
;;                   (c-str/replace #"sharp" "&#9839;"))]])]]))

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

(defn top-row []
  [:div.row
   [:div.medium-2.columns
     [:h1 {:style "font-size: 1em;"}
      [:a.black {:href "/"} "Butter Notes"]
      [:br]
      [:small.black "Explore & Practice Music."]]]
   [:div.medium-5.columns
    [:ul.menu
     [:li [:a.fi-mail.black
           {:href "/newsletter"
            :style "font-size:24px;"}]]
     [:li [:a.fi-social-twitter.black
           {:href "https://twitter.com/ButternotesWeb"
            :style "font-size:30px;"}]]
     [:li [:a.fi-social-facebook.black
           {:href "https://www.facebook.com/butternotesweb"
            :style "font-size:30px;"}]]
     ;; [:li [:a.fi-social-pinterest.black
     ;;       {:href "https://www.pinterest.com/butternotes/"
     ;;        :style "font-size:30px;"}]]
     [:li [:a.fi-social-youtube.black
           {:href "https://www.youtube.com/channel/UCeOcCGyn5LFXcaZbNCEvg1w"
            :style "font-size:30px;"}]]]]
   (build-image-ad)])

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

(defn chromatic-links []
  )

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

(defn html-wrapper [heading content]
  (html5
   {:class "no-js" :lang "en" :dir "ltr"}
   heading
   [:body
    [:div.row
     [:div.row
      (top-row)]
     [:div.medium-2.columns
      (snav/side-nav)]
     [:div.medium-10.columns
      content]]
    jquery-load]))

(defn scale-page [note dnotes scl m scale-type &w]
  (html-wrapper
   (mhd/head note)
   [:div.medium-10.columns
    [:div.row
     (if (= scale-type "chromatic-scales")
       (chromatic-links)
       (create-sublinks scale-type))]
     [:div.row
      [:div.medium-10.columns
       [:div.row
        [:div.medium-4.columns
         [:a#playstop {:href "#"
                       :style "font-size:2em; color:black"}
          "&#9656; (play)"]]
        [:div.medium-3.columns
         "BPM: "
         [:input {:id "bpmbox"
                  :type "number"
                  :value "60"
                  :onchange "changeBPM(this)"}]]]]
        [:div.medium-5.columns ""]

      [:div.medium-12.columns
       [:div#notation]]
      (download-musicxml)
      (show-notes scl scale-type)
      (ppi/pattern scale-type)
      (if (and (not= dnotes "theory")
               (= scale-type "major-scales"))
        (mode-links note dnotes))
      (scm/scale-form m scale-type)]
     [:div#test-div {:style "display:none"}
      &w]
    (pscale/play-scale scl)
    [:script "function download(){
    var a = document.body.appendChild(
        document.createElement(\"a\")
    );
    a.download = \"random-sheet-music.xml.\";
    a.href = \"data:text/xml,\" + document.getElementById(\"test-div\").innerHTML;
    a.click();
}
"]]))

(defn major-scale-nav-page [notes]
  (html5
   {:class "no-js" :lang "en" :dir "ltr"}
   (mhd/head "major")
   [:body
    (top-row)
    [:div.row
     (snav/side-nav)
     [:div.medium-10.columns
      [:h1 "Major Scales"]
      [:div.medium-12.columns
       (for [x notes]
         [:p [:a {:href (apply str "/major-scales/" x
                               "-major-scale")}
              (note-to-str x)]])]]]]
   jquery-load))

(def diatonic-list ["ionian" "dorian" "phrygian" "lydian"
                    "mixolydian"
                    "aeolian" "locrian"])

(defn diatonic-scale-nav-page []
  (html5
   {:class "no-js" :lang "en" :dir "ltr"}
   (mhd/head "head")
   [:body
    (top-row)
    [:div.row
     (snav/side-nav)
     [:div.medium-10.columns
      [:h1 "Diatonic Scales"]
      [:div.medium-9.columns
       (for [x diatonic-list]
         [:p [:a {:href (apply str "/diatonic-scales/" x
                               "-scales")}
              (note-to-str x)]])]]]]
   jquery-load))

(defn diatonic-scale-subnav-page [notes scale-type]
  (html5
   {:class "no-js" :lang "en" :dir "ltr"}
   (mhd/head "header")
   [:body
    (top-row)
    [:div.row
     (snav/side-nav)
     [:div.medium-10.columns
      [:h1 (c-str/capitalize scale-type) " Scales"]
      [:div.medium-9.columns
       (for [x notes]
         [:p [:a {:href (apply str "/diatonic-scales/" scale-type "/" x
                               "-" (apply str (drop-last scale-type)))}
              (note-to-str x)]])]]]]
   jquery-load))

(defn mode-scale-nav-page []
  (html5
   {:class "no-js" :lang "en" :dir "ltr"}
   (mhd/head "header")
   [:body
    (top-row)
    [:div.row
     (snav/side-nav)
     [:div.medium-10.columns
      [:h1 "Modes"]
      [:div.medium-9.columns
       (for [x diatonic-list]
         [:p [:a {:href (apply str "/modes/" x
                               "-modes")}
              (note-to-str x)]])]]]]
   jquery-load))

(defn mode-scale-subnav-page [notes scale-type]
  (html-wrapper
   (mhd/head "header")
   [:div.medium-10.columns
    [:h1 (c-str/capitalize
          (c-str/replace scale-type #"-" " "))]
    [:div.medium-9.columns
     (for [x notes]
       [:p [:a {:href (apply str "/modes/" scale-type "/" x
                             "-"
                             (apply str (drop-last scale-type)))}
            (note-to-str x)]])]]))
