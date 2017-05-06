<template>
    <span id="opponents">
        Opponents:
        <span v-for="player in this.game.waypoint.players">
            <span v-if="notMe(player.id)"><button>{{player.name}}</button></span>
        </span>
    </span>

    <player></player>

    <button @click="drawMistle()">Draw Mistle</button>
    <button @click="drawShield()">Draw Shield</button>
    <br/>
    <br/>
</template>

<script type="text/babel">
</script>

<style scoped>
</style>
