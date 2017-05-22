<template>
    <div class="mistle">
        <svg  x="0px" y="0px"
              width="12px" height="12px"
              viewBox="0 0 12 12">

            <ellipse :fill="fill" :stroke="stroke" cx="6"  cy="6" rx="3" ry="3"/>
        </svg>
    </div>
</template>

<script type="text/babel">
    import {TweenMax} from "gsap";

    export default {
        name: "MistleInFlight",
        props: {
            "sourceX": {
                default: 0
            },
            "sourceY": {
                default: 0
            },
            "targetX": {
                default: 300
            },
            "targetY": {
                default: 300
            },
            "card": {
                default: 0
            },
            "flightTime": {
                default: 4
            }
        },
        data(){
            return {
                fill: "#993946",
                stroke: "#e5bc63",
            }
        },
        mounted: function() {
            TweenMax.fromTo( this.$el, 4,
                {x: this.sourceX, y: this.sourceY},
                {x: this.targetX, y: this.targetY});
        }
    }
</script>

<style scoped>
    .mistle {
        position: fixed;
        top:0;
        left:0;
    }
</style>
