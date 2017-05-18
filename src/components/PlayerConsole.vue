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
                <Simple :faceVal="card" v-on:input="clickie">
                </Simple>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue';
    import Simple from './Simple.vue';

    export default {
        name: "PlayerConsole",
        components: {
          Simple
        },
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
                list: [8, 293, 323, 23],
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
            },
            clickie: function (val, index) {
                console.log("v:" + val);
                console.log("index:" + index);
                //this.$refs.things[index].isSel = true;
                //console.log(this.$refs.things[index].isSel);
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
