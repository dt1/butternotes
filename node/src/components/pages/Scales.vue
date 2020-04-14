<template>
<div>
  <play-music v-if="sounds" :note-list="sounds" />
  <osmd v-if="notation" :notation="notation" />
  <p v-if="notation">Download MusicXML</p>
  <dl-music-xml v-if="notation" :xml="notation" />
  <p v-if="notation">Show Notes</p>
  <show-notes v-if="sounds" :note-list="sounds" />
  <p v-if="notation">Show Modes and Relative Minor</p>
  <major-modes v-if="modeList" :mode-list="modeList" />
  <scale-form v-if="notation" />
</div>
</template>

<script>
import axios from 'axios'
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

        this.$nextTick(); // wait for re-render
        this.notation = result.data.xml;

        if (result.data.sound) {
            this.sounds = JSON.parse(result.data.sound.replace(/'/g, '"'));
        }


        if (scale == "major-scales") {
            this.modeList = this.sounds;
        }

    }
})


</script>

<style scoped></style>
