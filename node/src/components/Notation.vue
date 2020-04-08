<template>
  <div id="osmdCanvas"></div>
</template>

<script>
import axios from 'axios'
import { handleFileSelect } from '@/../public/js/osmd/xml-loader.js'

export default ({
data () {
return {
notation: null,
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
this.notation = result;
this.$nextTick(); // wait for re-render
handleFileSelect(this.notation.data);
console.log(this.notation.data)
}

})


</script>

<style scoped></style>
