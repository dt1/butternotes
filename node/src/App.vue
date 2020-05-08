<template>

<div id="app">
  <div class="grid-container fluid">

    <div class="grid-x">
      <div class="cell small-12">
        <h1 style="font-size: 1em;">
          <router-link to="/" class="bn">Butter Notes</router-link>
          <br>
          <small class="black">Explore &amp; Practice Music.</small>
        </h1>
      </div>
    </div>

    <div class="grid-x grid-margin-x" >
      <side-nav class="cell large-2 small-12" />
      <router-view class="cell large-7 small-12" name="maininfo" :key="$route.fullPath" />
      <div class="cell large-3 small-12">
        <amazon-ad class="cell large-offset-3" :key="$route.fullPath" />
      </div>
    </div>

  </div>
</div>

</template>

<script>
  import { rtToTitleCase } from '@/components/utils/string.js'

  export default ({
  watch: {
  $route (to) {
  if(to.params.ntype) {
  let tt = rtToTitleCase(to.params.ntype);
  document.title = `Butternotes | ${tt}`;
  } else if(to.params.stype) {
  let tt = rtToTitleCase(to.params.stype);
  document.title = `Butternotes | ${tt}`;
  }
  }
  }})

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=La+Belle+Aurore&display=swap');

  .bn {
      font-family: 'La Belle Aurore', cursive;
      font-size: 2.3em;
      color: #fad587;
      text-shadow: -1px 2px #9c6b06;
  }

  .black {
  color: black;
  }

</style>
