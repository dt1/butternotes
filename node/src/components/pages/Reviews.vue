<template>
<div class="elems" v-html="this.info.data.html"></div>
</template>

<script>
import axios from 'axios'
import { rtToTitleCase } from '@/components/utils/string.js'

export default ({
    data () {
        return {
            article: this.$route.params.article,
            rtype: this.$route.params.rtype,
            info: null
        }
    },

    mounted () {
        this.getData();
    },

    methods: {
        async getData() {
            this.info = await axios
                .get(`http://127.0.0.1:3000/reviews/${this.rtype}/${this.article}`)
            document.title = "ButterNotes | " + rtToTitleCase(this.info.data.title) + " Review";

        }
    }
})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&family=Nanum+Gothic&display=swap');

  div {
    font-family: 'Comfortaa', cursive;
  }

  .elems >>>  h1 {
      font-family: cursive;
      font-size: 2em;
  }

</style>
