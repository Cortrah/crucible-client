<template>
    <div class="crucible">

        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <span>{{ timeRunning }}</span>

        <div class="players-container">
            <helm ref="helm" playerId="0" :game="game" v-show="false"
                  v-on:TARGET_PLAYER="targetPlayer"
                  v-on:DRAW_MISTLE="drawMistle"
                  v-on:DRAW_SHIELD="drawShield"
                  v-on:SELECT_CARD="selectCard" >
            </helm>
            <helm ref="helm" playerId="5" :game="game"
                  v-on:TARGET_PLAYER="targetPlayer"
                  v-on:DRAW_MISTLE="drawMistle"
                  v-on:DRAW_SHIELD="drawShield"
                  v-on:SELECT_CARD="selectCard" >
            </helm>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import Player from './Player'
    import Helm from './Helm'
    import MistleInFlight from './MistleInFlight'

    Vue.component('mistle-in-flight', MistleInFlight);

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        data () {
            return {
                game: {
                    rules:{
                        "maxMana": 10,
                        "maxHealth": 30,
                        "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                        "startingHandSize": 0,
                        "maxCards":5,
                        "flightTime": 4000,
                        "manaGrowthRate":1/3,
                        "manaReplentishRate":1/1,
                        "drawRate":1/1,
                        "fireRate":2/1,
                        "bleedoutRate":1/2,
                        "shieldDecayRate": 1/1
                    },
                    waypoint:{
                        "status": "PLAYING",
                        "winner": "No",
                        "timer":0,
                        "commands":[],
                        "events":[],
                        "players":[
                            {
                                "id":0,
                                "name":"General Scum",
                                "team":"Bad Guys",
                                "avatarImg": "../static/general_scum.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":1,
                                "name":"Protobot",
                                "team":"Bad Guys",
                                "avatarImg": "../static/robot1.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":2,
                                "name":"Streambot",
                                "team":"Bad Guys",
                                "avatarImg": "../static/robot2.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":3,
                                "name":"Grammarbot",
                                "team":"Bad Guys",
                                "avatarImg": "../static/robot3.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":4,
                                "name":"Lambdabot",
                                "team":"Bad Guys",
                                "avatarImg": "../static/robot4.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":5,
                                "name":"Admiral Hope",
                                "team":"Good Guys",
                                "avatarImg": "../static/admiral_hope.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":6,
                                "name":"Mina",
                                "team":"Good Guys",
                                "avatarImg": "../static/dog1.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id":7,
                                "name":"Phoebe",
                                "team":"Good Guys",
                                "avatarImg": "../static/dog2.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                            {
                                "id": 8,
                                "name": "Lucy",
                                "team": "Good Guys",
                                "avatarImg": "../static/dog3.png",
                                "maxMana": 0,
                                "mana": 0,
                                "maxHealth": 30,
                                "health": 30,
                                "shields": [0],
                                "cards": [],
                                "selectedCardIndex":null,
                                "deck": [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8],
                                "startingDeckLength": 20,
                                "drawEnabled": false,
                                "isbleedingOut": false,
                                "isActive": true
                            },
                            {
                                "id":9,
                                "name":"Max",
                                "team":"Good Guys",
                                "avatarImg": "../static/dog4.png",
                                "maxMana":0,
                                "mana":0,
                                "maxHealth":30,
                                "health":30,
                                "shields":[0],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "startingDeckLength":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
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
            targetPlayer: function (sourceId, targetId) {
                if (this.areEnemies(sourceId, targetId)){
                    let sourcePlayer = this.game.waypoint.players[sourceId];
                    if(sourcePlayer.selectedCardIndex !== -1) {
                        let card = sourcePlayer.cards[sourcePlayer.selectedCardIndex];
                        if(sourcePlayer.mana >= card){
                            let targetPlayer = this.game.waypoint.players[targetId];
                            sourcePlayer.mana -= card;
                            sourcePlayer.cards.splice(sourcePlayer.selectedCardIndex, 1);
                            sourcePlayer.selectedCardIndex = -1;
                            this.launchMistle(sourcePlayer, targetPlayer, card)
                        }
                    }
                }
            },
            launchMistle: function(sourcePlayer, targetPlayer, card) {
                if(sourcePlayer.isActive){
                    // eventually the timer might be different for different cards or mistles
                    let sourcePlayerVm = this.$refs.helm.getPlayerVm(sourcePlayer.id);
                    let targetPlayerVm = this.$refs.helm.getPlayerVm(targetPlayer.id);
                    let sRect = sourcePlayerVm.$el.getBoundingClientRect();
                    let tRect = targetPlayerVm.$el.getBoundingClientRect();
                    this.game.waypoint.inFlight.push({
                        id: new Date(),
                        sourceX: sRect.left + sRect.width/2,
                        sourceY: sRect.top  + sRect.height/2,
                        targetX: tRect.left + tRect.width/2,
                        targetY: tRect.top + tRect.height/2,
                        card: card,
                        flightTime: this.game.rules.flightTime
                    });
                    setTimeout(this.mistleImpact, this.game.rules.flightTime, sourcePlayer, targetPlayer, card);
                }
            },
            mistleImpact: function(sourcePlayer, targetPlayer, mistle){
                if(this.game.waypoint.status === "PLAYING") {
                    targetPlayer.health -= mistle;
                    if (targetPlayer.health <= 0) {
                        targetPlayer.isActive = false;
                        //this.game.waypoint.winner = sourcePlayer.team;
                        //this.endGame();
                    }
                }
            },
            areEnemies: function(player1Id, player2Id){
                let p1 = this.game.waypoint.players[player1Id];
                let p2 = this.game.waypoint.players[player2Id];
                return (p1.team !== p2.team);
            },
            drawMistle: function(playerId){
                let player = this.game.waypoint.players[playerId];
                if(player.mana >= 1) {
                    let drawn = player.deck[0];
                    player.cards.push(drawn);
                    player.deck.splice(0, 1);
                    player.mana--;
                }
            },
            drawShield: function(playerId){
                //let player = this.game.waypoint.players[playerId];
                //let shield = new Shield(player.deck[0]);
                //player.cards.push(shield);
                //player.deck.splice(0,1);
            },
            selectCard: function(playerId, cardIndex){
                let player = this.game.waypoint.players[playerId];
                player.selectedCardIndex = cardIndex;
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
                this.game.waypoint.players.forEach(function(player){
                    if(player.maxMana < 10){
                        player.maxMana++;
                    }
                    if(player.mana < player.maxMana){
                        player.mana++;
                    }
                    if(player.deck <= 0 && player.cards === 0 && player.isActive){
                        player.health--;
                    }
                })
            },
            endGame: function() {
                this.game.waypoint.status = "OVER";
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
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
