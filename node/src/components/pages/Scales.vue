<template>
<div>
  <note-menu />
  <play-music v-if="sounds" :note-list="sounds" :key="k" />
  <osmd v-if="notation" :notation="notation" :key="k" />
  <div>
    <ul class="accordion" data-accordion data-allow-all-closed="true">
      <li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title" v-if="notation">Download MusicXML</a>
        <div class="accordion-content" data-tab-content>
          <dl-music-xml v-if="notation" :xml="notation" />
        </div>
      </li>
      <li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title"  v-if="notation">Show Notes</a>
        <div class="accordion-content" data-tab-content>
          <show-notes v-if="sounds" :note-list="sounds" />
        </div>
      </li>
      <li class="accordion-item" v-if="modeList" data-accordion-item>
        <a href="#" class="accordion-title" v-if="notation">Show Modes and Relative Minor</a>
        <div class="accordion-content" data-tab-content>
          <major-modes :mode-list="modeList" />
        </div>
      </li>
      <li class="accordion-item" v-if="notation" data-accordion-item>
        <a href="#" class="accordion-title">Show Scale Form</a>
        <div class="accordion-content" data-tab-content>
          <scale-form @update-scale="updateNotes" />
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

import NoteMenu from '@/components/layout/NoteMenu'
import PlayMusic from '@/components/notation/PlayMusic'
import Osmd from '@/components/notation/Osmd'
import DlMusicXml from '@/components/notation/DownloadMusicXml'
import ShowNotes from '@/components/notation/ShowNotes'
import MajorModes from '@/components/notation/MajorModes'
import ScaleForm from '@/components/notation/ScaleForm'


export default ({
components: {
NoteMenu,
PlayMusic,
Osmd,
DlMusicXml,
ShowNotes,
MajorModes,
ScaleForm
},

data () {
return {
notation: null,
sounds: null,
modeList: null,
returnedData: null,
clef: null,
octave: null,
keysig: null,
scale: this.$route.params.scale,
stype: this.$route.params.stype,
ntype: this.$route.params.ntype,
result: null,
payload: new Object(),
k: 0
}
},

async mounted () {
this.getData();
}
,

updated() {
this.$nextTick(function () {
this.menu = new this.$foundation.Accordion($('.accordion'))
})
},

methods: {
updateNotes (value) {

this.payload.clef = value.get("clef");
this.payload.octave = value.get("octave").toString();
this.payload.keysig = value.get("keySig").toString();

this.getData();
}
,


forceRerender() {
      this.k += 1;
}
,

async getData () {
if (this.ntype) {
this.result =  await axios
    .post(`http://127.0.0.1:3000/${this.scale}/${this.stype}/${this.ntype}`, this.payload);
} else {
this.result = await axios
    .post(`http://127.0.0.1:3000/${this.scale}/${this.stype}`, this.payload);
}


this.$nextTick(); // wait for re-render
this.notation = this.result.data.xml;

if (this.result.data.sound) {
this.sounds = JSON.parse(this.result.data.sound.replace(/'/g, '"'));
}

this.forceRerender();
}




}
})


</script>

<style scoped></style>
