<template>
    <div class="crucible">
        <h1>{{ title }}</h1>
        <div class="players-container">
            <helm id="0" :model="game.waypoint.players[0]" :game="game" ></helm>
            <helm id="1" :model="game.waypoint.players[1]" :game="game" ></helm>
        </div>
        <div class="cards-container">
            <card label="Nerfball" cost="mana-0" type="mistle" face="./static/dog1.png" effect="damage+0"></card>
            <card label="Paper Bag" cost="mana-0" type="shield" face="./static/dog1.png" effect="shield+0"></card>
        </div>
    </div>
</template>

<script>
    import Player from './Player'
    import Card from './Card'
    import Helm from './Helm'

    export default {
        name: 'Waypoint Crucible',
        components: {Player, Helm, Card},
        data () {
            return {
                game: {
                    rules:{
                        "maxMana": 10,
                        "maxHealth": 30,
                        "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
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
                                "maxMana":0,
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
                                "maxMana":0,
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
                                "maxMana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":3,
                                "name":"Lucy",
                                "avatarIndex": 2,
                                "mana":0,
                                "maxMana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":4,
                                "name":"Phoebe",
                                "avatarIndex": 1,
                                "mana":0,
                                "maxMana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[1,2,3],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":5,
                                "name":"Protobot",
                                "avatarIndex": 4,
                                "mana":0,
                                "maxMana":0,
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
                    mistleCards:{
                        "0": {
                            cost: 0,
                            name: "nerfball",
                            type: 'mistle'
                        },
                        "1": {
                            cost: 1,
                            name: "fastball",
                            type: 'mistle'
                        },
                        "2": {
                            cost: 2,
                            name: "old rounds",
                            type: 'mistle'
                        },
                        "3": {
                            cost: 3,
                            name: "bb pellet",
                            type: 'mistle'
                        },
                        "4": {
                            cost: 4,
                            name: "magnum round",
                            type: 'mistle'
                        },
                        "5": {
                            cost: 5,
                            name: "angry man",
                            type: 'mistle'
                        },
                        "6": {
                            cost: 6,
                            name: "mega bolt",
                            type: 'mistle'
                        },
                        "7": {
                            cost: 7,
                            name: "neutrino driver",
                            type: 'mistle'
                        },
                        "8": {
                            cost: 8,
                            name: "phase torpedo",
                            type: 'mistle'
                        }
                    },
                    shieldCards:{
                        "0": {
                            cost: 0,
                            name: "paper bag",
                            type: 'shield'
                        },
                        "1": {
                            cost: 1,
                            name: "catchers mitt",
                            type: 'shield'
                        },
                        "2": {
                            cost: 2,
                            name: "golf umbrella",
                            type: 'shield'
                        },
                        "3": {
                            cost: 3,
                            name: "elephant hide",
                            type: 'shield'
                        },
                        "4": {
                            cost: 4,
                            name: "flack jacket",
                            type: 'shield'
                        },
                        "5": {
                            cost: 5,
                            name: "rage deflector",
                            type: 'shield'
                        },
                        "6": {
                            cost: 6,
                            name: "mega absorber",
                            type: 'shield'
                        },
                        "7": {
                            cost: 7,
                            name: "neutrino barrier",
                            type: 'shield'
                        },
                        "8": {
                            cost: 8,
                            name: "phase shield",
                            type: 'shield'
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
    .cards-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
