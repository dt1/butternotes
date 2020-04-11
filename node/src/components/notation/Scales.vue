<template>
<div>
  <play-music v-if="sounds" :note-list="sounds" />
  <osmd v-if="notation" :notation="notation" />
</div>
</template>

<script>
import axios from 'axios'
import PlayMusic from '@/components/notation/PlayMusic'
import Osmd from '@/components/notation/Osmd'

export default ({
components: {
PlayMusic,
Osmd
},

data () {
return {
notation: null,
sounds: null
}
},

async mounted () {
let scale = this.$route.params.scale;
let stype = this.$route.params.stype;
let ntype = this.$route.params.ntype;

let result;

if (ntype) {
result = await axios
    .get(`http://localhost:3000/${scale}/${stype}/${ntype}`);
} else {
result = await axios
    .get(`http://localhost:3000/${scale}/${stype}`);
}
this.$nextTick(); // wait for re-render
this.notation = result.data.xml;
if (result.data.sound) {
this.sounds = JSON.parse(result.data.sound.replace(/'/g, '"'));
}

}})


</script>

<style scoped></style>
