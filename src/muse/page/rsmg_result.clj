(ns muse.page.rsmg_result
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [ring.util.anti-forgery :refer [anti-forgery-field]]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]
            [muse.page.utils.playscale :as pscale]))

(defn random-music-generator-result [&x &y]
  (pg/html-wrapper

   [:head mhd/item-scope
    [:title (str "Butter Notes | RSMG Result")]
    [:meta {:description "A Random Sheet Music Generator Result"}]
    (for [hh ["global" "abcweb" "sounds"]
          :let [x (mhd/headers {:head-type hh})]]
      (for [xx x]
        xx))]
      
   [:div.row
    [:div.row
     [:div.medium-3.columns
      [:p ""]]
     [:div.medium-2.columns
      [:a#playstop {:href "#"
                    :style "font-size:2em; color:black"}
       "&#9656; (play)"]]
     [:div.medium-3.columns
      "BPM: "
      [:input {:id "bpmbox"
               :type "number"
               :value "60"
               :onchange "changeBPM(this)"}]]
     [:div.medium-3.columns
      [:button {:onclick "download()"
                :class "button"} "Download MusicXML"]]
     [:div.medium-4.columns]]
    [:div.medium-9.columns
     [:div#notation]]
    [:div#test-div {:style "display:none"}
     &x]
    (pscale/play-scale &y)
    [:script "function download(){
    var a = document.body.appendChild(
        document.createElement(\"a\")
    );
    a.download = \"random-sheet-music.xml.\";
    a.href = \"data:text/xml,\" + document.getElementById(\"test-div\").innerHTML;
    a.click();
}
"]]))
