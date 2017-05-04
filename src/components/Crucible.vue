<template>
    <div class="crucible">
        <h1>{{ msg }}</h1>
        <player id="player1" :state="state" ></player>
        <player id="player2" :state="state" ></player>
    </div>
</template>

<script>
    import Player from './Player'

    export default {
        name: 'crucible',
        components: {Player},
        data () {
            return {
                state: {
                    rules:{
                        "maxMana": 10,
                        "maxHealth": 30,
                        "startingDeckSize": 20,
                        "startingHandSize": 0,
                        "maxCards":5,
                        "manaGrowthRate":1/3,
                        "manaReplentishRate":1/1,
                        "drawRate":1/1,
                        "fireRate":2/1,
                        "bleedoutRate":1/2,
                        "sheildDecayRate": 1/1
                    },
                    waypoint:{
                        "status": "playing",
                        "timer":0,
                        "commands":[],
                        "events":[],
                        "players":[
                            {
                                "id":0,
                                "name":"General Scum",
                                "mana":0,
                                "health":0,
                                "shields":[0],
                                "cards":[],
                                "deck":[],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":0,
                                "name":"Admiral Hope",
                                "mana":0,
                                "health":0,
                                "shields":[0],
                                "cards":[],
                                "deck":[],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                        ],
                        "inFlight":[],
                        "trajectory":4
                    },
                    avatars:[
                    ],
                    cards:{
                        "0": {
                            cost: 0,
                            mistleName: "nerfball",
                            shieldName: "paper bag"
                        },
                        "1": {
                            cost: 1,
                            mistleName: "fastball",
                            shieldName: "catchers mitt"
                        },
                        "2": {
                            cost: 2,
                            mistleName: "old rounds",
                            shieldName: "golf umbrella"
                        },
                        "3": {
                            cost: 3,
                            mistleName: "bb bolt",
                            shieldName: "elephant hide"
                        },
                        "4": {
                            cost: 4,
                            mistleName: "magnum round",
                            shieldName: "flack jacket"
                        },
                        "5": {
                            cost: 5,
                            mistleName: "angry man",
                            shieldName: "rage deflector"
                        },
                        "6": {
                            cost: 6,
                            mistleName: "mega bolt",
                            shieldName: "mega absorber"
                        },
                        "7": {
                            cost: 7,
                            mistleName: "neutrino driver",
                            shieldName: "neutrino barrier"
                        },
                        "8": {
                            cost: 8,
                            mistleName: "phase torpedo",
                            shieldName: "phase shield"
                        }
                    }
                },
                msg: 'crucible'
            }
        }
    }
</script>

<style scoped>
</style>
