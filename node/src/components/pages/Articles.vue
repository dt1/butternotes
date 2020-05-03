<template>
<div v-html="this.info.data.html"></div>
</template>

<script>
import axios from 'axios'
import 'highlight.js/styles/ascetic.css';

  export default ({
  data () {
  return {
  article: this.$route.params.article,
  info: null
  }
  },

mounted () {
    axios
    .get(`http://127.0.0.1:3000/on-programming/${this.article}`)
    .then(result => (this.info = result));

// hljs.initHighlightingOnLoad();
}



})
</script>

<style scoped>
</style>
