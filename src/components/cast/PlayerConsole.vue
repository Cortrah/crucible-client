<template>
    <div class="player-console" >

        <div id="name">
            {{ name }} of {{ this.game.players.length }} players
        </div>

        <div id="health">
            Health: {{ health }} of {{ maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ mana }} of {{ maxMana }}
        </div>

        <div id="deck">
            Deck: {{ deckSize }} of {{ startingDeckLength }}
        </div>

        <div id="hand">
            <span v-for="(card, index) in this.cards" ref="cards">
                <simple-card class="simple-card"
                             :faceVal="card"
                             :myIndex = index
                             :selectedIndex = selectedCardIndex
                             v-on:SELECT_CARD="selectCard(card, index)">
                </simple-card>
            </span>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue';
    import SimpleCard from '../props/SimpleCard.vue';

    import { mapState } from 'vuex'

    export default {
        name: "PlayerConsole",
        components: {
          SimpleCard
        },
        props: [
            "gameStatus",
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
            "deckSize",
            "drawEnabled",
            "cards",
            "selectedCardIndex",
            "isActive",
            "isBleedingOut",
            'startingDeckLength'
        ],
//        computed: mapState(['rules', 'game', 'avatars']),
        computed: mapState({
            game: state => state.game,
        }),
//        computed: {
//            playerCount () {
//                return this.game.players.length
//            }
//        },
        methods: {
            selectCard: function (card, index) {
                //if(this.isActive && this.gameStatus === "PLAYING") {
                    this.$emit("SELECT_CARD", card, index);
                //}
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
