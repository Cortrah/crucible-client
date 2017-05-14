<template>
    <div class="player" >

        <div id="health">
            Health: {{ this.model.health }}
        </div>

        <div id="mana">
            Mana: {{ this.model.mana }} of {{ this.game.rules.maxMana }}
        </div>

        <img :src="avatarImg(model.avatarIndex)" @click="targeted">

        <span>{{ this.model.name }}</span>

        <span> Deck: {{ this.model.deck.length }} of {{ this.game.rules.startingDeck.length }}</span>

        <span id="hand">
            <span v-for="(card, index) in this.model.cards">
                <button @click="selectCard(index)">{{ card }}</button>
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
            },
            'vmode': {
                type: String,
                required: true
            }
        },
        components: {Player},
        data () {
            return {
                selectedCard : null
            }
        },
        methods: {
            drawMistle: function () {
                if((this.model.mana > 0)&&(this.model.deck.length  > 0)){
                    var drawn = this.model.deck[0];
                    this.model.cards.push(drawn);
                    this.model.deck.splice(0,1);
                }
            },
            drawShield: function () {
            },
            getSelectedCard: function () {
                let card = this.model.cards[this.selectedCard];
                this.model.cards.splice(this.selectedCard, 1);
                this.selectedCard = null;
                return card;
            },
            selectCard: function (index) {
                this.selectedCard = index;
            },
            targeted: function () {
                this.$emit("targeted", this.model.id);
            },
            avatarImg: function(avatarIndex){
                if(this.vmode === 'external'){
                    return this.game.avatars[avatarIndex].img;
                } else {
                    return '../static/control.jpg';
                }
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
    .player {
        width: 130px;
        height: 160px;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        color: aliceblue;
    }

    button {
        margin:0;
        padding:0;
    }

    img {
        width: 60px;
        height: 60px;
    }
</style>
