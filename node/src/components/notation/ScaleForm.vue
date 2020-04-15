<template>
  <div>
  <img class="treble" :src="`${publicPath}img/clefs/treble-clef.svg`" />
  <img class="bass" :src="`${publicPath}img/clefs/bass-clef.svg`" />
  <img class="tenor" :src="`${publicPath}img/clefs/tenor-clef.svg`" />
  <img class="alto" :src="`${publicPath}img/clefs/alto-clef.svg`" />
  
  <p>Change the Octave: (raise or lower note pitches)</p>
  <input max="8" min="1" name="octave" step="1" style="width: 100px;" type="number" value="4">
  
  <select name="key-sig">
    <optgroup label="No Sharps:">
      <option selected="selected" value="0">C / Am</option>
    </optgroup>
    <optgroup label="Sharps:">
      <option v-for="(k, i) in sharps" :key="k" :value="i+=1">{{ k }}</option>
    </optgroup>
    <optgroup label="Flats:">
      <option v-for="(k, i) in flats" :key="k" :value="(i+=1)*-1">{{ k }}</option>
    </optgroup>
  </select>

  <p>Change the Note Placement (drag and drop to reorder):</p>
  <ul class="menu" id="norder">
    <li v-for="(k, i) in noteOrder" :key="k" :data-id="i">{{ k }}</li>
  </ul>
  
<!--   <ul class="menu" id="norder"> -->
<!--     <li class="norder-c1 hand-hover" data-id="0">tonic (1)</li> -->
<!--     <li class="norder-c2 hand-hover" data-id="1">supertonic (2)</li> -->
<!--     <li class="norder-c3 hand-hover" data-id="2">mediant (3)</li> -->
<!--     <li class="norder-c4 hand-hover" data-id="3">subdominant (4)</li> -->
<!--     <li class="norder-c5 hand-hover" data-id="4">dominant (5)</li> -->
<!--     <li class="norder-c6 hand-hover" data-id="5">submediant (6)</li> -->
<!--     <li class="norder-c7 hand-hover" data-id="6">leading tone (7)</li> -->
<!--     <li class="norder-c8 hand-hover" data-id="7">octave (8)</li> -->
<!-- </ul> -->
  
</div>
</template>


<script>
  
export default ({
name: "scale-form",

data () {
return {
sharps: null,
flats: null,
noteOrder: null,
publicPath: process.env.BASE_URL
}
},

mounted () {
this.sharps = ["G / Em", "D / Bm", "A / F♯", "E / C♯m", "B / G♯m", "F♯ / D♯m", "C♯"]
this.flats = ["F / Dm", "B♭ / Gm", "E♭ / Cm", "A♭ / Fm", "D♭ / B♭m", "G♭ / E♭m", "C♭"]
this.noteOrder = ["tonic (1)", "supertonic (2)", "mediant (3)", "subdominant (4)",
"dominant (5)", "submediant (6)", "leading tone (7)", "octave (8)"]
}

})
</script>

<style scoped>
  .treble {
  height: 8em;
  }
  
  .bass {
  height: 5em;
  padding-bottom: .3em;
  }

  .tenor {
      height: 7em;
      padding-bottom: 1.3em;
  }

  .alto {
      height: 5em;
      padding-bottom: .3em;
  }

</style>
