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
                                // once a player has 5 cards
                                // if the player has cards and enough mana to fire a mistle
                                // eventually choose the best mistle possible to fire
                                // in this case we just choose the first and wait till we can fire it
                                var ci = 0;
                                var card = player.cards[ci];
                                if (card.value < player.mana) {
                                    store.dispatch({ type: 'selectCard', playerId:i, cardIndex:ci});
                                }
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
                                        cardIndex:ci
                                    });
                                } else {
                                    // if the player is axis its enemy is an allie
                                    let activeFoes = this.game.players.filter((player) =>
                                        player.isActive && player.team === "Good Guys"
                                    );
                                    let foeCount = activeFoes.length;
                                    let foeChosen = Math.floor(Math.random()*foeCount);
                                    let foe = activeFoes[foeChosen];
                                    // and fire at it
                                    store.dispatch({
                                        type: 'targetPlayer',
                                        sourceId:i,
                                        targetId:foe.id,
                                        cardIndex:ci
                                    });
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
