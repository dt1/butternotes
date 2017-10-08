(ns muse.page.lab_gen_sheet_music
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [clojure.data.xml :refer :all]
            [ring.util.anti-forgery :refer [anti-forgery-field]]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(def el element)

(defn gen-attributes []
  (el :attributes {}
      (el :divisions {} 1)
      (el :key {}
          (el :fifths {} 0))
        (el :clef {}
            (el :sign {} "G")
            (el :line {} "1"))
        (el :time {}
            (el :beats {} 4)
            (el :beat-type {} 4))))

(defn gen-measure-one [nts]
    (el :part {:id "P1"}
        (el :measure {:number 1}
            (gen-attributes)
            (for [note nts]
              (el :note {}
                  (el :pitch {}
                      (el :step {} (str (first note)))
                      (if (= (str (second note)) "#")
                        (el :alter {} 1))
                      (el :octave {} (inc (Integer/parseInt (str (last note))))))
                  (el :duration {} 1)
          (el :type {} "quarter"))))))

(defn gen-sheet-music [arr]
  (let [nts (dedupe (clojure.string/split arr #","))]
    (el :score-partwise {:version "3.0"}
        (el :work {}
            (el :work-title {} "Lab Notes :)"))
        (el :identification {}
            (el :encoding {}
                (el :software {} "butternotes.com")))
        (el :part-list {}
            (el :score-part {:id "P1"}
                (el :part-name {}  "")))
        (gen-measure-one nts))))

(defn lab-page [& arr]
  (prn arr)
  (pg/html-wrapper

   [:head mhd/item-scope
    [:title "Butter Notes | Lab, generate sheet music"]
    [:meta {:description "Butter Notes Sheet Music Generator"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)

    (if arr
      (for [x (mhd/headers {:head-type "abcweb"})]
        x))
    
    (for [x (mhd/headers {:head-type "sounds"})]
      x)]

   [:div.row
    [:p "Press \"Start,\" allow access to your brower's mic,
play your instrument. When you are done, press \"stop\" and see the generated sheet music. (work in progress)"]

    [:p "This has been tested in various browsers, but I am not entirely sure if it works with absolutely everything.
Some poeple have said it works with their phone. If you are on a desktop or laptop computer, please check your system sound settings."]

    [:div#notes
     [:form {:method "POST"
             :name "playForm"}
      [:a#playstop {:href "#"} "Start"]
      [:input#note-arr {:type "hidden" :name "note-arr"}]
      (anti-forgery-field)]]

    [:div#notation]

    (if (and (not (empty? (first arr)))
             (not (= ((first arr) "note-arr") "")))
      [:div#test-div {:style "display:none"}
       (emit-str (gen-sheet-music ((first arr) "note-arr")))])

      [:script "

var noteArr = new Array();
ndiv = document.getElementById('notes');

stopped = true;

$('#playstop').click(function(){
    if(stopped) {
	$(this).html(\"Stop\");
    stopped = false;
    var voice = new Wad({source : 'mic' });
    var tuner = new Wad.Poly();

    voice.play();
    tuner.add(voice);

    tuner.updatePitch();

    var logPitch = function(){
	var nn = tuner.noteName;

	    <!-- console.log(nn); -->
console.log(nn);

	if (nn) {
	    noteArr.push(nn);
	    console.log(noteArr);
	}
	    requestAnimationFrame(logPitch);
   };
    logPitch();
}
else {
   stopped = true;
   document.getElementById(\"note-arr\").value = noteArr.toString();
   document.playForm.submit();
}});

"]]))
