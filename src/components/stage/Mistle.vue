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
        name: "mistle",
        props: {
            "id":{
                required: true
            },
            "sourceX": {
                default: 0
            },
            "sourceY": {
                default: 0
            },
            "targetX": {
                default: 0
            },
            "targetY": {
                default: 0
            },
            "card": {
                required: true
            },
            "flightTime": {
                default: 4
            },
            "hasLanded": false
        },
        data(){
            return {
                fill: "#993946",
                stroke: "#e5bc63",
            }
        },
        mounted: function() {
            TweenMax.fromTo(
                this.$el, 4,
                {x: this.sourceX, y: this.sourceY},
                {x: this.targetX, y: this.targetY,
                    ease: Power4.easeInOut,
                    onComplete:this.onImpact});
        },
        onImpact: function() {
            //this.$emit("impact", this.id)
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
