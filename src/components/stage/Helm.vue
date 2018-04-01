<template>
    <div class="helm">
        <div id="axis" class="team">
            <div class="team-container" v-for="player in game.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref = "axis"
                            :gameStatus = game.status
                            :player = player
                            :startingDeckLength = rules.startingDeck.length
                            @click = "targetPlayer(player.id, player.card)"
                            v-on:targeted = "targetPlayer">
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
                            :player = player
                            :startingDeckLength = rules.startingDeck.length
                            @click = "targetPlayer(player.id, player.card)"
                            v-on:targeted="targetPlayer">
                    </player>
                </span>
            </div>
        </div>

        <div class="console">
            <PlayerConsole  ref="player-console"
                            :gameStatus = game.status
                            :player = game.players[playerId]
                            avatarImg = '../../static/horizontal_control.png'
                            :startingDeckLength = rules.startingDeck.length
                            v-on:select-card="selectCard">
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
    import Player from './PlayerStatus'
    import PlayerConsole from './PlayerConsole'
    import Mistle from './Mistle'
    import StellarMap from './StellarMap'

    import { mapState } from 'vuex'

    export default {
        name: "helm",
        props: {
            "playerId": 0,
        },
        components: {Player, Mistle, PlayerConsole, StellarMap},
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
                        this.$emit("draw-mistle", this.playerId);
                    }
                }
            },
            drawShield: function () {
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0) {
                        this.$emit("draw-shield", this.playerId);
                    }
                }
            },
            selectCard: function (card, cardIndex) {
                let myself = this.game.players[this.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("select-card", this.playerId, cardIndex);
                }
            },
            targetPlayer: function (targetId) {
                let myself = this.game.players[this.playerId];
                let cardIndex = myself.selectedCardIndex;
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("target-player", this.playerId, targetId, cardIndex);
                }
            },
            // helper functions for rendering the view
            sourceX: function (sourceId) {
                if(typeof sourceId !== "undefined"){
                    let rect = null;
                    for(let i = 0; i < this.$refs.axis.length; i++){
                        if (sourceId == this.$refs.axis[i].player.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].player.id){
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
                        if (sourceId == this.$refs.axis[i].player.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].player.id){
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
                        if (targetId == this.$refs.axis[i].player.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (targetId == this.$refs.allies[i].player.id){
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
                        if (targetId == this.$refs.axis[i].player.id) {
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for (let i = 0; i < this.$refs.allies.length; i++) {
                        if (targetId == this.$refs.allies[i].player.id) {
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
        height: 500px;
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
