<template>
    <svg  x="0px" y="0px" viewBox="0 0 20 30"
          width="20px" height="30px"
          @click="select()"
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
            },
            myIndex: null,
            selectedIndex: null,
        },
        data () {
            return {
                fill: "#393939",
                stroke: "#ffffff"
            }
        },
        computed: {
          isSel: function() {
              return (this.myIndex === this.selectedIndex);
          }
        },
        methods: {
            select: function () {
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
