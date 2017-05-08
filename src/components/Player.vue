<template>
    <div class="player">

        <!--
        <progress-bar type="line" ref="line" color="#007AFF" strokeWidth="0.5"></progress-bar>
        -->
        <div id="health">
            Health: {{ this.model.health }}
        </div>

        <div id="mana">
            Mana: {{ this.model.mana }} of {{ this.game.rules.maxMana }}
        </div>

        <img :src="avatarImg(model.avatarIndex)">

        <span>{{ name }}</span>

        <span> Deck: {{ this.model.deck.length }} of {{ this.game.rules.startingDeck.length }}</span>

        <span id="hand">
            <span> Hand: </span>
            <span v-for="card in this.model.cards">
                <button @click="selectCard">{{ card }}</button>
            </span>
        </span>
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
            },
            drawShield: function () {
            },
            selectCard: function () {
            },
            targetCard: function () {
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
    .player {
        width: 130px;
        height: 210px;
        display: flex;
        flex-direction: column;
    }

    img {
        width: 100px;
        height: 100px;
    }
</style>
