<template>
    <div class="crucible">
        <h1>{{ msg }}</h1>
        <player id="player1" :state="state" ></player>
        <player id="player2" :state="state" ></player>
    </div>
</template>

<script>
    import Player from './Player'

    export default {
        name: 'crucible',
        components: {Player},
        data () {
            return {
                state: {
                    thing1: 1,
                    thing2: 2,
                },
                msg: 'crucible'
            }
        }
    }
</script>

<style scoped>
</style>
