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
            "sourcePlayer": {},
            "targetPlayer": {},
            "card": 0,
            "flightTime": 4000
        },
        data(){
            return {
                fill: "#993946",
                stroke: "#e5bc63",
            }
        },
        mounted: function() {
            console.log("mistle mounted");
            TweenMax.to(this.$el, 4, {x:300, y:300});
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
