(ns muse.page.metronome
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn metronome-page []
  

   [:head 
    [:title "Butter Notes | Metronome"]
    [:meta {:description "Butter Notes Metronome with complex 
time signatures."}]
    (for [x (mhd/headers {:head-type "global"})]
      x)
    (for [x (mhd/headers {:head-type "sounds"})]
      x)
    ]
      
   [:div.row
    [:p "Metronome"]
    [:a#playstop {:href "#"
                  :style "font-size:2em; color:black"}
     "&#9656; (play)"]

    [:br]
    "BPM: "
    [:input {:id "bpmbox"
             :type "number"
             :value "60"
             :style "width: 100px;"
             :onchange "changeBPM(this)"}]

    "Time: "
    [:br]
    [:select {:id "beat-time"
              :name "beat-time"
              :style "width: 200px;"
              :onchange "changeTimesig(this)"}
     [:option {:value "simple-beat"} "simple beat"]
     [:option {:value "22"} "2/2"]
     [:option {:value "24"} "2/4"]
     [:option {:value "34"} "3/4"]
     [:option {:value "38"} "3/8"]
     [:option {:value "44"} "4/4"]
     [:option {:value "54"} "5/4"]
     [:option {:value "68"} "6/8"]
     [:option {:value "74"} "7/4"]
     [:option {:value "98"} "9/8"]
     [:option {:value "114"} "11/4"]
     [:option {:value "128"} "12/8"]
     ]

    [:script " 

      $('#playstop').click(function(){
	if(stopped){
	    $(this).html(\"&#9646;&#9646; (pause)\");
	    stopped = false;
	    startMetronome();
	} else {
	    $(this).html(\"&#9656; (play)\");
	    stopped = true;
	}
    });

var stopped = true;

var bpm = document.getElementById('bpmbox').value;
var pause = 60000 / bpm;
var sustain = pause / 2000;

function changeBPM (v) {
      bpm = v.value;
      pause = 60000 / bpm;
      sustain = pause / 2000;
      document.getElementById('bpmbox').value = v.value;
}

var kickdrum = new Wad({source : '/audio/drums/kick-drum.ogg' });
var racktom = new Wad({source : '/audio/drums/rack-tom.ogg' });
var closedHighHat = new Wad({source : '/audio/drums/closed-hi-hat.ogg' });
var acousticKick = new Wad({source : '/audio/drums/acoustic-kick.ogg' });

var map = {};
map['simple-beat'] = [kickdrum];
map['22'] = [kickdrum, closedHighHat];
map['22'] = [kickdrum, racktom];
map['34'] = [kickdrum, closedHighHat, closedHighHat];
map['38'] = [kickdrum, closedHighHat, closedHighHat];
map['44'] = [kickdrum, closedHighHat, closedHighHat, closedHighHat];
map['54'] = [kickdrum, closedHighHat, closedHighHat, 
             closedHighHat, closedHighHat];
map['74'] = [kickdrum, closedHighHat, closedHighHat, 
             closedHighHat, closedHighHat,
             closedHighHat, closedHighHat];
map['68'] = [kickdrum, closedHighHat, closedHighHat, 
             racktom, closedHighHat, closedHighHat];
map['98'] = [kickdrum, closedHighHat, closedHighHat, 
             racktom, closedHighHat, closedHighHat,
             racktom, closedHighHat, closedHighHat];
map['114'] = [kickdrum, closedHighHat, closedHighHat, 
             closedHighHat, closedHighHat,
             closedHighHat, closedHighHat,
             closedHighHat, closedHighHat,
             closedHighHat, closedHighHat];
map['128'] = [kickdrum, closedHighHat, closedHighHat, 
             racktom, closedHighHat, closedHighHat,
             racktom, closedHighHat, closedHighHat,
             racktom, closedHighHat, closedHighHat];

pattern = map[document.getElementById('beat-time').value];

function changeTimesig (v) {
    pattern = map[v.value];
    document.getElementById('beat-time').value = v.value;
}

var currentBeat = 0;

function startMetronome() {
   if(!stopped) {
     pattern[currentBeat].play({volume: 5.0})
     currentBeat++;
     currentBeat %= pattern.length;

     setTimeout(startMetronome, pause);
}
}
      
"]])
