<template>

<div id="app">
  <div class="grid-container fluid">
    <div class="grid-x grid-margin-x">
      <div class="cell small-12">
        <h1 style="font-size: 1em;">
          <router-link to="/" class="black">Butter Notes</router-link>
          <br>
          <small class="black">Explore &amp; Practice Music.</small>
        </h1>
      </div>
    </div>
  </div>

  <div class="grid-x">
    <side-nav class="cell small-2" />
    <router-view class="cell small-7" name="maininfo" :key="$route.fullPath" />
    <div class="cell small-3">
      <amazon-ad class="cell small-offset-3" :key="$route.fullPath" />
    <!-- vert -->
      <Adsense
        data-ad-client="ca-pub-9497253845069586"
        data-ad-slot="6406886553"
        data-ad-test="on">
      </Adsense>
    </div>

    <!-- square -->
    <!-- <Adsense -->
    <!-- data-ad-client="ca-pub-9497253845069586" -->
    <!-- data-ad-slot="5439620945"> -->
    <!-- </Adsense> -->
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
