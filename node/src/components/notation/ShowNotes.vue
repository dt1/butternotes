<template>
<div>
  <p>{{ noteString }}</p>
  <ul class="no-bullet">
    <li>tonic: {{ noteArray[0] }}</li>
    <li>supertonic: {{ noteArray[1] }}</li>
    <li>mediant: {{ noteArray[2] }}</li>
    <li>subdominant: {{ noteArray[3] }}</li>
    <li>dominant: {{ noteArray[4] }}</li>
    <li>submediant: {{ noteArray[5] }}</li>
    <li>leading tone: {{ noteArray[6] }}</li>
    <li>octave: {{ noteArray[7] }}</li>
  </ul>
</div>
</template>


<script>
export default ({
name: "show-notes",
props: [ "note-list" ],

data () {
return {
noteArray: [],
noteString: null
}
},

mounted () {
this.noteArray = this.noteList.map(s => s.slice(0, -1))
this.noteString = this.noteArray.join(", ")
}

})
</script>

<style scoped>

</style>
