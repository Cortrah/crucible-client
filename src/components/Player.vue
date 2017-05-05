<template>
    <div class="player">
        <h2>{{ msg }}</h2>
        <img :src="avatarImg(model.avatarId)">
        <ul id="opponents">
            <li v-for="player in players">
                <player v-if="notMe(player.id)" id="player.id"></player>
            </li>
        </ul>
        <ul id="hand">
            <li v-for="card in cards">
                <button @click="selectCard">Card</button>
            </li>
        </ul>
        <button @click="drawMistle()">Draw Mistle</button>
        <button @click="drawShield()">Draw Shield</button>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'player',
        props: {
            'model': {
                required: true
            },
            'game': {
                required: true
            }
        },
        data () {
            return {
                msg: "player" + " " + this._uid + " " + this.model.name
            }
        },
        computed: {
            notMe: function(playerId){
                if(playerId !== this._uid){
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            drawMistle: function () {
            },
            drawShield: function () {
            },
            avatarImg: function(avatarId){
                return this.game.avatars[avatarId].img;
            },
            players: function(){
                return this.game.waypoint.players;
            },
            cards: function(){
                return [];
            }
        }
    }
</script>

<style scoped>
</style>
