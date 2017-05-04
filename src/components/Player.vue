<template>
    <div class="player">
        <h2>{{ msg }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'player',
        props: ['model','game'],
        data () {
            return {
                msg: "player" + " " + this._uid + " " + this.model.name
            }
        }
    }
</script>

<style>
</style>
