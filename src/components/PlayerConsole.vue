<template>
    <div class="player-console" >

        <div id="name">
            {{ name }}
        </div>

        <div id="health">
            Health: {{ health }} of {{ maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ mana }} of {{ maxMana }}
        </div>

        <div id="deck">
            Deck: {{ deck.length }} of {{ startingDeckLength }}
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
    import SimpleCard from './SimpleCard.vue';

    export default {
        name: "PlayerConsole",
        components: {
          SimpleCard
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
        methods: {
            selectCard: function (card, index) {
                this.$emit("SELECT_CARD", card, index);
            }
        }
    }
</script>

<style scoped>
    .player-console {
        width: 700px;
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
