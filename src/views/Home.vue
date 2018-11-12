<template>
    <div class="sktch">
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import p5 from 'p5';
import sketch from '@/visualizer/zktch.ts';
@Component({
    name: 'Playback',
    props: {
    },
    components: {
    },
})
export default class Playback extends Vue{
    data() {
        return {
            mp5: null,
        }
    }
    mounted() {
        this.mp5 = new p5(sketch);
    }
}
</script>

<style scoped lang="sass">
.sktch
    height: 100%
    width: 100%
    margin: 0
    padding: 0
</style>
