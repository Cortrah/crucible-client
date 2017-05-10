<template>
    <div class="crucible">
        <h1>{{ title }}</h1>
        <span>{{ timeRunning }}</span>
        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>

        <div class="players-container">
            <helm id="5" :model="game.waypoint.players[5]" :game="game" v-on:targeting="targeting" ></helm>
        </div>

        <!--
        <div class="cards-container">
            <card label="Nerfball" cost="mana-0" type="mistle" face="./static/dog1.png" effect="damage+0"></card>
            <card label="Paper Bag" cost="mana-0" type="shield" face="./static/dog1.png" effect="shield+0"></card>
        </div>
        -->
    </div>
</template>

<script>
    import Player from './Player'
    import Card from './Card'
    import Helm from './Helm'

    export default {
        name: 'Crucible',
        components: {Player, Helm, Card},
        data () {
            return {
                game: {
                    rules:{
                        "maxMana": 0,
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
                                "avatarIndex": 0,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":1,
                                "name":"Protobot",
                                "avatarIndex": 1,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":2,
                                "name":"Streambot",
                                "avatarIndex": 2,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":3,
                                "name":"Grammarbot",
                                "avatarIndex": 3,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":4,
                                "name":"Lambdabot",
                                "avatarIndex": 4,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":5,
                                "name":"Admiral Hope",
                                "avatarIndex": 5,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":6,
                                "name":"Mina",
                                "avatarIndex": 6,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":7,
                                "name":"Phoebe",
                                "avatarIndex": 7,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":8,
                                "name":"Lucy",
                                "avatarIndex": 8,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "drawEnabled":false,
                                "bleedingOut":false,
                                "active":true
                            },
                            {
                                "id":9,
                                "name":"Max",
                                "avatarIndex": 9,
                                "mana":0,
                                "health":30,
                                "shields":[0],
                                "cards":[],
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
                        { id: '0', name: 'General Scum', img: '../static/general_scum.png' },
                        { id: '1', name: 'Protobot', img: '../static/robot1.png' },
                        { id: '2', name: 'Streambot', img: '../static/robot2.png' },
                        { id: '3', name: 'Grammarbot', img: '../static/robot3.png' },
                        { id: '4', name: 'Lambdabot', img: '../static/robot4.png' },
                        { id: '5', name: 'Admiral Hope', img: '../static/admiral_hope.png' },
                        { id: '6', name: 'Cavalier', img: '../static/dog1.png' },
                        { id: '7', name: 'Mini Schnauser', img: '../static/dog2.png' },
                        { id: '8', name: 'Boston Terrier', img: '../static/dog3.png' },
                        { id: '9', name: 'Border Collie', img: '../static/dog4.png' } ,
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
                title: 'Waypoint Crucible',
                timeRunning: 0,
                timeStarted: 0,
                gameIntervalId: 0,
                manaIntervalId: 0,
            }
        },
        methods: {
            targeting: function (sourceId, targetId, card) {
                console.log("targeting called in crucible");
                console.log(sourceId);
                console.log(targetId);
                console.log(card);
                this.game.waypoint.players[sourceId].mana -= card;
                this.game.waypoint.players[targetId].health -= card;
            },
            shuffle: function(array) {
                let remaining = array.length;
                let randomIndex;
                let last;

                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = array[remaining];
                    array[remaining] = array[randomIndex];
                    array[randomIndex] = last;
                }
                return array;
            },

            startGame: function() {
                var scope = this;
                this.game.waypoint.players.forEach(function(player){
                    player.deck = scope.shuffle(player.deck);
                });
                this.timeStarted = Date.now();
                this.timeRunning = 0;
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
                this.gameIntervalId = setInterval(this.gameTick, 100);
                this.manaIntervalId = setInterval(this.manaTick, 1000);
            },
            gameTick: function() {
                this.timeRunning = Date.now() - this.timeStarted;
            },
            manaTick: function() {
                if(this.game.rules.maxMana < 10){
                    this.game.rules.maxMana++;
                }
                this.game.waypoint.players.forEach(function(player){
                    if(player.mana < 10){
                        player.mana++;
                    }
                })
            },
            endGame: function() {
                clearInterval(this.gameIntervalId);
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
