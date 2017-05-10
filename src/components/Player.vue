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
            <span v-for="(index, card) in this.model.cards">
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
                if((this.model.mana > 0)&&(this.model.deck.length  > 0)){
                    this.model.mana--;
                    this.model.cards.push(this.model.deck.pop()) ;
                }
            },
            drawShield: function () {
                if((this.model.mana > 0)&&(this.model.deck.length  > 0)){
                    this.model.mana--;
                    this.model.cards.push(this.model.deck.pop()) ;
                }
            },
            getSelectedCard: function () {
                return this.selectedCard;
            },
            selectCard: function (index) {
                this.selectedCard = index;
            },
            targeted: function () {
                console.log(this.model.name + ' targeted');
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
