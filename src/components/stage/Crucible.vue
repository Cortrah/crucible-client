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
        data () {
            return {
                "gameIntervalId": 0,
                "manaIntervalId": 0,
            }
        },
        methods: {
            drawMistle: function(playerId){
                store.dispatch({type: 'drawMistle', playerId: playerId});
            },
            drawShield: function(playerId){
                store.dispatch({type: 'drawShield', playerId: playerId});
            },
            selectCard: function(playerId, cardIndex){
                console.log("selectCard called in crucible " + cardIndex);
                store.dispatch({type: 'selectCard', playerId:playerId, cardIndex:cardIndex});
            },
            targetPlayer: function (sourceId, targetId) {
                console.log("targetPlayer called in crucible");
                console.log(sourceId);
                console.log(targetId);
                let cardIndex = this.game.players[sourceId].selectedCardIndex;
                console.log(cardIndex);
                store.dispatch({type: 'targetPlayer', sourceId:sourceId, targetId:targetId, cardIndex:cardIndex});
            },
            startGame: function() {
                store.dispatch('startGame');
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
                this.gameIntervalId = setInterval(this.gameTick, 100);
                this.manaIntervalId = setInterval(this.manaTick, 1000);
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
