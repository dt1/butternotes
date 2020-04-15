<template>
<div>
  <play-music v-if="sounds" :note-list="sounds" />
  <osmd v-if="notation" :notation="notation" />
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
        <scale-form />
      </div>
    </li>
  </ul>            
</div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

import PlayMusic from '@/components/notation/PlayMusic'
import Osmd from '@/components/notation/Osmd'
import DlMusicXml from '@/components/notation/DownloadMusicXml'
import ShowNotes from '@/components/notation/ShowNotes'
import MajorModes from '@/components/notation/MajorModes'
import ScaleForm from '@/components/notation/ScaleForm'


export default ({
    components: {
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
            modeList: null
        }
    },

    async mounted () {
        let scale = this.$route.params.scale;
        let stype = this.$route.params.stype;
        let ntype = this.$route.params.ntype;

        let result;

        if (ntype) {
            result = await axios
                .get(`http://localhost:3000/${scale}/${stype}/${ntype}`);
        } else {
            result = await axios
                .get(`http://localhost:3000/${scale}/${stype}`);
        }

//         this.$nextTick(); // wait for re-render
        this.notation = result.data.xml;

        if (result.data.sound) {
            this.sounds = JSON.parse(result.data.sound.replace(/'/g, '"'));
}

// this.$nextTick();


        if (scale == "major-scales") {
            this.modeList = this.sounds;
}

}
,

    updated() {
        this.$nextTick(function () {
            this.menu = new this.$foundation.Accordion($('.accordion'))
        })
    }

})


</script>

<style scoped></style>
