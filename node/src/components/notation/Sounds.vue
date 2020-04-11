<template>
  <div>
<div>
  {{ sounds }}
</div>
<div>
  <a href="#" @click="play" style="font-size:2em; color:black" v-html="playButton"></a>
</div>
</div>
</template>

<script>
import * as  Wad from 'web-audio-daw';

function togglePlayButton(btn) {
    return (btn == "&#9656; (play)") ?  "&#9646; &#9646; (pause)" :  "&#9656; (play)";
}

function toggleBool(tf) {
    return tf ? false : true;
}

export default ({
name: "play-music",

props: [ "result" ],

data () {
return {
notation: null,
sounds: null,
playButton: "&#9656; (play)",
tf: false,
currentNote: 0,
bpm: 60, // document.getElementById('bpmbox').value
pause: 60000 / 60, // this.bpm,
sustain: 6000 / 60 / 2000 // this.pause / 2000
}
},

async mounted () {
console.log(this.result)
// this.sounds = JSON.parse(result.data.sound.replace(/'/g, '"'));
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
        piano.play({pitch: this.sounds[this.currentNote],
                    env: {hold: this.sustain}});

   this.currentNote++;
   this.currentNote%=this.sounds.length;
   console.log(this.pause);
   if(this.currentNote == 0){
       this.pause = 4000;
   }
        else {
            this.pause = 60000 / this.bpm;
        }

        setTimeout(this.playscale, this.pause);
     }
}

}})
</script>

<style scoped></style>
