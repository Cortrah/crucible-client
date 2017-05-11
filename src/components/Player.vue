<template>
    <div class="player" >

        <div id="health">
            Health: {{ this.model.health }}
        </div>

        <div id="mana">
            Mana: {{ this.model.mana }} of {{ this.game.rules.maxMana }}
        </div>

        <img :src="avatarImg(model.avatarIndex)" @click="targeted">

        <span>{{ name }}</span>

        <span> Deck: {{ this.model.deck.length }} of {{ this.game.rules.startingDeck.length }}</span>

        <span id="hand">
            <span> Hand: </span>
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
            }
        },
        components: {Player},
        data () {
            return {
                name: this.model.name,
                selectedCard : null
            }
        },
        methods: {
            drawMistle: function () {
                console.log(this.model.deck.toString());
                if((this.model.mana > 0)&&(this.model.deck.length  > 0)){
                    var drawn = this.model.deck[0];
                    console.log(drawn);
                    this.model.cards.push(drawn);
                    this.model.deck.splice(0,1);
                    console.log(this.model.deck.toString());
                }
            },
            drawShield: function () {
            },
            getSelectedCard: function () {
                console.log(this.model.cards.toString());
                var card = this.model.cards[this.selectedCard];
                console.log("getselectedCard "+ card);
                this.model.cards.splice(this.selectedCard, 1);
                this.selectedCard = null;
                console.log(this.model.cards.toString());
                return card;
            },
            selectCard: function (index) {
                console.log("position "+ index);
                this.selectedCard = index;
            },
            targeted: function () {
                this.$emit("targeted", this.model.id);
            },
            avatarImg: function(avatarIndex){
                return this.game.avatars[avatarIndex].img;
            },
            players: function(){
                return this.game.waypoint.players;
            },
            cards: function(){
                return [];
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
