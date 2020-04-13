<template>
  <div>
    <button class="button" v-on:click="dl">Download Music XML</button>
  </div>
</template>


<script>
export default ({
name: "dl-music-xml",
props: [ "xml" ],

methods: {
dl: function () {
var blob = new Blob([ new TextEncoder().encode(this.xml) ], { data: "text/xml" })
const a = document.createElement('a')
a.href = URL.createObjectURL(blob)
a.download = "music.xml"
a.click()
}
}

})
</script>

<style scoped></style>
