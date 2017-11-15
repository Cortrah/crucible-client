<template>
    <div>
        <div id="stage">
            <crucible></crucible>
            <span v-if="tables.length > 0">{{ tables[game.id].name }}</span>
            <button @click="startGame()">Start Game</button>
            <button @click="endGame()">End Game</button>
            <span>{{ game.status }}</span>
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
        data () {
            return {
                "gameIntervalId": 0,
                "manaIntervalId": 0,
            }
        },
        methods: {
            startGame: function() {
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
                this.gameIntervalId = setInterval(this.gameTick, 2000);
                this.manaIntervalId = setInterval(this.manaTick, 1000);
                this.$bus.$emit('start-game', {'gameId': this.$store.state.game.id});
            },
            gameTick: function() {
                if(this.game.status === "PLAYING"){
                    for(var i = 0; i < this.game.players.length; i++) {
                        let player = this.game.players[i];
                        if (player.isActive && player.controller === "AI") {
                            // if the player has < 5 cards and more than 1 mana draw a card
                            if (player.cards.length < 5 && player.mana > 0) {
                                this.$bus.$emit('draw-mistle', {'playerId': i});
                            } else {
                                // once a player has 5 cards
                                // if the player has cards and enough mana to fire a mistle
                                // eventually choose the best mistle possible to fire
                                // in this case we just choose the first and wait till we can fire it
                                var ci = 0;
                                var card = player.cards[ci];
                                if (card.value < player.mana) {
                                      this.$bus.$emit('select-card', {'playerId': i, cardIndex: ci});
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
                                    this.$bus.$emit('target-player', {
                                        'sourceId': i,
                                        'targetId': foe.id,
                                        'cardIndex': ci
                                    });
                                } else {
                                    // if the player is axis its enemy is an allie
                                    let activeFoes = this.game.players.filter((player) =>
                                        player.isActive && player.team === "Good Guys"
                                    );
                                    let foeCount = activeFoes.length;
                                    let foeChosen = Math.floor(Math.random()*foeCount);
                                    let foe = activeFoes[foeChosen];
                                    this.$bus.$emit('target-player', {
                                        'sourceId': i,
                                        'targetId': foe.id,
                                        'cardIndex': ci
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
                this.$bus.$emit('mana-tick');
            },
            endGame: function() {
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
                this.$bus.$emit('end-game', {'gameId': this.$store.state.game.id});
            }
        }
    }
</script>

<style>
    #stage {
        bottom-padding: 0px
    }
</style>
