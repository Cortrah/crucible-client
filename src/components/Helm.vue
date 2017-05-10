<template>
    <div class="helm">

        <h3>Opponents:</h3>

        <div class="opponents">
            <div class="opponents-container" v-for="player in this.game.waypoint.players">
                <span v-if="notMe(player.id)">
                    <player id="player.id" ref="opponent"
                            :model="player" :game="game"
                            @click="targetPlayer(this.model.id, this.model.card)"
                            v-on:targeted="targeting"></player>
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
                this.$emit("targeting", this.model.id, targetId, this.$refs.player.getSelectedCard());
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

    .opponents {
        width: 800px;
        background-color: #f4f4f4;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .opponents-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
