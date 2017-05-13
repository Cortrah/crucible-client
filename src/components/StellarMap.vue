<template>
    <div class="stellar-map">
        <svg height="80" width="650">
            <circle  v-for='star in stars' :cx='star.x' :cy='star.y' :r='star.r' fill='#fff'></circle>
        </svg>
    </div>
</template>


<script type="text/babel">
    import Vue from 'vue'

    export default {
        name: 'stellar-map',
        data: function() {
            return {
                'name': "Solar",
                'code': "Sol",
                'height': 80,
                'width': 650,
                'stars': []
            }
        },

        created: function () {
            for (var i = 0; i < 100; ++i) {
                this.stars.push({
                    x: Math.random() * 650,
                    y: Math.random() * 80,
                    r: Math.random() * 2,
                })
            }
            console.log(this.stars.toString());
        }
    }
</script>

<style>
    .stellar-map {
        height: 80px;
        width: 650px;
        padding: 0;
        margin: 0;
        background-color: black;
    }
</style>
