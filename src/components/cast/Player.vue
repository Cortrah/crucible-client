<template>
    <div class="player" v-bind:class="{ inactive: !isActive }" >

        <div id="health">
            Health: {{ health }} of {{ maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ mana }} of {{ maxMana }}
        </div>

        <img :src="avatarImg" @click="targeted">

        <span>{{ name }}</span>

        <span> Deck: {{ deckSize }} of {{ startingDeckLength }}</span>

        <span id="hand">
            <span v-for="(card, index) in this.cards">
                <span class="card">{{ card }}</span>
            </span>
        </span>
    </div>
</template>

<script type="text/babel">

    import Vue from 'vue';
    import { mapState } from 'vuex'

    export default {
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
            "deckSize",
            "drawEnabled",
            "cards",
            "selectedCardIndex",
            "isActive",
            "isBleedingOut",
            'startingDeckLength'
        ],
        computed: mapState({
            game: state => state.game,
        }),
        methods: {
            targeted: function () {

                //console.log("player targeted");
                //console.log(this.id);

                if(this.gameStatus === "PLAYING"){
                    this.$emit("TARGETED", this.id);
                }
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

    .card {
        margin:0px;
        padding:2px;
    }

    .inactive {
        opacity: .4;
    }

    img {
        width: 60px;
        height: 60px;
    }
</style>
