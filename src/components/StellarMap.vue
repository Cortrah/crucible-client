<template>
    <div class="stellar-map">
        <svg>
            <circle  v-for='star in stars' :cx='star.x' :cy='star.y' r='2px' fill='#fff'></circle>
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
                'height': 100,
                'width': 800,
                'stars': []
            }
        },

        created: function () {
            for (var i = 0; i < 1000; ++i) {
                this.stars.push({
                    x: Math.random() * 800,
                    y: Math.random() * 100,
                })
            }
        }
    }
</script>

<style>
    .stellar-map {
        height: 100px;
        width: 800px;
        padding: 0;
        margin: 0;
        background-color: black;
    }
</style>
