<template>

<div id="app">
  <div class="grid-container fluid">
    <div class="grid-x grid-margin-x">
      <div class="cell small-12">
        <h1 style="font-size: 1em;">
          <router-link to="/" class="black">unknown</router-link>
          <br>
          <small class="black">Explore &amp; Practice Music.</small>
        </h1>
      </div>
    </div>
  </div>

  <div class="grid-x">
    <side-nav class="cell large-3"/>
    <div class="cell large-7">
      <router-view name="notemenu" :key="$route.fullPath"></router-view>
      <router-view name="maininfo" :key="$route.fullPath"></router-view>
    </div>
    <amazon-ad class="cell large-2" :key="$route.fullPath"/>
    <!-- vert -->
    <Adsense
    data-ad-client="ca-pub-9497253845069586"
      data-ad-slot="6406886553"
      data-ad-test="on">
    </Adsense>

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
