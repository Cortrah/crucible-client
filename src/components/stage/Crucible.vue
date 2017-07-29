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
    import store from '../../store/store.js'
    import { mapState } from 'vuex'

    import Player from '../cast/Player'
    import Helm from './Helm'

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        computed: mapState(['rules', 'game', 'avatars']),
        data () {
            return {
                "gameIntervalId": 0,
                "manaIntervalId": 0,
            }
        },
        methods: {
            // player actions
            drawMistle: function(playerId){
                store.dispatch({type: 'drawMistle', playerId: playerId});
            },
            drawShield: function(playerId){
                store.dispatch({type: 'drawShield', playerId: playerId});
            },
            selectCard: function(playerId, cardIndex){
                store.dispatch({type: 'selectCard', playerId:playerId, cardIndex:cardIndex});
            },
            targetPlayer: function (sourceId, targetId, cardIndex) {
                store.dispatch({
                    type: 'targetPlayer',
                    sourceId:sourceId,
                    targetId:targetId,
                    cardIndex:cardIndex
                });
            },
            // game management
            startGame: function() {
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
                this.gameIntervalId = setInterval(this.gameTick, 100);
                this.manaIntervalId = setInterval(this.manaTick, 1000);
                store.dispatch('startGame');
            },
            gameTick: function() {
                store.dispatch('gameTick');
            },
            manaTick: function() {
                store.dispatch('manaTick');
            },
            endGame: function() {
                store.dispatch('endGame');
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
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
