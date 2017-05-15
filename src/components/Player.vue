<template>
    <div class="player" >

        <div id="health">
            Health: {{ this.health }}
        </div>

        <div id="mana">
            Mana: {{ this.mana }} of {{ this.maxMana }}
        </div>

        <img :src="this.imgUrl" @click="targeted">

        <span>{{ this.name }}</span>

        <span> Deck: {{ this.deck.length }} of {{ this.startingDeckLength }}</span>

        <span id="hand">
            <span v-for="(card, index) in this.cards">
                <button @click="selectCard(index)">{{ card }}</button>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">

    export default {
        props: [
            "id",
            "name",
            "team",
            "avatarImg",
            "mana",
            "maxMana",
            "health",
            "shields",
            "cards",
            "deck",
            "drawEnabled",
            "bleedingOut",
            "active",
            'startingDeckLength'
        ],
        components: {},
        data () {
            return {
                selectedCard : null,
                imgUrl: "https://avatars0.githubusercontent.com/u/3962520?v=3&s=88"
            }
        },
        methods: {
            drawMistle: function () {
                if((this.mana > 0)&&(this.deck.length  > 0)){
                    var drawn = this.deck[0];
                    this.cards.push(drawn);
                    this.deck.splice(0,1);
                }
            },
            drawShield: function () {
            },
            getSelectedCard: function () {
                let card = this.cards[this.selectedCard];
                this.cards.splice(this.selectedCard, 1);
                this.selectedCard = null;
                return card;
            },
            selectCard: function (index) {
                this.selectedCard = index;
            },
            targeted: function () {
                this.$emit("targeted", this.id);
            },
            avatarImg: function(avatarIndex){
                return "../static/dog1.png";
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
