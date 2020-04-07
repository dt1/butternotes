<template>
<div>
  <div id="osmdCanvas"></div>

</div>
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
console.log(scale);
console.log(stype);
const result = await axios
      .get(`http://localhost:3000/${scale}/${stype}`)
this.notation = result;
this.$nextTick(); // wait for re-render
// XmlJs(this.$ref.xml); // pass DOM element to third-party renderer
// handleFileSelect();
handleFileSelect(this.notation.data);
}})


</script>

<style scoped></style>
