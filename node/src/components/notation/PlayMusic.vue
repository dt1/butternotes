<template>
<div class="grid-x">
    <div class="cell small-2 pad-top">
      <a href="#" @click="play" style="font-size:2em; color:black" v-html="playButton"></a>
    </div>
    <div class="cell small-2 pad-top">
      <input type="number" value="60" @change="changeBpm($event)">
    </div>
    <div class="cell small-8">
    </div>
</div>
</template>

<script>
import * as  Wad from 'web-audio-daw';
import { toggleBool } from '@/components/notation/utils/toggle-bool.js'
import { togglePlayButton } from '@/components/notation/utils/toggle-play-button.js'

export default ({
    name: "play-music",

props: [ "noteList" ],

    data () {
        return {
            sounds: null,
            playButton: "&#9656; (play)",
            tf: false,
            currentNote: 0,
            bpm: 60,
            pause: 60000 / 60, // this.bpm,
            sustain: 6000 / 60 / 2000 // this.pause / 2000
        }
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
                piano.play({pitch: this.noteList[this.currentNote],
                            env: {hold: this.sustain}});

                this.currentNote++;
                this.currentNote%=this.noteList.length;
                if(this.currentNote == 0){
                    this.pause = 4000;
                }
                else {
                    this.pause = 60000 / this.bpm;
                }

                setTimeout(this.playscale, this.pause);
            }
},

changeBpm: function (event) {
      this.bpm = event.target.value
      this.pause = 60000 / this.bpm;
      this.sustain = this.pause / 2000;
}

}
})

</script>

<style scoped>
.pad-top {
padding-top: 2em;
}


</style>
