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
                 v-for="mistle in game.mistles">
                <Mistle
                    :id = mistle.id
                    :sourceX = sourceX(mistle.sourceId)
                    :sourceY = sourceY(mistle.sourceId)
                    :targetX = targetX(mistle.targetId)
                    :targetY = targetY(mistle.targetId)
                    :card = mistle.card
                    :hasLanded = mistle.hasLanded
                    :flightTime = mistle.flightTime>
                </Mistle>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from '../cast/Player'
    import Portrait from '../cast/Portrait'
    import PlayerConsole from '../cast/PlayerConsole'
    import Mistle from '../props/Mistle'
    import StellarMap from './StellarMap'

    import { mapState } from 'vuex'

    export default {
        name: "Helm",
        props: {
            "playerId": 0,
        },
        components: {Player, Mistle, Portrait, PlayerConsole, StellarMap},
        data () {
            return {
                name: this.name,
                gameIntervalId: 0
            }
        },
        created() {
            this.gameIntervalId = setInterval(this.tick, 1000);
        },
        computed: mapState({
            game: state => state.game,
            rules: state => state.rules,
            avatars: state => state.avatars
        }),
        methods: {
            // main player actions
            drawMistle: function () {
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0){
                        this.$emit("DRAW_MISTLE", this.playerId);
                    }
                }
            },
            drawShield: function () {
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0) {
                        this.$emit("DRAW_SHIELD", this.playerId);
                    }
                }
            },
            selectCard: function (card, cardIndex) {
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("SELECT_CARD", this.playerId, cardIndex);
                }
            },
            targetPlayer: function (targetId) {
                let myself = this.game.players[this.playerId];
                let cardIndex = myself.selectedCardIndex;
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("TARGET_PLAYER", this.playerId, targetId, cardIndex);
                }
            },
            // helper functions for rendering the view
            sourceX: function (sourceId) {
                if(typeof sourceId !== "undefined"){
                    let rect = null;
                    for(let i = 0; i < this.$refs.axis.length; i++){
                        if (sourceId == this.$refs.axis[i].id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].id){
                            rect = this.$refs.allies[i].$el.getBoundingClientRect()
                        }
                    }
                    return rect.left + 75;
                } else {
                    return 0;
                }
            },
            sourceY: function (sourceId) {
                if(typeof sourceId !== "undefined"){
                    let rect = null;
                    for(let i = 0; i < this.$refs.axis.length; i++){
                        if (sourceId == this.$refs.axis[i].id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].id){
                            rect = this.$refs.allies[i].$el.getBoundingClientRect()
                        }
                    }
                    return rect.top + 75;
                } else {
                    return 0;
                }
            },
            targetX: function (targetId) {
                if(typeof targetId !== "undefined"){
                    let rect = null;
                    for(let i = 0; i < this.$refs.axis.length; i++){
                        if (targetId == this.$refs.axis[i].id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (targetId == this.$refs.allies[i].id){
                            rect = this.$refs.allies[i].$el.getBoundingClientRect()
                        }
                    }
                    return rect.left + 75;
                } else {
                    return 0;
                }
            },
            targetY: function (targetId) {
                if(typeof targetId !== "undefined") {
                    let rect = null;
                    for (let i = 0; i < this.$refs.axis.length; i++) {
                        if (targetId == this.$refs.axis[i].id) {
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for (let i = 0; i < this.$refs.allies.length; i++) {
                        if (targetId == this.$refs.allies[i].id) {
                            rect = this.$refs.allies[i].$el.getBoundingClientRect()
                        }
                    }
                    return rect.top + 75;
                } else {
                    return 0;
                }
            },
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
