<template>
    <div class="player-console" >

        <span>{{ name }}</span>

        <div id="health" class="column">
            Health: {{ health }} of {{ maxHealth }}
        </div>

        <div id="mana" class="column">
            Mana: {{ mana }} of {{ maxMana }}
        </div>

        <div>
            <span> Deck: {{ deck.length }} of {{ startingDeckLength }}</span>
        </div>

        <span id="hand">
            <span v-for="(card, index) in this.cards" ref="cards">
                <simple-card :faceVal="card"
                             :myIndex = index
                             :selectedIndex = selectedCardIndex
                             v-on:SELECT_CARD="selectCard(card, index)">
                </simple-card>
            </span>
        </span>
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
        display: flex;
        flex-direction: row;

        background-color: transparent;
        color: #8bdce5;
    }

    .column {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid transparent;
    }
</style>
