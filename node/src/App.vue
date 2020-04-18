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
    <side-nav class="cell small-3"/>
    <div class="cell small-7">
      <router-view name="notemenu" :key="$route.fullPath"></router-view>
      <router-view name="maininfo" :key="$route.fullPath"></router-view>
    </div>
    <amazon-ad class="cell small-2" :key="$route.fullPath"/>
  </div>

</div>
</template>

<script>
</script>
