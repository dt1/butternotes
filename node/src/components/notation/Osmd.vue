<template>
<div oid="osmdCanvas"></div>
</template>

<script>
  import { handleFileSelect } from '@/components/notation/utils/xml-loader.js'
  
  export default ({
  name: "osmd",
props: [ "notation" ],

  async mounted () {
  handleFileSelect(this.notation);
  }
  })

</script>

<style scoped></style>
