<template>
    <div class="crucible">
        <h1>{{ title }}</h1>
        <div class="players-container">
            <div v-for="player in game.waypoint.players">
                <player id="player.id" :model="player" :game="game" ></player>
            </div>
        </div>
    </div>
</template>

<script>
    import Player from './Player'

    export default {
        name: 'Waypoint Crucible',
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
                                "avatarIndex": 8,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":1,
                                "name":"Admiral Hope",
                                "avatarIndex": 9,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":2,
                                "name":"Mina",
                                "avatarIndex": 0,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":1,
                                "name":"Lucy",
                                "avatarIndex": 2,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":1,
                                "name":"Phoebe",
                                "avatarIndex": 1,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":1,
                                "name":"Protobot",
                                "avatarIndex": 4,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                        ],
                        "inFlight":[],
                        "trajectory":4
                    },
                    avatars:[
                        { id: '0', name: 'Cavalier', img: '../static/dog1.png' },
                        { id: '1', name: 'Mini Schnauser', img: '../static/dog2.png' },
                        { id: '2', name: 'Boston Terrier', img: '../static/dog3.png' },
                        { id: '3', name: 'Border Collie', img: '../static/dog4.png' } ,
                        { id: '4', name: 'Protobot', img: '../static/robot1.png' },
                        { id: '5', name: 'Streambot', img: '../static/robot2.png' },
                        { id: '6', name: 'Grammarbot', img: '../static/robot3.png' },
                        { id: '7', name: 'Lambdabot', img: '../static/robot4.png' },
                        { id: '8', name: 'General Scum', img: '../static/general_scum.png' },
                        { id: '9', name: 'Admiral Hope', img: '../static/admiral_hope.png' }
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
                title: 'Waypoint Crucible'
            }
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
