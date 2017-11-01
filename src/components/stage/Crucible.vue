<template>
    <div class="crucible">
        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <button @click="replay()">Play Sequence</button>
        <span>{{ game.status }}</span>

        <div class="players-container">
            <helm ref="helm" playerId="7" :game="game" :rules="rules" :avatars="avatars"
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
    import { mapState } from 'vuex'
    import store from '../../store/store.js'

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
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
                this.queueCommand({ type: "drawMistle", playerId: 5 });
                this.queueCommand({ type: "selectCard", playerId: 5, cardIndex: 0});
                this.queueCommand({ type: "targetPlayer", sourceId: 5, targetId: 1, cardIndex: 0});
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
                this.gameIntervalId = setInterval(this.gameTick, 2000);
                this.manaIntervalId = setInterval(this.manaTick, 1000);
                store.dispatch('startGame');
            },
            gameTick: function() {
                if(this.game.status === "PLAYING"){
                    for(var i = 0; i < this.game.players.length; i++) {
                        let player = this.game.players[i];
                        if (player.isActive && player.controller === "AI") {
                            // if the player has < 5 cards and more than 1 mana draw a card
                            if (player.cards.length < 5 && player.mana > 0) {
                                store.dispatch({ type: 'drawMistle', playerId: i});
                            } else {
                                // if the player has cards and enough mana to fire a mistle
                                // choose the best mistle possible to fire

                                var c = 0;
                                //for (var c = 0; c < player.cards.length; c++) {
                                var card = player.cards[c];
                                if (card.value < player.mana) {
                                    store.dispatch({ type: 'selectCard', playerId:i, cardIndex:c});
                                }
                                //}
                                // choose an enemy that's still active
                                if (player.team === "Good Guys") {
                                    // make the enemy chosen random
                                    let activeFoes = this.game.players.filter((player) =>
                                        player.isActive && player.team === "Bad Guys"
                                    );
                                    let foeCount = activeFoes.length;
                                    let foeChosen = Math.floor(Math.random()*foeCount);
                                    let foe = activeFoes[foeChosen];
                                    // and fire at it
                                    store.dispatch({
                                        type: 'targetPlayer',
                                        sourceId:i,
                                        targetId:foe.id,
                                        cardIndex:0
                                    });
                                } else {
                                    // if the player is axis its enemy is an allie
                                    for (var f = 0; f < this.game.players.length; f++) {
                                        var foe = this.game.players[f];
                                        if (foe.isActive === true && foe.team === "Good Guys") {
                                            // and fire at it
                                            store.dispatch({
                                                type: 'targetPlayer',
                                                sourceId:i,
                                                targetId:foe.id,
                                                cardIndex:0
                                            });
                                            // but only fire one maximum per tick
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if( this.game.status === "OVER") {
                    clearInterval(this.gameIntervalId);
                }
            },
            manaTick: function() {
                store.dispatch('manaTick');
                //this.gogo();
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
