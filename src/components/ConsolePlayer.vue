<template>
    <div class="console-player" >

        <span>{{ this.model.name }}</span>

        <div id="health" class="column">
            Health: {{ this.model.health }}
        </div>

        <div id="mana" class="column">
            Mana: {{ this.model.mana }} of {{ this.game.rules.maxMana }}
        </div>

        <div class="column">
            Deck: {{ this.model.deck.length }} of {{ this.game.rules.startingDeck.length }}
        </div>

        <span id="hand">
            <span> Hand: </span>
            <span v-for="(card, index) in this.model.cards">
                <button @click="selectCard(index)">{{ card }}</button>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">

    export default {
        props: {
            'model': {
                required: true
            },
            'game': {
                required: true
            }
        },
        components: {},
        data () {
            return {
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
            cards: function(){
                return [];
            }
        }
    }
</script>

<style scoped>
    .console-player {
        display: flex;
        flex-direction: row;

        background-color: transparent;
        color: #a2ffa8;
    }


    .column {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid transparent;
    }

    img {
        width: 60px;
        height: 60px;
    }

</style>
