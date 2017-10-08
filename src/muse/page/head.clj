(ns muse.page.head
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]))

;; (def google-site-verification
;;   [:meta {:name "google-site-verification"
;;           :content "k7QrLQa41Lyo3PIY0sZlqtCBpjY5r_Fl6JdGtR50Iok"}])

(def item-scope {:itemscope "itemscope" :itemtype "https://schema.org/WebSite"})

(def sd-title
  [:title {:itemprop "name"} "Butter Notes"])

(def sd-canonical
  [:link {:rel "canonical" :href "https://www.butternotes.com"
          :itemprop "url"}])

(def charset
  [:meta {:charset "utf-8"}])

(def viewport
  [:meta {:name "viewport"
          :content "width=device-width, initial-scale=1"}])

(def applecompat
  [:meta {:name "apple-mobile-web-app-capable" :content "yes"}])

(def jquery
  [:script {:src "https://code.jquery.com/jquery-3.2.1.min.js"
            :integrity "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            :crossorigin "anonymous"}])

(def abc2svg
  [:script {:src "https://s3-us-west-1.amazonaws.com/butternotes/js/abcweb/abc2svg-1.js"}])

(def abcweb
  [:script {:src "https://s3-us-west-1.amazonaws.com/butternotes/js/abcweb/abcweb.js"}])

(def xml2abc
  [:script {:src "https://s3-us-west-1.amazonaws.com/butternotes/js/abcweb/xml2abc.js"}])

(def wad
  [:script {:src "https://s3-us-west-1.amazonaws.com/butternotes/js/wad/wad.min.js"}])

(def zurb-css
  [:link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/foundation/6.2.4-rc2/foundation.min.css"}])

(def zurb-js
  [:script {:src "https://cdn.jsdelivr.net/foundation/6.2.4-rc2/foundation.min.js"}])

(def font-awsome
  [:link {:rel "stylesheet " :href "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"}])

(def main-css
  [:link {:rel "stylesheet" :href "https://s3-us-west-1.amazonaws.com/butternotes/css/main3.css"}])

(def norder-css
  [:link {:rel "stylesheet" :href "https://s3-us-west-1.amazonaws.com/butternotes/css/norder.css"}])

(def sortable
  [:script {:src "https://s3-us-west-1.amazonaws.com/butternotes/js/sortable/sortable.js"}])

(def ganalytics
  [:script
  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89637748-1', 'auto');
  ga('send', 'pageview');
"])

(def social-links
  [:script {:type "application/ld+json"}
   "{
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'your name',
  'url': 'https://www.butternotes.com',
  'sameAs': [
    'https://twitter.com/ButternotesWeb',
    'https://www.facebook.com/butternotesweb/',
  ]
}"])

(def favicon
  [:link {:rel "shortcut icon"
          :href "https://s3-us-west-1.amazonaws.com/butternotes/img/favicon/favicon.png"}])

(def site-logo
  [:script {:type "application/ld+json"}
   "{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'url': 'https://www.butternotes.com',
  'logo': 'https://s3-us-west-1.amazonaws.com/butternotes/img/logo/logo.png'
}
"])

;; (def pinterest
;;   [:meta {:name "p:domain_verify" :content "0d453ca128c84632ba8aa9d7e33f852f"}])

(def foundation-icons
  [:link {:rel "stylesheet" :href "https://cdn.jsdelivr.net/foundation-icons/3.0/foundation-icons.min.css"}])

(defn capitalize-scales
  "Capitalize every word in a string"
  [s]
  (->> (clojure.string/split (str s) #"\b")
       (map clojure.string/capitalize)
       clojure.string/join))

(defn note-to-str [s]
  (capitalize-scales (clojure.string/replace s #"-" " ")))


(defmulti headers
  (fn [x]
    (:head-type x)))

(defmethod headers "global" [x]
  [favicon
   site-logo
   sd-title
   sd-canonical
   social-links
   charset
   viewport
   applecompat
   jquery
   zurb-css
   zurb-js
   font-awsome
   main-css
   ganalytics
   foundation-icons])

(defmethod headers "abcweb" [x]
  [abc2svg
   abcweb
   xml2abc])

(defmethod headers "sounds" [x]
  [wad])

(defmethod headers "recording" [x]
  [wad])

(defn head [note]
  [:head item-scope
   [:title (apply str "Butter Notes | " (note-to-str note) " ")]
   [:meta {:name "description"
           :content (apply str "Learn the notes of the "
                           (note-to-str note) ". Listen, rearrange the notes, change the clefs, change the key signatures")}]
   (for [hh ["global" "abcweb" "sounds"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))
   norder-css
   sortable])

(defn lab-head []
  [:head item-scope
   [:title "Butter Notes | Lab"]
   (for [hh ["global" "abcweb"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))])

(defn metronome-head []
  [:head item-scope
   [:title "Butter Notes | Metronome"]
   (for [hh ["global" "sounds"]
         :let [x (headers {:head-type hh})]]
     (for [xx x]
       xx))])
