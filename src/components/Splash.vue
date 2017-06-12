<template>
    <div id="stage">
        <img class="logo" src="../assets/cav.png">
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
                title: 'Casual Card Table',
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
