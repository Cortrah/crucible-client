<template>
    <div>
        <svg x="2px" y="2px"
             width="9px" height="9.605px"
             viewBox="0 0 9 9.605"
             enable-background="new 0 0 9 9.605">
            <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="4" ry="4.302"/>
            <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="1.561" ry="1.86"/>
        </svg>
    </div>
</template>

<script type="text/babel">
    import {TweenMax} from "gsap";

    export default {
        name: "Shield",
        props: {
            "id":{
                required: true
            },
            "card": {
                required: true
            },
            "shieldUpTime": {
                default: 1
            },
            "isUp": false
        },
        mounted: function() {
            TweenMax.fromTo(
                this.$el, 1,
                {x: this.sourceX, y: this.sourceY},
                {x: this.targetX, y: this.targetY,
                    ease: Power4.easeInOut,
                    onComplete:this.onUp});
        },
        onUp: function() {
            this.$emit("SHIELD_UP", this.id)
        }
    }
</script>

