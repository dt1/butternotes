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

<style scoped></style>
