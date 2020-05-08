<template>
<div class="elems" v-html="this.info.data.html"></div>
</template>

<script>
import axios from 'axios'

export default ({
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
    .get('http://127.0.0.1:3000/homepage')
    .then(result => (this.info = result));

    document.title = `Butternotes | Home`
},
methods: {
      onGoClick: function() {
        this.$router.push({ path:'/' });
      }
    }
  })
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&family=Nanum+Gothic&display=swap');


.elems {
    font-family: 'Comfortaa', cursive;
    }

.elems >>>  h1 {
  font-family: cursive;
  font-size: 3em;
  color: #fad587;
  text-shadow: -1px 2px #9c6b06;
  }

</style>
