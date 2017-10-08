(ns muse.page.utils.playscale
  (:require [hiccup.core :refer :all]))


(defn play-scale [scl]
  [:script
   (apply str
      "$('#playstop').click(function(){
	if(stopped){
	    $(this).html(\"&#9646;&#9646; (pause)\");
	    stopped = false;
	    playscale();
	} else {
	    $(this).html(\"&#9656; (play)\");
	    stopped = true;
	}
    });

var stopped = true;

var notes = ", scl , "

var currentNote = 0
var bpm = document.getElementById('bpmbox').value;
var pause = 60000 / bpm;
var sustain = pause / 2000;

function changeBPM (v) {
      bpm = v.value;
      pause = 60000 / bpm;
      sustain = pause / 2000;
      document.getElementById('bpmbox').value = v.value;
}


function playscale(){
    if(!stopped){
        var piano = new Wad(Wad.presets.piano);
        piano.play({pitch: notes[currentNote],
                    env: {hold: sustain}});

	currentNote++;
	currentNote%=notes.length;

	if(currentNote == 0){
	    pause = 4000;
	}
        else {
            pause = 60000 / bpm;
        }

        setTimeout(playscale, pause);        
     }

}

")])
