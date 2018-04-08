<template>
    <div class="helm">
        <div id="axis" class="team">
            <div class="team-container" v-for="actor in game.actors">
                <span v-if="actor.team === 'Bad Guys'">
                    <actor ref = "axis"
                            :gameStatus = game.status
                            :actor = actor
                            :startingDeckLength = rules.startingDeck.length
                            @click = "targetActor(actor.id, actor.card)"
                            v-on:targeted = "targetActor">
                    </actor>
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
            <div class="team-container" v-for="actor in game.actors">
                <span v-if="actor.team === 'Good Guys'">
                    <actor ref="allies"
                            :gameStatus = game.status
                            :actor = actor
                            :startingDeckLength = rules.startingDeck.length
                            @click = "targetActor(actor.id, actor.card)"
                            v-on:targeted="targetActor">
                    </actor>
                </span>
            </div>
        </div>

        <div class="console">
            <PlayerConsole  ref="player-console"
                            :gameStatus = game.status
                            :actor = game.slots[game.playerId]
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
    import Actor from './ActorStatus'
    import PlayerConsole from './PlayerConsole'
    import Mistle from './Mistle'
    import StellarMap from './StellarMap'

    import { mapState } from 'vuex'

    export default {
        name: "helm",
        props: {
            "actorId": 0,
        },
        components: {Actor, Mistle, PlayerConsole, StellarMap},
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
            rules: state => state.game.rules,
            avatars: state => state.avatars
        }),
        methods: {
            // main actor actions
            drawMistle: function () {
                let myself = this.game.actors[this.actorId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0){
                        this.$emit("draw-mistle", this.actorId);
                    }
                }
            },
            drawShield: function () {
                let myself = this.game.actors[this.actorId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0) {
                        this.$emit("draw-shield", this.actorId);
                    }
                }
            },
            selectCard: function (card, cardIndex) {
                let myself = this.game.actors[this.actorId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("select-card", this.actorId, cardIndex);
                }
            },
            targetActor: function (targetId) {
                let myself = this.game.actors[this.actorId];
                let cardIndex = myself.selectedCardIndex;
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("target-actor", this.actorId, targetId, cardIndex);
                }
            },
            // helper functions for rendering the view
            sourceX: function (sourceId) {
                if(typeof sourceId !== "undefined"){
                    let rect = null;
                    for(let i = 0; i < this.$refs.axis.length; i++){
                        if (sourceId == this.$refs.axis[i].actor.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].actor.id){
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
                        if (sourceId == this.$refs.axis[i].actor.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (sourceId == this.$refs.allies[i].actor.id){
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
                        if (targetId == this.$refs.axis[i].actor.id){
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for(let i = 0; i < this.$refs.allies.length; i++){
                        if (targetId == this.$refs.allies[i].actor.id){
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
                        if (targetId == this.$refs.axis[i].actor.id) {
                            rect = this.$refs.axis[i].$el.getBoundingClientRect()
                        }
                    }
                    for (let i = 0; i < this.$refs.allies.length; i++) {
                        if (targetId == this.$refs.allies[i].actor.id) {
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
