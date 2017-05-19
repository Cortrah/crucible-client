<template>
    <svg  x="0px" y="0px" viewBox="0 0 20 30"
          width="20px" height="30px"
          @click="selected()"
          :class="[isSel ? 'sel' : 'unsel']">

        <rect x="0" y="0" :fill="fill" :stroke="stroke" width="20" height="30"/>
        <text x="5" y="20" fill="white">
            {{ faceVal }}
        </text>

    </svg>
</template>

<script type="text/babel">
    import Vue from 'vue';

    export default {
        name: "SimpleCard",
        props: {
            faceVal: {
                default: 0
            }
        },
        data () {
            return {
                isSel: false,
                fill: "#345cee",
                stroke: "#345cee"
            }
        },
        methods: {
            selected: function () {
                if(this.isSel == false){
                    this.isSel = true;
                } else {
                    this.isSel = false;
                }
                this.$emit('SELECT_CARD', true)
            }
        }
    }
</script>

<style scoped>
    .unsel {
        box-shadow: 0 0 1em #345cee;
    }

    .sel {
        box-shadow: 0 0 1em #ee9554;
    }
</style>
