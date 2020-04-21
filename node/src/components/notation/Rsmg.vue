<template>
  <div>
{{ info.data.rsmg }}
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
    .get('http://127.0.0.1:3000/lab/random-sheet-music-generator')
    .then(result => (this.info = result))
},
methods: {
      onGoClick: function() {
        this.$router.push({ path:'/lab/random-sheet-music-generator' });
      }
    }
  })
</script>

<style scoped></style>
