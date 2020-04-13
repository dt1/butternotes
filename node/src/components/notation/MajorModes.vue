<template>
<div>
  <!-- {{ modeArray }} -->
  <p>Modes for the {{ noteArray[0] }} Major Scale</p>
  <ul class="no-bullet">
    <li v-for="i in modeArray" :key="i[0]">
      <router-link v-bind:to="'/modes/' + i[0] + 's/' + i[1].toLowerCase() + '-' + i[0]">
        {{ i[1] + " " + toTitleCase(i[0].replace("-", " ")) }} </router-link>
    </li>
  </ul>
  
  <p>Relative Minor for the {{ noteArray[0] }} Major Scale</p>
  <router-link v-bind:to="'/minor-scales/natural-minor-scales/' + noteArray[5].toLowerCase() + '-natural-minor-scale'">
    {{ noteArray[5] }} Natural Minor  Mode</router-link>

</div>
</template>


<script>
import { toTitleCase } from '@/components/utils/string.js'
  
export default ({
name: "major-modes",
props: [ "mode-list" ],

data () {
return {
noteArray: null,
modeArray: null
}
},

mounted () {
let modes = ["ionian-mode", "dorian-mode", "phrygian-mode",
"lydian-mode", "mixolydian-mode", "aeolian-mode",
"locrian-mode"]

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

this.noteArray = this.modeList.map(s => s.slice(0, -1))
this.modeArray = zip(modes, this.noteArray)
},

methods: {
toTitleCase
}

})
</script>

<style scoped>
  p {
  font-weight: bold;
  }

  .treble {
  height: 4em;
  }
  
  .bass {
  height: 2.4em;
  padding-bottom: .1em;
  }
</style>
