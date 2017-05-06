<template>
    <div class="player">
        <h2>{{ msg }}</h2>
        <img :src="avatarImg(model.avatarIndex)">
        <h3>Opponents</h3>
        <ul id="opponents">
            <div v-for="player in this.game.waypoint.players">
                <span v-if="notMe(player.id)"><button>{{player.id}}</button></span>
            </div>
        </ul>
        <h3>Hand</h3>
        <ul id="hand">
            <li v-for="card in this.model.cards">
                <button @click="selectCard">Card</button>
            </li>
        </ul>
        <h3>Deck {{ this.model.deck.length }}</h3>
        <button @click="drawMistle()">Draw Mistle</button>
        <button @click="drawShield()">Draw Shield</button>
    </div>
</template>

<script type="text/babel">
    import Player from './Player'

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
        components: {Player},
        data () {
            return {
                msg: "player" + " " + this.model.id + " " + this.model.name
            }
        },
        methods: {
            drawMistle: function () {
            },
            drawShield: function () {
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
</style>
