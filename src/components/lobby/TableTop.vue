<template>
    <div>
        <div id="stage">
            <crucible></crucible>
            <div class="game-controller">
                <span v-if="tables.length > 0">{{ tables[game.id].name }}</span>
                <button @click="startGame()">Start Game</button>
                <button @click="endGame()">End Game</button>
                <span>{{ game.status }}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Crucible from '../stage/Crucible'
    import { mapState } from 'vuex'

    export default {
        name: 'table-top',
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
                    for(let i = 0; i < this.game.actors.length; i++) {
                        let actor = this.game.actors[i];
                        if (actor.isActive && actor.controller === "AI") {
                            // if the actor has < 5 cards and more than 1 mana draw a card
                            if (actor.cards.length < 5 && actor.mana > 0) {
                                this.$bus.$emit('draw-mistle', {'actorId': i});
                            } else {
                                // once a actor has 5 cards
                                // if the actor has cards and enough mana to fire a mistle
                                // eventually choose the best mistle possible to fire
                                // in this case we just choose the first and wait till we can fire it
                                let ci = 0;
                                let card = actor.cards[ci];
                                if (card.value < actor.mana) {
                                      this.$bus.$emit('select-card', {'actorId': i, cardIndex: ci});
                                }
                                // choose an enemy that's still active
                                if (actor.team === "Good Guys") {
                                    // make the enemy chosen random
                                    let activeFoes = this.game.actors.filter((actor) =>
                                        actor.isActive && actor.team === "Bad Guys"
                                    );
                                    let foeCount = activeFoes.length;
                                    let foeChosen = Math.floor(Math.random()*foeCount);
                                    let foe = activeFoes[foeChosen];
                                    this.$bus.$emit('target-actor', {
                                        'sourceId': i,
                                        'targetId': foe.id,
                                        'cardIndex': ci
                                    });
                                } else {
                                    // if the actor is axis its enemy is an allie
                                    let activeFoes = this.game.actors.filter((actor) =>
                                        actor.isActive && actor.team === "Good Guys"
                                    );
                                    let foeCount = activeFoes.length;
                                    let foeChosen = Math.floor(Math.random()*foeCount);
                                    let foe = activeFoes[foeChosen];
                                    this.$bus.$emit('target-actor', {
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
    .game-controller {
        width: 600px;
    }
</style>
