<template>
    <div class="helm">

        <h3>General Scums Silicon Scourge:</h3>
        <div id="axis" class="team">
            <div class="team-container" v-for="player in this.game.waypoint.players">
                <span v-if="player.team === 'Bad Guys'">
                    <player ref="opponents"
                            :model="player" :game="game"
                            @click="targetPlayer(this.model.id, this.model.card)"
                            v-on:targeted="targeting">
                    </player>
                </span>
            </div>
        </div>


        <h3>Admiral Hopes Stellar Pack:</h3>
        <div id="allies" class="team">
            <div class="team-container" v-for="player in this.game.waypoint.players">
                <span v-if="player.team === 'Good Guys'">
                    <player ref="allies" :model="player" :game="game"
                        @click="targetPlayer(this.model.id, this.model.card)"
                        v-on:targeted="targeting">
                    </player>

                </span>
            </div>
        </div>

        <div>
            <player id="model.id" ref="player" :model="model" :game="game"></player>

            <button @click="drawMistle()">Draw Mistle</button>
            <button @click="drawShield()">Draw Shield</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import Player from './Player'

    export default {
        props: {
            'model': {
                required: true
            },
            'game': {
                required: true
            }
        },
        components: {Player},
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
</style>
