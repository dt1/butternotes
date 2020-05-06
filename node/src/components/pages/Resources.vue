<template>
<div v-html="this.info.data.html"></div>
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
    .get('http://127.0.0.1:3000/resources')
    .then(result => (this.info = result));

    document.title = `Butternotes | Resources`
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


  div {
    font-family: 'Comfortaa', cursive;
    }

</style>
