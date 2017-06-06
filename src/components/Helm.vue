<template>
    <div class="helm">

        <div id="axis" class="team">
            <div class="team-container" v-for="player in game.state.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref = "axis"
                            :gameStatus = game.state.status
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
                            :startingDeckLength = game.rules.startingDeck.length
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

        <div v-if="game.state.winner !== ''">
            {{game.state.winner}} Victorious
        </div>

        <div id="allies" class="team">
            <div class="team-container" v-for="player in game.state.players">
                <span v-if="player.team === 'Good Guys'">
                    <player ref="allies"
                            :gameStatus = game.state.status
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
                            :startingDeckLength = game.rules.startingDeck.length
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
                            :gameStatus = game.state.status
                            :id = playerId
                            :name = game.state.players[playerId].name
                            :team = game.state.players[playerId].team
                            avatarImg = '../../static/horizontal_control.png'
                            :maxMana = game.state.players[playerId].maxMana
                            :mana = game.state.players[playerId].mana
                            :maxHealth = game.state.players[playerId].maxHealth
                            :health = game.state.players[playerId].health
                            :shields = game.state.players[playerId].shields
                            :cards = game.state.players[playerId].cards
                            :deck = game.state.players[playerId].deck
                            :deckSize = game.state.players[playerId].deckSize
                            :selectedCardIndex = game.state.players[playerId].selectedCardIndex
                            :startingDeckLength = game.rules.startingDeck.length
                            :drawEnabled = game.state.players[playerId].drawEnabled
                            :isBleedingOut = game.state.players[playerId].isBleedingOut
                            :isActive = game.state.players[playerId].isActive
                            v-on:SELECT_CARD="selectCard">
            </PlayerConsole>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>

        <div id="mistles">
            <div class="mistles-container"
                 v-for="mistle in game.state.inFlight">
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
                return this.game.state.players[this.playerId];
            }
        },
        methods: {
            tick: function() {
                var self = this.game.state.players[this.playerId];
                if(self.isActive && this.game.state.status === "PLAYING"){
                    let my = this.game.state.players[this.playerId];
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
            sourceX: function (sourceId) {
                let sourcePlayerVm = this.getPlayerVm(sourceId);
                let sRect = sourcePlayerVm.$el.getBoundingClientRect();
                return sRect.left + sRect.width / 2;
            },
            sourceY: function (sourceId) {
                let sourcePlayerVm = this.getPlayerVm(sourceId);
                let sRect = sourcePlayerVm.$el.getBoundingClientRect();
                return sRect.top + sRect.height / 2;
            },
            targetX: function (targetId) {
                let targetPlayerVm = this.getPlayerVm(targetId);
                let tRect = targetPlayerVm.$el.getBoundingClientRect();
                return tRect.left + tRect.width / 2;
            },
            targetY: function (targetId) {
                let targetPlayerVm = this.getPlayerVm(targetId);
                let tRect = targetPlayerVm.$el.getBoundingClientRect();
                return tRect.top + tRect.height / 2;
            },
            drawMistle: function () {
                let self = this.game.state.players[this.playerId];
                if(self.isActive && this.game.state.status === "PLAYING"){
                    if(self.cards.length < 5 && self.deckSize > 0){
                        this.$emit("DRAW_MISTLE", this.playerId);
                    }
                }
            },
            drawShield: function () {
                if(self.isActive && this.game.state.status === "PLAYING"){
                    this.$emit("DRAW_SHIELD", this.playerId);
                }
            },
            selectCard: function (card, index) {
                let self = this.game.state.players[this.playerId];
                if(self.isActive && this.game.state.status === "PLAYING"){
                    this.$emit("SELECT_CARD", this.playerId, index);
                }
            },
            targetPlayer: function (targetId) {
                let self = this.game.state.players[this.playerId];
                if(self.isActive && this.game.state.status === "PLAYING"){
                    this.$emit("TARGET_PLAYER", this.playerId, targetId);
                }
            },
            players: function(){
                return this.game.state.players;
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
