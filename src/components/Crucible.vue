<template>
    <div class="crucible">

        <!--<div class="players-container">-->
            <!--<helm id="0" :model="game.waypoint.players[0]" :game="game" v-on:targeting="targeting" ></helm>-->
        <!--</div>-->

        <!--<button @click="startGame()">Start Game</button>-->
        <!--<button @click="endGame()">End Game</button>-->
        <!--<span>{{ timeRunning }}</span>-->

        <player ref = "opponents" vmode = "external"
                :game = "game">
        </player>
    </div>
</template>

<script>
    import Player from './Player'

    export default {
        name: 'Crucible',
        components: {Player},
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
                                "team":"Bad Guys",
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
                                "team":"Bad Guys",
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
                                "team":"Bad Guys",
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
                                "team":"Bad Guys",
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
                                "team":"Bad Guys",
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
                                "team":"Good Guys",
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
                                "team":"Good Guys",
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
                                "team":"Good Guys",
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
                                "team":"Good Guys",
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
                                "team":"Good Guys",
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
                    ]
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
</style>
