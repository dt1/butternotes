<template>
<div class="elems" v-html="this.info.data.html"></div>
</template>

<script>
import axios from 'axios'
import 'highlight.js/styles/ascetic.css';
import { rtToTitleCase } from '@/components/utils/string.js'

export default ({
    data () {
        return {
            article: this.$route.params.article,
            info: null
        }
    },

    mounted () {
        this.getData();
    }
    ,

    methods: {
        async getData() {
            this.info = await axios
                .get(`http://127.0.0.1:3000/on-programming/${this.article}`);
            document.title = "ButterNotes | " + rtToTitleCase(this.info.data.title);
        }
    }



})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&family=Nanum+Gothic&display=swap');

  div {
    font-family: 'Comfortaa', cursive;
    }

  .elems >>> .notes {
  margin: 0 4em 1em 2em;
  }

</style>
