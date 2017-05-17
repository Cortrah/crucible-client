<template>
    <div class="player-console" >

        <span>{{ this.name }}</span>

        <div id="health" class="column">
            Health: {{ this.health }} of {{ this.maxHealth }}
        </div>

        <div id="mana" class="column">
            Mana: {{ this.mana }} of {{ this.maxMana }}
        </div>

        <div>
            <span> Deck: {{ this.deck.length }} of {{ this.startingDeckLength }}</span>
        </div>

        <span id="hand">
            <span v-for="(card, index) in this.cards" ref="cards">
                <button @click="selectCard(card, index)"
                        v-bind:class="{ 'sel': isSel }">
                    {{ card }}
                </button>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">

    export default {
        name: "PlayerConsole",
        props: [
            "id",
            "name",
            "team",
            "avatarImg",
            "maxMana",
            "mana",
            "maxHealth",
            "health",
            "shields",
            "deck",
            "drawEnabled",
            "cards",
            "selectedCardIndex",
            "active",
            "bleedingOut",
            'startingDeckLength'
        ],
        data () {
            return {
                isSel: false
            }
        },
//        watch: {
//            selectedCardIndex: function(sel){
//                if(sel !== -1){
//                    console.log("card selected");
//                    console.log(sel);
//                    var value = this.$refs.cards[sel];
//                    console.log(this.$refs.cards[sel].isSel);
//                    //this.$refs.cards[sel].class = "selected-card";
//                }
//            }
//        },
        methods: {
            selectCard: function (card, index) {
                console.log("select card:");
                console.log("card:" + card);
                console.log("index:" + index);
                this.$refs.cards[index].isSel = true;
                console.log(this.$refs.cards[index].isSel);
                this.$emit("SELECT_CARD", card, index);
            }
        }
    }
</script>

<style scoped>
    .player-console {
        display: flex;
        flex-direction: row;

        background-color: transparent;
        color: #8bdce5;
    }

    .unsel {
        box-shadow: none;
    }

    .sel {
        box-shadow: 0 0 1em #ee1f09;
        color: #bc22ca;
    }

    .column {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid transparent;
    }
</style>
