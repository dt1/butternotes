<template>
<ul class="menu">
  <li v-for="i in nav" :key="i[0]">
    <router-link v-bind:to="i[1]" >{{ i[0] }}</router-link>
  </li>
</ul>
</template>

<script>
const notes = ["c", "c-sharp",
"d-flat", "d", "d-sharp",
"e-flat", "e", "e-sharp",
"f-flat", "f", "f-sharp",
"g-flat", "g", "g-sharp",
"a-flat", "a", "a-sharp",
"b-flat", "b", "b-sharp",
"c-flat"]

function toEntity(note) {
note = note.replace("-sharp", "♯");
note = note.replace("-flat", "♭");
return note
}

function stripLink(scale, stype, ntype) {
let re = /\w-(flat-|sharp-)?/

if (ntype) {
return ntype.replace(re, "");
} else {
return stype.replace(re, '');
}
}

function genLinks(scale, stype, ntype) {
let a = stripLink(scale, stype, ntype)
let res = []

if (ntype) {
notes.forEach(element => res.push([toEntity(element), "/" + scale + "/" + stype + "/" + element + "-" + a]));
} else {
notes.forEach(element => res.push([toEntity(element), "/" + scale + "/" + element + "-" + a]));
}
return res;
}

export default ({
name: "note-menu",

data () {
return {
nav: null,
}
},
mounted() {
let scale = this.$route.params.scale;
let stype = this.$route.params.stype;
let ntype = this.$route.params.ntype;
this.nav = genLinks(scale, stype, ntype);
}
})


</script>

<style scoped></style>
