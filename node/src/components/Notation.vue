<template>
<div>
  
    {{ sounds }}
    <div>
      <a href="#" @click="play" style="font-size:2em; color:black" v-html="playButton"></a>
    </div>
    <div id="osmdCanvas">
</div>
</div>
</template>

<script>
import axios from 'axios'
import { handleFileSelect } from '@/../public/js/osmd/xml-loader.js'
import * as  Wad from 'web-audio-daw';

function togglePlayButton(btn) {
    return (btn == "&#9656; (play)") ?  "&#9646; &#9646; (pause)" :  "&#9656; (play)";
}

function toggleBool(tf) {
    return tf ? false : true;
}


// var stopped = true;
var currentNote = 0
var bpm = 60; // document.getElementById('bpmbox').value;
var pause = 60000 / bpm;
var sustain = pause / 2000;

export default ({
data () {
return {
notation: null,
sounds: null,
playButton: "&#9656; (play)",
tf: false
}
},

async mounted () {
let scale = this.$route.params.scale;
let stype = this.$route.params.stype;
let ntype = this.$route.params.ntype;

let result;

if (ntype) {
result = await axios
    .get(`http://localhost:3000/${scale}/${stype}/${ntype}`);
} else {
result = await axios
    .get(`http://localhost:3000/${scale}/${stype}`);
}
this.notation = result.data.xml;
this.$nextTick(); // wait for re-render
handleFileSelect(this.notation);

this.sounds = JSON.parse(result.data.sound.replace(/'/g, '"'));

},

methods: {
play: function() {
this.tf = toggleBool(this.tf);
this.playButton = togglePlayButton(this.playButton);
this.playscale();
},

playscale: function () {
    if(this.tf){
        var piano = new Wad(Wad.presets.piano);
        piano.play({pitch: this.sounds[currentNote],
                    env: {hold: sustain}});

   currentNote++;
   currentNote%=this.sounds.length;

   if(currentNote == 0){
       pause = 4000;
   }
        else {
            pause = 60000 / bpm;
        }

        setTimeout(this.playscale, pause);        
     }
}

}})


</script>

<style scoped></style>
