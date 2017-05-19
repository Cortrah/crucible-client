<template>
    <div class="player" >

        <div id="health">
            Health: {{ health }} of {{ maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ mana }} of {{ maxMana }}
        </div>

        <img :src="avatarImg" @click="targeted">

        <span>{{ name }}</span>

        <span> Deck: {{ deck.length }} of {{ startingDeckLength }}</span>

        <span id="hand">
            <span v-for="(card, index) in this.cards">
                <button @click="selectCard(index)">
                    {{ card }}
                </button>
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
            "selectedCardIndex",
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
        margin:0px;
        padding:1px;
    }

    img {
        width: 60px;
        height: 60px;
    }
</style>
