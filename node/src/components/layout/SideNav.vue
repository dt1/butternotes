<template>
<div>
  <ul class="vertical menu accordion-menu" data-accordion-menu data-multi-open="false">
    <li v-for="i in nav" :key="i.title">
      <router-link v-bind:to=i.href>{{ i.title }}</router-link>
      <ul class="menu vertical nested" v-if="i.sub1">
        <li v-for="j in i.sub1" :key="j.name">
          <router-link v-bind:to=j.href>{{ j.name }}</router-link>
          <ul class="menu vertical nested" v-if="j.sub2">
            <li v-for="k in j.sub2" :key="k.name">
              <router-link v-bind:to=k.href>{{ k.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>


<script>
import $ from 'jquery'
import axios from 'axios'

export default ({
data () {
return {
nav: null
}
},

mounted () {
        axios
            .get('http://127.0.0.1:3000/sidenav')
            .then(result => (this.nav = result.data.sidenav));
    },

    updated() {
        this.$nextTick(function () {
            this.menu = new this.$foundation.AccordionMenu($('.accordion-menu'))
        })
    },

    destroyed () {
        this.menu.destroy()
    }
})

</script>

<style scoped>
.accordion-menu {
    width: 200px;
    font-family: cursive;
    font-size: 1.5em;
}

a {
    color: #9c6b06;
}

</style>
