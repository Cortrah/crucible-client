<template>
    <div v-if="user.playerId != null" class="player-console" >

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
            Deck: {{ player.deckSize }} of {{ game.rules.startingDeck.length }}
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
    import SimpleCard from './SimpleCard.vue';

    import { mapState } from 'vuex'

    export default {
        name: "PlayerConsole",
        components: {
          SimpleCard
        },
        computed: mapState({
            user: state => state.user,
            game: state => state.game,
            player: state => state.game.actors[state.user.playerId]
        }),
        methods: {
            selectCard: function (card, index) {
                if(this.user.actor.status.isActive && this.game.status === "PLAYING") {
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
