<template>
    <div class="player-console" >

        <div id="name">
            {{ actor.name }}
        </div>

        <div id="health">
            Health: {{ actor.health }} of {{ actor.maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ actor.mana }} of {{ actor.maxMana }}
        </div>

        <div id="deck">
            Deck: {{ actor.deckSize }} of {{ startingDeckLength }}
        </div>

        <div id="hand">
            <span v-for="(card, index) in actor.cards" ref="cards">
                <simple-card class="simple-card"
                             :faceVal = card.value
                             :cardType = card.cardType
                             :myIndex = index
                             :selectedIndex = actor.selectedCardIndex
                             v-on:select-card="selectCard(card, index)">
                </simple-card>
            </span>
        </div>
    </div>
</template>

<script type="text/babel">
    import SimpleCard from './SimpleCard.vue';

    import { mapState } from 'vuex'

    export default {
        name: "PlayerConsole",
        components: {
          SimpleCard
        },
        props: [
            'gameStatus',
            'startingDeckLength',
            'actor',
        ],
        computed: mapState({
            game: state => state.game,
        }),
        methods: {
            selectCard: function (card, index) {
                if(this.actor.isActive && this.gameStatus === "PLAYING") {
                    this.$emit("select-card", card, index);
                }
            }
        }
    }
</script>

<style scoped>
    .player-console {
        width: 700px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        color: #8bdce5;
    }

    .simple-card {
        margin:.3em;
    }
</style>
