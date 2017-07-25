<template>
    <div class="helm">
        <div id="axis" class="team">
            <div class="team-container" v-for="player in game.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref = "axis"
                            :gameStatus = game.status
                            :id = player.id
                            :name = player.name
                            :team = player.team
                            :avatarImg = player.avatarImg
                            :maxMana = player.maxMana
                            :mana = player.mana
                            :maxHealth = player.maxHealth
                            :health = player.health
                            :shields = player.shields
                            :cards = player.cards
                            :deck = player.deck
                            :deckSize = player.deckSize
                            :startingDeckLength = rules.startingDeck.length
                            :drawEnabled = player.drawEnabled
                            :isBleedingOut = player.isBleedingOut
                            :isActive = player.isActive
                            @click = "targetPlayer(this.model.id, this.model.card)"
                            v-on:TARGETED = "targetPlayer">
                    </player>
                </span>
            </div>
        </div>

        <div id="no-mans-land">
            <stellar-map></stellar-map>
        </div>

        <div v-if="game.winner !== ''">
            {{game.winner}} Victorious
        </div>

        <div id="allies" class="team">
            <div class="team-container" v-for="player in game.players">
                <span v-if="player.team === 'Good Guys'">
                    <player ref="allies"
                            :gameStatus = game.status
                            :id = player.id
                            :name = player.name
                            :team = player.team
                            :avatarImg = player.avatarImg
                            :maxMana = player.maxMana
                            :mana = player.mana
                            :maxHealth = player.maxHealth
                            :health = player.health
                            :shields = player.shields
                            :cards = player.cards
                            :deck = player.deck
                            :deckSize = player.deckSize
                            :startingDeckLength = rules.startingDeck.length
                            :drawEnabled = player.drawEnabled
                            :isBleedingOut = player.isBleedingOut
                            :isActive = player.isActive
                            @click = "targetPlayer(this.id, this.card)"
                            v-on:TARGETED="targetPlayer">
                    </player>
                </span>
            </div>
        </div>

        <div class="console">
            <PlayerConsole  ref="player-console"
                            :gameStatus = game.status
                            :id = playerId
                            :name = game.players[playerId].name
                            :team = game.players[playerId].team
                            avatarImg = '../../static/horizontal_control.png'
                            :maxMana = game.players[playerId].maxMana
                            :mana = game.players[playerId].mana
                            :maxHealth = game.players[playerId].maxHealth
                            :health = game.players[playerId].health
                            :shields = game.players[playerId].shields
                            :cards = game.players[playerId].cards
                            :deck = game.players[playerId].deck
                            :deckSize = game.players[playerId].deckSize
                            :selectedCardIndex = game.players[playerId].selectedCardIndex
                            :startingDeckLength = rules.startingDeck.length
                            :drawEnabled = game.players[playerId].drawEnabled
                            :isBleedingOut = game.players[playerId].isBleedingOut
                            :isActive = game.players[playerId].isActive
                            v-on:SELECT_CARD="selectCard">
            </PlayerConsole>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>

        <div id="mistles">
            <div class="mistles-container"
                 v-for="mistle in game.inFlight">
                <MistleInFlight
                    :id = mistle.id
                    :sourceX = sourceX(mistle.sourceId)
                    :sourceY = sourceY(mistle.sourceId)
                    :targetX = targetX(mistle.targetId)
                    :targetY = targetY(mistle.targetId)
                    :card = mistle.card
                    :flightTime = mistle.flightTime>
                </MistleInFlight>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from '../cast/Player'
    import Portrait from '../cast/Portrait'
    import PlayerConsole from '../cast/PlayerConsole'
    import MistleInFlight from '../props/MistleInFlight'
    import StellarMap from './StellarMap'

    import { mapState } from 'vuex'

    export default {
        name: "Helm",
        props: {
            "playerId": 0,
        },
        components: {Player, MistleInFlight, Portrait, PlayerConsole, StellarMap},
        data () {
            return {
                name: this.name,
                gameIntervalId: 0
            }
        },
        created() {
            this.gameIntervalId = setInterval(this.tick, 200);
        },
        computed: mapState({
            game: state => state.game,
            rules: state => state.rules,
            avatars: state => state.avatars
        }),
        methods: {
            tick: function() {
                let myself = this.game.players[this.playerId];
//                if(this.myself.isActive && this.game.status === "PLAYING"){
//                    // if I have < 5 cards and more than 1 mana draw a card
//                    if(this.myself.cards.length < 5 && this.myself.mana > 0){
//                        this.drawMistle();
//                    }
//                    let mana = this.myself.mana - 1;
//                    // if I have cards and enough mana to fire a mistle
//                    for(var i = 0; i < this.myself.cards.length; i++){
//                        var card = this.myself.cards[i];
//                        if(card < mana){
//                            this.selectCard(card, i);
//                        }
//                    }
//                    // choose an enemy that's still active
//                    if(this.myself.team === "Good Guys"){
//                        for(var i = 0; i < this.$refs.axis.length; i++){
//                            var foe = this.$refs.axis[i];
//                            if(foe.isActive === true){
//                                // and fire at it
//                                this.targetPlayer(foe.id);
//                                // but only fire one maximum per tick
//                                break;
//                            }
//                        }
//                    } else {
//                        // if we are an enemy the enemy is my ally
//                        for(var i = 0; i < this.$refs.allies.length; i++){
//                            var foe = this.$refs.allies[i];
//                            if(foe.isActive === true){
//                                // and fire at it
//                                this.targetPlayer(foe.id);
//                                // but only fire one maximum per tick
//                                break;
//                            }
//                        }
//                    }
//                } else {
//                    clearInterval(this.gameIntervalId);
//                }
            },
            sourceX: function (sourceId) {
                console.log("sourceX");
                console.log(sourceId);
                let sourcePlayerVm = this.getPlayerVm(sourceId);
                console.log(sourcePlayerVm);
                let sRect = sourcePlayerVm.$el.getBoundingClientRect();
                return sRect.left + sRect.width / 2;
            },
            sourceY: function (sourceId) {
                console.log("sourceY");
                console.log(sourceId);
                let sourcePlayerVm = this.getPlayerVm(sourceId);
                let sRect = sourcePlayerVm.$el.getBoundingClientRect();
                return sRect.top + sRect.height / 2;
            },
            targetX: function (targetId) {
                console.log("targetX");
                console.log(targetId);
                let targetPlayerVm = this.getPlayerVm(targetId);
                let tRect = targetPlayerVm.$el.getBoundingClientRect();
                return tRect.left + tRect.width / 2;
            },
            targetY: function (targetId) {
                console.log("targetY");
                console.log(targetId);
                let targetPlayerVm = this.getPlayerVm(targetId);
                let tRect = targetPlayerVm.$el.getBoundingClientRect();
                return tRect.top + tRect.height / 2;
            },
            drawMistle: function () {
                console.log("drawMistle");
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0){
                        this.$emit("DRAW_MISTLE", this.playerId);
                    }
                }
            },
            drawShield: function () {
                console.log("drawShield");
                let myself = this.game.players[this.playerId];
                if(this.myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("DRAW_SHIELD", this.playerId);
                }
            },
            selectCard: function (card, index) {
                console.log("selectCard called in helm");
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("SELECT_CARD", this.playerId, index);
                }
            },
            targetPlayer: function (targetId) {
                console.log("targetPlayer called in helm");
                console.log(targetId);
                //let cardIndex = this.game.players[sourceId].selectedCardIndex;
                let cardIndex = 0;
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("TARGET_PLAYER", this.playerId, targetId, 0);
                }
            },
            getPlayerVm: function(playerId){
                console.log("getPlayerVm called in helm");
                console.log("playerId:" + playerId);
                // for each in axis and allies
                for(let i = 0; i < this.$refs.axis.length; i++){
                    if (playerId == this.$refs.axis[i].id){
                        console.log(this.$refs.allies[i].name);
                        return this.$refs.axis[i];
                    }
                }
                for(let i = 0; i < this.$refs.allies.length; i++){
                    if (playerId == this.$refs.allies[i].id){
                        console.log(this.$refs.allies[i].name);
                        return this.$refs.allies[i];
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .helm {
        width: 650px;
        height: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .team {
        width: 650px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .team-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #no-mans-land {
        height: 80px;
    }

</style>
