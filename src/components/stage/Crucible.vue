<template>
    <div class="crucible">
        <div class="players-container">
            <helm ref="helm" playerId="7" :game="game" :rules="rules" :avatars="avatars"
                  v-on:DRAW_MISTLE="drawMistle"
                  v-on:DRAW_SHIELD="drawShield"
                  v-on:SELECT_CARD="selectCard"
                  v-on:TARGET_PLAYER="targetPlayer">
            </helm>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'

    import Player from '../cast/Player'
    import Helm from './Helm'

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        computed: mapState(['rules', 'game', 'avatars']),

        methods: {
            // player actions
            drawMistle: function(playerId){
                this.$store.dispatch({ type: 'drawMistle', playerId: playerId});
            },
            drawShield: function(playerId){
                this.$store.dispatch({ type: 'drawShield', playerId: playerId});
            },
            selectCard: function(playerId, cardIndex){
                this.$store.dispatch({ type: 'selectCard', playerId:playerId, cardIndex:cardIndex});
            },
            targetPlayer: function (sourceId, targetId, cardIndex) {
                this.$store.dispatch({
                    type: 'targetPlayer',
                    sourceId:sourceId,
                    targetId:targetId,
                    cardIndex:cardIndex
                });
            },
        }
    }
</script>

<style scoped>
    .players-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
