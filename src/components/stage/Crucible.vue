<template>
    <div class="crucible">

        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <span>{{ this.game.timeRunning }}</span>
        <div class="players-container">
            <helm ref="helm" playerId="5" :game="game" :rules="rules" :avatars="avatars"
                  v-on:TARGET_PLAYER="targetPlayer"
                  v-on:DRAW_MISTLE="drawMistle"
                  v-on:DRAW_SHIELD="drawShield"
                  v-on:SELECT_CARD="selectCard" >
            </helm>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'

    import Player from '../cast/Player'
    import Helm from './Helm'

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        computed: mapState(['rules', 'game', 'avatars']),
        methods: {
            drawMistle: function(playerId){
                let player = this.game.players[playerId];
                if(player.mana >= 1 && player.deck.length > 0) {
                    let drawn = player.deck[0];
                    player.cards.push(drawn);
                    player.deck.splice(0, 1);
                    player.deckSize = player.deck.length;
                    player.mana--;
                }
            },
            drawShield: function(playerId){
                //let player = this.game.players[playerId];
                //let shield = new Shield(player.deck[0]);
                //player.cards.push(shield);
                //player.deck.splice(0,1);
            },
            selectCard: function(playerId, cardIndex){
                let player = this.game.players[playerId];
                player.selectedCardIndex = cardIndex;
            },
            targetPlayer: function (sourceId, targetId) {
                if (this.areEnemies(sourceId, targetId)){
                    let sourcePlayer = this.game.players[sourceId];
                    if(sourcePlayer.selectedCardIndex !== -1) {
                        let card = sourcePlayer.cards[sourcePlayer.selectedCardIndex];
                        if(sourcePlayer.mana >= card){
                            let targetPlayer = this.game.players[targetId];
                            sourcePlayer.mana -= card;
                            sourcePlayer.cards.splice(sourcePlayer.selectedCardIndex, 1);
                            sourcePlayer.selectedCardIndex = -1;
                            this.launchMistle(sourcePlayer, targetPlayer, card)
                        }
                    }
                }
            },
            launchMistle: function(sourcePlayer, targetPlayer, card) {
                if(sourcePlayer.isActive){
                    // eventually the timer might be different for different cards or mistles
                    this.game.inFlight.push({
                        id: new Date(),
                        sourceId: sourcePlayer.id,
                        targetId: targetPlayer.id,
                        card: card,
                        flightTime: this.rules.flightTime
                    });
                    setTimeout(this.mistleImpact, this.rules.flightTime, sourcePlayer, targetPlayer, card);
                }
            },
            mistleImpact: function(sourcePlayer, targetPlayer, mistle){
                if(this.game.status === "PLAYING") {
                    targetPlayer.health = Math.max(0, targetPlayer.health - mistle);
                    if (targetPlayer.health <= 0) {
                        targetPlayer.isActive = false;
                        this.game.winner = sourcePlayer.team;
                        this.endGame();
                    }
                }
            },
            areEnemies: function(player1Id, player2Id){
                let p1 = this.game.players[player1Id];
                let p2 = this.game.players[player2Id];
                return (p1.team !== p2.team);
            },
            shuffle: function(array) {
                let remaining = array.length;
                let randomIndex;
                let last;

                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = array[remaining];
                    array[remaining] = array[randomIndex];
                    array[randomIndex] = last;
                }
                return array;
            },
            startGame: function() {
                var scope = this;
                this.game.players.forEach(function(player){
                    player.deck = scope.shuffle(player.deck);
                });
                this.game.timeStarted = Date.now();
                this.game.timeRunning = 0;
                clearInterval(this.game.gameIntervalId);
                clearInterval(this.game.manaIntervalId);
                this.game.gameIntervalId = setInterval(this.gameTick, 100);
                this.game.manaIntervalId = setInterval(this.manaTick, 1000);
            },
            gameTick: function() {
                this.game.timeRunning = Date.now() - this.game.timeStarted;
            },
            manaTick: function() {
                this.game.players.forEach(function(player){
                    if(player.maxMana < 10){
                        player.maxMana++;
                    }
                    if(player.mana < player.maxMana){
                        player.mana++;
                    }
                    if(player.deck.length <= 0 && player.cards.length === 0 && player.isActive){
                        player.health--;
                    }
                })
            },
            endGame: function() {
                this.game.status = "OVER";
                clearInterval(this.game.gameIntervalId);
                clearInterval(this.game.manaIntervalId);
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
