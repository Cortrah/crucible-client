<template>
    <div class="crucible">
        <h1>{{ msg }}</h1>
        <ul id="players">
            <li v-for="player in game.waypoint.players">
                <player id="player.id" :model="player" :game="game" ></player>
            </li>
        </ul>
    </div>
</template>

<script>
    import Player from './Player'

    export default {
        name: 'crucible',
        components: {Player},
        data () {
            return {
                game: {
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
                                "avatarId": 5,
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
                                "avatarId": 1,
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
                        { id: '1', name: 'Cavalier', img: '../static/dog1.png' },
                        { id: '2', name: 'Mini Schnauser', img: '../static/dog2.png' },
                        { id: '3', name: 'Boston Terrier', img: '../static/dog3.png' },
                        { id: '4', name: 'Border Collie', img: '../static/dog4.png' } ,
                        { id: '5', name: 'Protobot', img: '../static/robot1.png' },
                        { id: '6', name: 'Streambot', img: '../static/robot2.png' },
                        { id: '7', name: 'Grammarbot', img: '../static/robot3.png' },
                        { id: '8', name: 'Lambdabot', img: '../static/robot4.png' }
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
                            mistleName: "bb pellet",
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
