<template>
  <div v-html="amzAd">
    </div>
</template>

<script>
  import axios from 'axios'

  export default ({
  data () {
  return {
  amzAd: null
  }
  }
  ,

   mounted () {
        axios
            .get('http://127.0.0.1:3000/amazon-advertisement')
            .then(result => (this.amzAd = result.data[0].ad_link));
  }
  })
</script>


<style scoped>

</style>
