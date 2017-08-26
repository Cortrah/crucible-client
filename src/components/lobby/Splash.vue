<template>
    <div id="stage">
        <div class="splash">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'Splash',
        data () {
            return {
                title: 'Waypoint Crucible',
            }
        }
    }
</script>

<style>
    .logo {
        width: 151px;
        height: 185px
    }
</style>
