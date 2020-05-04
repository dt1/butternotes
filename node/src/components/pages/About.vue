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
    .get('http://127.0.0.1:3000/about')
    .then(result => (this.info = result));

    document.title = `Butternotes | About`
},
methods: {
      onGoClick: function() {
        this.$router.push({ path:'/' });
      }
    }
  })
</script>

<style scoped></style>
