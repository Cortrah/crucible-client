<template>
    <div class="crucible">
        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <button @click="replay()">Play Sequence</button>
        <span>{{ game.status }}</span>

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
    import CommandQueue from "./CommandQueue"

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        computed: mapState(['rules', 'game', 'avatars']),
        data () {
            return {
                "gameIntervalId": 0,
                "manaIntervalId": 0,
                "playhead": 0,
                "commands":[]
            }
        },
        methods: {
            queueCommand: function(command) {
                this.commands.push(command);
            },

            gogo: function() {
                if(this.playhead < this.commands.length){
                    let command = this.commands[this.playhead];
                    store.dispatch(command);
                    if(this.playhead < this.commands.length + 1) {
                        this.playhead++;
                    }
                }
            },

            ungo: function() {
                let command = this.commands[this.playhead];
                store.dispatch(command);
                if(this.playhead > 0){
                    this.playhead--;
                }
            },

            replay: function(){
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "drawMistle", playerId: 5 });
            },

            // player actions
            drawMistle: function(playerId){
                store.dispatch({ type: 'drawMistle', playerId: playerId});
            },
            drawShield: function(playerId){
                store.dispatch({ type: 'drawShield', playerId: playerId});
            },
            selectCard: function(playerId, cardIndex){
                store.dispatch({ type: 'selectCard', playerId:playerId, cardIndex:cardIndex});
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
                this.manaIntervalId = setInterval(this.manaTick, 1000);
                store.dispatch('startGame');
            },
            manaTick: function() {
                store.dispatch('manaTick');
                this.gogo();
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
