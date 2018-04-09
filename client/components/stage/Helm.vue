<template>
    <div class="helm">
        <div id="axis" class="team">
            <div class="team-container" v-for="actor in game.actors">
                <span v-if="actor.team === 'Bad Guys'">
                    <actor-portrait ref = "axis"
                            :actor = actor
                            @click = "targetActor(actor.id, actor.card)"
                            v-on:targeted = "targetActor">
                    </actor-portrait>
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
                    <actor-portrait ref="allies"
                            :actor = actor
                            @click = "targetActor(actor.id, actor.card)"
                            v-on:targeted="targetActor">
                    </actor-portrait>
                </span>
            </div>
        </div>

        <div class="console">
            <PlayerConsole  ref="player-console"
                            v-on:select-card="selectCard">
            </PlayerConsole>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
            <button @click="standFromTable(user.playerId)">stand from table</button>
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
    import ActorPortrait from './ActorPortrait'
    import PlayerConsole from './PlayerConsole'
    import Mistle from './Mistle'
    import StellarMap from './StellarMap'

    import { mapState } from 'vuex'

    export default {
        name: "helm",
        components: {ActorPortrait, Mistle, PlayerConsole, StellarMap},
        data () {
            return {
                gameIntervalId: 0
            }
        },
        created() {
            this.gameIntervalId = setInterval(this.tick, 1000);
        },
        computed: mapState({
            game: state => state.game,
            user: state => state.user,
            avatars: state => state.avatars
        }),
        methods: {
            // main actor actions
            drawMistle: function () {
                let myself = this.game.actors[this.user.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0){
                        this.$emit("draw-mistle", this.user.playerId);
                    }
                }
            },
            drawShield: function () {
                let myself = this.game.actors[this.user.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    if(myself.cards.length < 5 && myself.deckSize > 0) {
                        this.$emit("draw-shield", this.user.playerId);
                    }
                }
            },
            selectCard: function (card, cardIndex) {
                let myself = this.game.actors[this.user.playerId];
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("select-card", this.user.playerId, cardIndex);
                }
            },
            targetActor: function (targetId) {
                // if no store.user.actorId == null and game.status === "Preparing"
                // then we are setting a slot to a player instead of a bot
                // (if there is an actorId there should be a way to leave a spot by setting it back to null)
                if ((this.user.playerId == null) && (this.game.status === "Preparing")){
                    this.$emit("sit-at-table", targetId);
                }

                let myself = this.game.actors[this.user.playerId];
                let cardIndex = myself.selectedCardIndex;
                if(myself.isActive && this.game.status === "PLAYING"){
                    this.$emit("target-actor", this.user.playerId, targetId, cardIndex);
                }
            },
            standFromTable: function (targetId) {
                this.$emit("stand-from-table", this.user.playerId);
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
