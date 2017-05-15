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
            <span v-for="(card, index) in this.cards">
                <button @click="selectCard(card, index)">{{ card }}</button>
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
            "selectedCard",
            "active",
            "bleedingOut",
            'startingDeckLength'
        ],
        methods: {
            selectCard: function (card, index) {
                console.log("select card:");
                console.log("card:" + card);
                console.log("index:" + index);
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
