<template>
    <div class="player" >

        <div id="health">
            Health: {{ this.health }} of {{ this.maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ this.mana }} of {{ this.maxMana }}
        </div>

        <img :src="this.avatarImg" @click="targeted">

        <span>{{ this.name }}</span>

        <span> Deck: {{ this.deck.length }} of {{ this.startingDeckLength }}</span>

        <span id="hand">
            <span v-for="(card, index) in this.cards">
                <button @click="selectCard(index)">{{ card }}</button>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">

    export default {
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
            targeted: function () {
                this.$emit("TARGETED", this.id);
            }
        }
    }
</script>

<style scoped>
    .player {
        width: 130px;
        height: 160px;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        color: aliceblue;
    }

    button {
        margin:0;
        padding:0;
    }

    img {
        width: 60px;
        height: 60px;
    }
</style>
