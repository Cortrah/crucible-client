<template>
    <div class="helm">

        <div id="axis" class="team">
            <div class="team-container" v-for="player in this.game.waypoint.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref = "enemies"
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
                            :bleedingOut = player.bleedingOut
                            :active = player.active
                            @click = "targetPlayer(this.model.id, this.model.card)"
                            v-on:TARGETED = "targetPlayer">
                    </player>
                </span>
            </div>
        </div>

        <div id="no-mans-land">
            <stellar-map></stellar-map>
        </div>

        <div id="allies" class="team">
            <div class="team-container" v-for="player in this.game.waypoint.players">
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
                            :bleedingOut = player.bleedingOut
                            :active = player.active
                            @click = "targetPlayer(this.id, this.card)"
                            v-on:TARGETED="targetPlayer">
                    </player>
                </span>
            </div>
        </div>

        <div class="console">
            <PlayerConsole  ref="player-console"
                            :id = playerId
                            :name = this.game.waypoint.players[playerId].name
                            :team = this.game.waypoint.players[playerId].team
                            avatarImg = "../static/horizontal_control.png"
                            :maxMana = this.game.waypoint.players[playerId].maxMana
                            :mana = this.game.waypoint.players[playerId].mana
                            :maxHealth = this.game.waypoint.players[playerId].maxHealth
                            :health = this.game.waypoint.players[playerId].health
                            :shields = this.game.waypoint.players[playerId].shields
                            :cards = this.game.waypoint.players[playerId].cards
                            :deck = this.game.waypoint.players[playerId].deck
                            :selectedCardIndex = this.game.waypoint.players[playerId].selectedCardIndex
                            :startingDeckLength = this.game.waypoint.players[playerId].startingDeckLength
                            :drawEnabled = this.game.waypoint.players[playerId].drawEnabled
                            :bleedingOut = this.game.waypoint.players[playerId].bleedingOut
                            :active = this.game.waypoint.players[playerId].active
                            v-on:SELECT_CARD="selectCard">
            </PlayerConsole>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>

        <div id="mistles">
            <div class="mistles-container"
                 v-for="mistle in this.game.waypoint.inFlight">
                <MistleInFlight
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
                name: this.name
            }
        },
        methods: {
            drawMistle: function () {
                if(this.game.waypoint.players[this.playerId].cards.length < 5){
                    this.$emit("DRAW_MISTLE", this.playerId);
                }
            },
            drawShield: function () {
                this.$emit("DRAW_SHIELD", this.playerId);
            },
            selectCard: function (card, index) {
                this.$emit("SELECT_CARD", this.playerId, index);
            },
            targetPlayer: function (targetId) {
                this.$emit("TARGET_PLAYER", this.playerId, targetId);
            },
            players: function(){
                return this.game.waypoint.players;
            },
            isEnemy: function(playerId){
                return true;
            },
            isAllie: function(playerId){
                return true;
            },
            getPlayerVm: function(playerId){
                // for each in allies
                for(let i = 0; i < this.$refs.enemies.length; i++){
                    if (playerId === this.$refs.enemies[i].id){
                        return this.$refs.enemies[i];
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
