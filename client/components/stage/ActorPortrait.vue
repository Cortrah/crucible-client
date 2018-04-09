<template>
    <div class="actor-portrait" v-bind:class="{ inactive: !actor.isActive }">

        <div id="health">
            Health: {{ actor.health }} of {{ actor.maxHealth }}
        </div>

        <div id="mana">
            Mana: {{ actor.mana }} of {{ actor.maxMana }}
        </div>

        <img :src="actor.avatarImg" @click="targeted">

        <span>{{ actor.name }}</span>

        <span> Deck: {{ actor.deckSize }} of {{ game.rules.startingDeck.length }}</span>

        <span id="hand">
            <span v-for="(card, index) in actor.cards">
                <span class="card">{{ card.value }}</span>
            </span>
        </span>

        <div id="shields">
            <span v-for="(shield, index) in actor.shields">
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

    import { mapState } from 'vuex'

    export default {
        name: "actor-portrait",
        props: [
            'actor',
        ],
        computed: mapState({
            game: state => state.game,
        }),
        methods: {
            targeted: function () {
                if(this.game.status === "PLAYING"){
                    this.$emit("targeted", this.actor.id);
                }
            }
        }
    }
</script>

<style scoped>
    .actor-portrait {
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
