<template>
    <div class="crucible">
        <div class="actors-container">
            <helm v-on:draw-mistle="drawMistle"
                  v-on:draw-shield="drawShield"
                  v-on:select-card="selectCard"
                  v-on:target-actor="targetActor">
            </helm>
        </div>
    </div>
</template>

<script>
    import Helm from './Helm'

    export default {
        name: 'crucible',
        components: {Helm},
        methods: {
            // actor actions
            drawMistle: function(actorId){
                this.$store.dispatch({ type: 'drawMistle', actorId: actorId});
            },
            drawShield: function(actorId){
                this.$store.dispatch({ type: 'drawShield', actorId: actorId});
            },
            selectCard: function(actorId, cardIndex){
                this.$store.dispatch({ type: 'selectCard', actorId:actorId, cardIndex:cardIndex});
            },
            targetActor: function (sourceId, targetId, cardIndex) {
                this.$store.dispatch({
                    type: 'targetActor',
                    sourceId:sourceId,
                    targetId:targetId,
                    cardIndex:cardIndex
                });
            },
        }
    }
</script>

<style scoped>
    .actors-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
