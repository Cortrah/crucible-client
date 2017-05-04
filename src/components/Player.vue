<template>
    <div class="player">
        <h2>{{ msg }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'player',
        props: ['state'],
        data () {
            return {
                msg: "player" + " " + this._uid
            }
        }
    }
</script>

<style>
</style>
