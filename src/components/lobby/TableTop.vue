<template>
    <div>
        <span v-if="tables.length > 0">{{ tables[game.id].name }}</span>
        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <span>{{ game.status }}</span>

        <div id="stage">
            <crucible></crucible>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue'
    import Crucible from '../stage/Crucible'
    import { mapState } from 'vuex'

    export default {
        name: 'TableTop',
        components: {Crucible},
        computed: mapState(['game', 'tables']),
    }
</script>

<style>
</style>
