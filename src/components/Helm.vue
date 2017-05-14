<template>
    <div class="helm">

        <div id="axis" class="team">
            <div class="team-container" v-for="player in this.game.waypoint.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref="opponents" vmode="external"
                            :model="player" :game="game"
                            @click="targetPlayer(this.model.id, this.model.card)"
                            v-on:targeted="targeting">
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
                    <player ref="allies" vmode="external"
                            :model="player" :game="game"
                            @click="targetPlayer(this.model.id, this.model.card)"
                            v-on:targeted="targeting">
                    </player>

                </span>
            </div>
        </div>

        <div class="console">
            <ConsolePlayer ref="consolePlayer" :model="model" :game="game"></ConsolePlayer>
            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from './Player'
    import Portrait from './Portrait'
    import ConsolePlayer from './ConsolePlayer'
    import StellarMap from './StellarMap'

    export default {
        props: {
            'model': {
                required: true
            },
            'game': {
                required: true
            }
        },
        components: {Player, Portrait, ConsolePlayer, StellarMap},
        data () {
            return {
                name: this.model.name
            }
        },
        methods: {
            drawMistle: function () {
                this.$refs.consolePlayer.drawMistle();
            },
            drawShield: function () {
                this.$refs.consolePlayer.drawShield();
            },
            targeting: function (targetId) {
                let card = this.$refs.consolePlayer.getSelectedCard();
                this.$emit("targeting", this.model.id, targetId, card);
            },
            avatarImg: function(avatarIndex){
                return this.game.avatars[avatarIndex].img;
            },
            players: function(){
                return this.game.waypoint.players;
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
