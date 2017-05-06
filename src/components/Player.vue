<template>
    <div class="player">
        <span id="opponents">
            Opponents:
            <span v-for="player in this.game.waypoint.players">
                <span v-if="notMe(player.id)"><button>{{player.name}}</button></span>
            </span>
        </span>
        <div id="health">
            Health: {{ this.model.health }}
        </div>
        <div id="mana">
            Mana: {{ this.model.mana }} of {{ this.game.rules.maxMana }}
        </div>

        <img :src="avatarImg(model.avatarIndex)">
        <br/>

        <span>{{ msg }}</span>
        <br/>

        <span id="hand">
            <span> Hand: </span>
            <span v-for="card in this.model.cards">
                <button @click="selectCard">{{ card }}</button>
            </span>
            <span> Deck: {{ this.model.deck.length }} of {{ this.game.rules.startingDeckSize }}</span>
        </span>
        <br/>

        <button @click="drawMistle()">Draw Mistle</button>
        <button @click="drawShield()">Draw Shield</button>
        <br/>
        <br/>
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
                msg: this.model.name
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
    player {
        width: 250px;
    }

    img {
        width: 100px;
        height: 100px;
    }
</style>
