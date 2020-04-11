<template>
<div>
  {{ info.data.homepage }}
  
  <p>This site is built using Clojure on the backend and VueJs on the front-end.</p>
  
  <p>You can find the source code on my github here:
    <a href="https://github.com/dt1/butternotes">butternotes source</a>
  </p>
  
</div>
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
    .get('http://localhost:3000/homepage')
    .then(result => (this.info = result))
},
methods: {
      onGoClick: function() {
        this.$router.push({ path:'/' });
      }
    }
  })
</script>

<style scoped></style>
