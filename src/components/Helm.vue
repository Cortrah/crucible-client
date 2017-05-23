<template>
    <div class="helm">

        <div id="axis" class="team">
            <div class="team-container" v-for="player in game.waypoint.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref = "axis"
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
                            :startingDeckLength = player.startingDeckLength
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

        <div v-if="game.waypoint.status === 'OVER'">
            {{game.waypoint.winner}} Win
        </div>

        <div id="allies" class="team">
            <div class="team-container" v-for="player in game.waypoint.players">
                <span v-if="player.team === 'Good Guys'">
                    <player ref="allies"
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
                            :startingDeckLength = player.startingDeckLength
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
                            :id = playerId
                            :name = game.waypoint.players[playerId].name
                            :team = game.waypoint.players[playerId].team
                            avatarImg = "../static/horizontal_control.png"
                            :maxMana = game.waypoint.players[playerId].maxMana
                            :mana = game.waypoint.players[playerId].mana
                            :maxHealth = game.waypoint.players[playerId].maxHealth
                            :health = game.waypoint.players[playerId].health
                            :shields = game.waypoint.players[playerId].shields
                            :cards = game.waypoint.players[playerId].cards
                            :deck = game.waypoint.players[playerId].deck
                            :selectedCardIndex = game.waypoint.players[playerId].selectedCardIndex
                            :startingDeckLength = game.waypoint.players[playerId].startingDeckLength
                            :drawEnabled = game.waypoint.players[playerId].drawEnabled
                            :isBleedingOut = game.waypoint.players[playerId].isBleedingOut
                            :isActive = game.waypoint.players[playerId].isActive
                            v-on:SELECT_CARD="selectCard">
            </PlayerConsole>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>

        <div id="mistles">
            <div class="mistles-container"
                 v-for="mistle in game.waypoint.inFlight">
                <MistleInFlight
                    :id = mistle.id
                    :sourceX = mistle.sourceX
                    :sourceY = mistle.sourceY
                    :targetX = mistle.targetX
                    :targetY = mistle.targetY
                    :card = mistle.card
                    :flightTime = mistle.flightTime>
                </MistleInFlight>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from './Player'
    import MistleInFlight from './MistleInFlight'
    import Portrait from './Portrait'
    import PlayerConsole from './PlayerConsole'
    import StellarMap from './StellarMap'

    export default {
        name: "Helm",
        props: {
            "playerId": 0,
            'game': {
                required: true
            }
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
        computed: {
            self: function () {
                return this.game.waypoint.players[this.playerId];
            }
        },
        methods: {
            tick: function() {
                if(self.isActive && this.game.waypoint.status === "PLAYING"){
                    let my = this.game.waypoint.players[this.playerId];
                    // if I have < 5 cards and more than 1 mana draw a card
                    if(my.cards.length < 5 && my.mana > 0){
                        this.drawMistle();
                    }
                    let mana = my.mana - 1;
                    // if I have cards and enough mana to fire a mistle
                    for(var i = 0; i < my.cards.length; i++){
                        var card = my.cards[i];
                        if(card < mana){
                            this.selectCard(card, i);
                        }
                    }
                    // choose an enemy that's still active
                    if(my.team === "Good Guys"){
                        for(var i = 0; i < this.$refs.axis.length; i++){
                            var foe = this.$refs.axis[i];
                            if(foe.isActive === true){
                                // and fire at it
                                this.targetPlayer(foe.id);
                                // but only fire one maximum per tick
                                break;
                            }
                        }
                    } else {
                        // if we are an enemy the enemy is my ally
                        for(var i = 0; i < this.$refs.allies.length; i++){
                            var foe = this.$refs.allies[i];
                            if(foe.isActive === true){
                                // and fire at it
                                this.targetPlayer(foe.id);
                                // but only fire one maximum per tick
                                break;
                            }
                        }
                    }
                } else {
                    clearInterval(this.gameIntervalId);
                }
            },
            drawMistle: function () {
                if(self.isActive && this.game.waypoint.status === "PLAYING"){
                    if(this.game.waypoint.players[this.playerId].cards.length < 5){
                        this.$emit("DRAW_MISTLE", this.playerId);
                    }
                }
            },
            drawShield: function () {
                if(self.isActive && this.game.waypoint.status === "PLAYING"){
                    this.$emit("DRAW_SHIELD", this.playerId);
                }
            },
            selectCard: function (card, index) {
                if(self.isActive && this.game.waypoint.status === "PLAYING"){
                    this.$emit("SELECT_CARD", this.playerId, index);
                }
            },
            targetPlayer: function (targetId) {
                if(self.isActive && this.game.waypoint.status === "PLAYING"){
                    this.$emit("TARGET_PLAYER", this.playerId, targetId);
                }
            },
            players: function(){
                return this.game.waypoint.players;
            },
            getPlayerVm: function(playerId){
                // for each in allies
                for(let i = 0; i < this.$refs.axis.length; i++){
                    if (playerId === this.$refs.axis[i].id){
                        return this.$refs.axis[i];
                    }
                }
                for(let i = 0; i < this.$refs.allies.length; i++){
                    if (playerId === this.$refs.allies[i].id){
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
