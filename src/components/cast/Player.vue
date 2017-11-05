<template>
    <div class="player" v-bind:class="{ inactive: !player.isActive }">

        <div id="health">
            Health: {{ player.health }} of {{ player.maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ player.mana }} of {{ player.maxMana }}
        </div>

        <img :src="player.avatarImg" @click="targeted">

        <span>{{ player.name }}</span>

        <span> Deck: {{ player.deckSize }} of {{ startingDeckLength }}</span>

        <span id="hand">
            <span v-for="(card, index) in player.cards">
                <span class="card">{{ card.value }}</span>
            </span>
        </span>

        <div id="shields">
            <span v-for="(shield, index) in player.shields">
                <svg id="shieldIcon"
                     x="2px" y="2px"
                     width="9px" height="9.605px"
                     viewBox="0 0 9 9.605"
                     enable-background="new 0 0 9 9.605">
                    <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="4" ry="4.302"/>
                    <ellipse fill="#F7F7F7" stroke="#000000" cx="4.5" cy="4.803" rx="1.561" ry="1.86"/>
                </svg>
            </span>
        </div>
    </div>
</template>

<script type="text/babel">

    import Vue from 'vue';
    import { mapState } from 'vuex'

    export default {
        props: [
            "gameStatus",
            'startingDeckLength',
            'player',
        ],
        computed: mapState({
            game: state => state.game,
        }),
        methods: {
            targeted: function () {
                if(this.gameStatus === "PLAYING"){
                    this.$emit("TARGETED", this.player.id);
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
