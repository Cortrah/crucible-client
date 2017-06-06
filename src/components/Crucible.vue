<template>
    <div class="crucible">

        <button @click="startGame()">Start Game</button>
        <button @click="endGame()">End Game</button>
        <span>{{ timeRunning }}</span>

        <div class="players-container">
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

    export default {
        name: 'Crucible',
        components: {Helm, Player},
        data () {
            return {
                game: {
                    title: 'Waypoint Crucible',
                    rules:{
                        "maxMana": 10,
                        "maxHealth": 30,
                        "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                        "startingHandSize": 0,
                        "maxCards":5,
                        "flightTime": 4000,
                        "manaGrowthInterval":1000,
                        "manaReplentishInterval":1000,
                        "drawInterval":1000,
                        "fireInterval":500,
                        "bleedoutInterval":1000,
                        "shieldDecayInterval": 1000
                    },
                    state:{
                        "status": "PLAYING",
                        "winner": "",
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields": [],
                                "cards": [],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
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
                                "shields":[],
                                "cards":[],
                                "selectedCardIndex":null,
                                "deck":[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                                "deckSize":20,
                                "drawEnabled":false,
                                "isbleedingOut":false,
                                "isActive":true
                            },
                        ],
                        "inFlight":[]
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
                timeRunning: 0,
                timeStarted: 0,
                gameIntervalId: 0,
                manaIntervalId: 0,
            }
        },
        methods: {
            drawMistle: function(playerId){
                let player = this.game.state.players[playerId];
                if(player.mana >= 1 && player.deck.length > 0) {
                    let drawn = player.deck[0];
                    player.cards.push(drawn);
                    player.deck.splice(0, 1);
                    player.deckSize = player.deck.length;
                    player.mana--;
                }
            },
            drawShield: function(playerId){
                //let player = this.game.state.players[playerId];
                //let shield = new Shield(player.deck[0]);
                //player.cards.push(shield);
                //player.deck.splice(0,1);
            },
            selectCard: function(playerId, cardIndex){
                let player = this.game.state.players[playerId];
                player.selectedCardIndex = cardIndex;
            },
            targetPlayer: function (sourceId, targetId) {
                if (this.areEnemies(sourceId, targetId)){
                    let sourcePlayer = this.game.state.players[sourceId];
                    if(sourcePlayer.selectedCardIndex !== -1) {
                        let card = sourcePlayer.cards[sourcePlayer.selectedCardIndex];
                        if(sourcePlayer.mana >= card){
                            let targetPlayer = this.game.state.players[targetId];
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
                    this.game.state.inFlight.push({
                        id: new Date(),
                        sourceId: sourcePlayer.id,
                        targetId: targetPlayer.id,
                        card: card,
                        flightTime: this.game.rules.flightTime
                    });
                    setTimeout(this.mistleImpact, this.game.rules.flightTime, sourcePlayer, targetPlayer, card);
                }
            },
            mistleImpact: function(sourcePlayer, targetPlayer, mistle){
                if(this.game.state.status === "PLAYING") {
                    targetPlayer.health = Math.max(0, targetPlayer.health - mistle);
                    if (targetPlayer.health <= 0) {
                        targetPlayer.isActive = false;
                        this.game.state.winner = sourcePlayer.team;
                        this.endGame();
                    }
                }
            },
            areEnemies: function(player1Id, player2Id){
                let p1 = this.game.state.players[player1Id];
                let p2 = this.game.state.players[player2Id];
                return (p1.team !== p2.team);
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
                this.game.state.players.forEach(function(player){
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
                this.game.state.players.forEach(function(player){
                    if(player.maxMana < 10){
                        player.maxMana++;
                    }
                    if(player.mana < player.maxMana){
                        player.mana++;
                    }
                    if(player.deck.length <= 0 && player.cards.length === 0 && player.isActive){
                        player.health--;
                    }
                })
            },
            endGame: function() {
                this.game.state.status = "OVER";
                clearInterval(this.gameIntervalId);
                clearInterval(this.manaIntervalId);
            }
            /*
                tableCreated, {
                    tableState: {
                        title,
                        axisName,
                        aliesName,
                        host {playerId}
                        rules: {
                            "maxMana": 10,
                             "maxHealth": 30,
                             "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
                             "startingHandSize": 0,
                             "maxCards":5,
                             "flightTime": 4000,
                             "manaGrowthInterval":1000,
                             "manaReplentishInterval":1000,
                             "drawInterval":1000,
                             "fireInterval":500,
                             "bleedoutInterval":1000,
                             "shieldDecayInterval": 1000
                        },
                        state: {
                             "status": "JOINING",
                             "winner": "",
                             "tableEvents":[],
                             "gameEvents":[],
                             "players":{
                             }
                    }
                }
                // tableEvents
                playerJoined {
                    publicPlayerState{
                     "id":9,
                     "name":"Max",
                     "team":"Good Guys",
                     "avatarImg": "../static/dog4.png",
                     "maxMana":0,
                     "mana":0,
                     "maxHealth":30,
                     "health":30,
                     "shields":[],
                     "cards":[],
                     "selectedCardIndex":null,
                     "deckSize:20,
                     "drawEnabled":false,
                     "isbleedingOut":false,
                     "isActive":true
                }
                playerLeft { playerId }
                playerTimedOut { playerId }
                playerReConnected { playerId }

                // gameEvents
                gameStarted timeStamp
                manaTick timeStamp
                drewMistle playerId, card
                drewShield playerId, card
                selectedCard playerId, card
                targetedPlayer sourceId, targetId
                mistleImpacted, sourcePlayer, targetPlayer, mistle
                playerOut playerId
                gameEnded winnerName

                // question: does each event contain it's side effects
                // as a set of undoable redoable delta packets and functions?
                // or does the client engine apply the results based on
                // it's knowledge of the game's rules?

                // answer: lets just start by returning the changed state

                // counterAnswer: ok well that works now, so lets do this
                // lets do a console log of each event
                // then put those in the events array
                // and then try to play back a game by running the events array
                // instead of using the tick in helm for the ai
             */
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
