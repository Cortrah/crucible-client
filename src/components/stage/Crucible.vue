<template>
    <div class="crucible">

        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <span>{{ this.game.timeRunning }}</span>
        <div class="players-container">
            <helm ref="helm" playerId="5" :game="game" :rules="rules" :avatars="avatars"
                  v-on:DRAW_MISTLE="drawMistle"
                  v-on:DRAW_SHIELD="drawShield"
                  v-on:SELECT_CARD="selectCard"
                  v-on:TARGET_PLAYER="targetPlayer">
            </helm>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../../store'
    import { mapState } from 'vuex'

    import Player from '../cast/Player'
    import Helm from './Helm'

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        computed: mapState(['rules', 'game', 'avatars']),
        methods: {
            drawMistle: function(playerId){
                store.commit('drawMistle', playerId);
            },
            drawShield: function(playerId){
                store.commit('drawShield', playerId);
            },
            selectCard: function(playerId, cardIndex){
                store.commit('selectCard', playerId, cardIndex);
            },
            targetPlayer: function (sourceId, targetId) {
                store.commit('targetPlayer', sourceId, targetId);
            },
            startGame: function() {
                store.commit('startGame');
            },
            endGame: function() {
                store.commit('endGame');
            }
        }
    }
</script>

<style scoped>
    .players-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
