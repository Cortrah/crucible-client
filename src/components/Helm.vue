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

        <div class="console-container">
            <div class="console">
                <player id="model.id" ref="player" :model="model" :game="game" vmode="internal"></player>

                <button @click="drawMistle()">Draw Mistle</button>
                <button @click="drawShield()">Draw Shield</button>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from './Player'
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
        components: {Player, StellarMap},
        data () {
            return {
                name: this.model.name
            }
        },
        methods: {
            drawMistle: function () {
                this.$refs.player.drawMistle();
            },
            drawShield: function () {
                this.$refs.player.drawShield();
            },
            targeting: function (targetId) {
                var card = this.$refs.player.getSelectedCard();
                this.$emit("targeting", this.model.id, targetId, card);
            },
            avatarImg: function(avatarIndex){
                return this.game.avatars[avatarIndex].img;
            },
            players: function(){
                return this.game.waypoint.players;
            },
            cards: function(){
                return [1,2,3];
            },
            notMe: function(playerId){
                if(playerId !== this.model.id){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    .helm {
        width: 700px;
        height: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .team {
        width: 800px;
        background-color: #f4f4f4;
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
        height: 100px;
    }

    .console-container {
        display: flex;
        flex-direction: column;
        width:800px;
        align-items: center;
    }

</style>
