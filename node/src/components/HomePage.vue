<template>
  <p> {{ info.data.homepage }}</p>
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
