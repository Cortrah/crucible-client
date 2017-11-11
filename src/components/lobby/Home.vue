<template>
    <div id="stage">
        <div class="home">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'Home',
        computed: {
            title () {
                return this.$store.state.game.title;
            }
        }
    }
</script>
