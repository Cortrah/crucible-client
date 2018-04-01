<template>
    <svg x="0px" y="0px" viewBox="0 0 20 30"
         width="20px" height="30px"
         @click="select()"
         :class="[isSel ? 'sel' : 'unsel']">

        <rect x="0" y="0" :fill="fill" :stroke="stroke" width="20" height="30"/>
        <text x="8" y="24" fill="white">
            {{ faceVal }}
        </text>

        <svg id="shieldIcon" v-if="cardType == 'SHIELD'"
             x="2px" y="2px"
             width="9px" height="9.605px"
             viewBox="0 0 9 9.605"
             enable-background="new 0 0 9 9.605">
            <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="4" ry="4.302"/>
            <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="1.561" ry="1.86"/>
        </svg>

        <svg id="mistleIcon" v-if="cardType == 'MISTLE'"
             x="2px" y="2px" width="6px" height="10px"
             viewBox="0 0 6 10" enable-background="new 0 0 6 10">
            <ellipse
                    fill="#F7F7F7" stroke="#000000"
                    cx="3.29" cy="4.773" rx="2.469" ry="4.274"/>
            <rect x="0.5" y="8"
                  transform="matrix(0.9997 -0.0226 0.0226 0.9997 -0.2084 0.0768)"
                  fill="#F7F7F7" stroke="#000000"
                  width="5.503" height="2.461"/>
        </svg>

    </svg>
</template>

<script type="text/babel">

    export default {
        name: "simple-card",
        props: {
            faceVal: {
                default: 0
            },
            cardType: {
                default: "MISTLE"
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
            isSel: function () {
                return (this.myIndex === this.selectedIndex);
            },
        },
        methods: {
            select: function () {
                this.$emit('select-card', true)
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
