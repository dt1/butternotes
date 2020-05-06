<template>
<div v-html="this.info.data.html"></div>
</template>

<script>
  import axios from 'axios'

  export default ({
  data () {
  return {
  article: this.$route.params.article,
  rtype: this.$route.params.rtype,
  info: null
  }
  },

mounted () {
    axios
    .get(`http://127.0.0.1:3000/reviews/${this.rtype}/${this.article}`)
    .then(result => (this.info = result));
}
})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&family=Nanum+Gothic&display=swap');

  div {
    font-family: 'Comfortaa', cursive;
    }
</style>
