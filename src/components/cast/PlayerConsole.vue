<template>
    <div class="player-console" >

        <div id="name">
            {{ player.name }}
        </div>

        <div id="health">
            Health: {{ player.health }} of {{ player.maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ player.mana }} of {{ player.maxMana }}
        </div>

        <div id="deck">
            Deck: {{ player.deckSize }} of {{ startingDeckLength }}
        </div>

        <div id="hand">
            <span v-for="(card, index) in player.cards" ref="cards">
                <simple-card class="simple-card"
                             :faceVal = card.value
                             :cardType = card.cardType
                             :myIndex = index
                             :selectedIndex = player.selectedCardIndex
                             v-on:select-card="selectCard(card, index)">
                </simple-card>
            </span>
        </div>
    </div>
</template>

<script type="text/babel">
    import SimpleCard from '../props/SimpleCard.vue';

    import { mapState } from 'vuex'

    export default {
        name: "PlayerConsole",
        components: {
          SimpleCard
        },
        props: [
            'gameStatus',
            'startingDeckLength',
            'player',
        ],
        computed: mapState({
            game: state => state.game,
        }),
        methods: {
            selectCard: function (card, index) {
                if(this.player.isActive && this.gameStatus === "PLAYING") {
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
