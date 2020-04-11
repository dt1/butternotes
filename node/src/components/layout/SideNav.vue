<template>
    <ul class="vertical menu" data-accordion-menu>
      <li v-for="i in nav" :key="i.title">
        <router-link v-bind:to=i.href @click='toggle = !toggle'>{{ i.title }}</router-link>
      <ul class="vertical menu nested">
        <li v-for="j in i.sub1" :key="j.name">
          <router-link v-bind:to=j.href v-if="toggle" >{{ j.name }}</router-link>
          <ul class="vertical menu nested">
            <li v-for="k in j.sub2" :key="k.name">
              <router-link v-bind:to=k.href>{{ k.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
      </li>
    </ul>
</template>


<script>

import axios from 'axios'

export default ({
data () {
return {
nav: null,
toggle: true,
}
},
mounted () {
axios
    .get('http://localhost:3000/sidenav')
    .then(result => (this.nav = result.data.sidenav));
},
}
)

</script>
