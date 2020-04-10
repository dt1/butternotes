// var stopped = false;
// var currentNote = 0
// var bpm = 60// = document.getElementById('bpmbox').value;
// var pause = 60000 / bpm;
// var sustain = pause / 2000;

// function playscale(){
//     if(!stopped){
//         piano.play({pitch: this.sounds[currentNote],
//                     env: {hold: sustain}});

//     currentNote++;
// currentNote%=this.sounds.length;

// alert(currentNote);

//     if(currentNote == 0){
//         pause = 4000;
//     }
//         else {
//             pause = 60000 / bpm;
//         }

//         setTimeout(playscale, pause);        
//      }

// }

import * as  Wad from 'web-audio-daw';
var piano = new Wad(Wad.presets.piano);

var playScale = async function(notes){
    for (var i=0; i<notes.length; i++) {
    await piano.play({pitch: notes[i], wait: .05, env: {hold : 1}})
    }
}

export { playScale };
