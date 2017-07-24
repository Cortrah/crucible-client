import Vue from 'vue'
import Vuex from 'vuex'

import lobby from './modules/lobby.js'
import rules from './modules/rules.js'
import game from './modules/game.js'

import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations'

//import createLogger from '../../src/plugins/logger.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const state = {
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
    game:{
        "title": 'Waypoint Crucible',
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
        "inFlight":[],
        "timeRunning": 0,
        "timeStarted": 0,
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
        { id: '9', name: 'Border Collie', img: '../static/dog4.png' }
    ]
};

export default new Vuex.Store({
    state,
    actions: {
        drawMistle(context, payload){
            context.commit('drawMistle', {playerId: payload.playerId});
        },
        drawShield(context, payload){
            context.commit('drawShield', {playerId: payload.playerId});
        },
        selectCard: function(context, payload){
            console.log('payload.cardIndex');
            console.log(payload.cardIndex);
            context.commit({type: 'selectCard', playerId: payload.playerId, cardIndex: payload.cardIndex});
        },
        targetPlayer: function (context, payload){
            context.commit({type: 'targetPlayer', sourceId: payload.sourceId, targetId: payload.targetId});
            context.commit({type: 'launchMistle', sourceId: payload.sourceId, targetId: payload.targetId, card: payload.card});
            console.log('payload.cardIndex');
            console.log(payload.cardIndex);

            let sourcePlayer = state.game.players[payload.sourceId];
            let targetPlayer = state.game.players[payload.targetId];
            if (sourcePlayer.team !== targetPlayer.team) {
                if (sourcePlayer.isActive) {
                    if (sourcePlayer.selectedCardIndex !== -1) {
                        let card = sourcePlayer.cards[sourcePlayer.selectedCardIndex];
                        console.log('card');
                        console.log(card);
                        console.log(payload.cardIndex);


                        // eventually the timer might be different for different cards or mistles
                        let mistle = {
                            id: new Date(),
                            sourceId: payload.sourceId,
                            targetId: payload.targetId,
                            card: card,
                            flightTime: state.rules.flightTime
                        };
                        context.commit({type: 'launchMistle', mistle: mistle})
                        setTimeout(() => {
                            commit('mistleImpact', mistle)
                        }, state.rules.flightTime);
                    }
                }
            }
        },
        startGame: function(context) {
            context.commit('startGame');
        },
        gameTick: function(context) {
            context.commit('gameTick');
        },
        manaTick: function(context) {
            context.commit('manaTick');
        },
        endGame: function(context) {
            context.commit('endGame');
        }
    },
    mutations: {
        drawMistle: function(state, payload){
            console.log("drawMistle called in store");
            console.log(state);
            console.log(payload.playerId);
            let player = state.game.players[payload.playerId];
            if(player.mana >= 1 && player.deck.length > 0) {
                let drawn = player.deck[0];
                player.cards.push(drawn);
                player.deck.splice(0, 1);
                player.deckSize = player.deck.length;
                player.mana--;
            }
        },
        drawShield: function(state, playerId){
            //let player = this.game.players[playerId];
            //let shield = new Shield(player.deck[0]);
            //player.cards.push(shield);
            //player.deck.splice(0,1);
        },
        selectCard: function(state, payload){
            console.log("selectCard mutation called in store");
            console.log(payload.playerId);
            console.log(payload.cardIndex);

            let player = state.game.players[payload.playerId];
            player.selectedCardIndex = payload.cardIndex;
        },
        targetPlayer: function (state, payload) {
            console.log("targetPlayer mutation called in store");
            console.log('payload.cardIndex');
            console.log(payload.cardIndex);

            let sourcePlayer = state.game.players[payload.sourceId];
            console.log(payload.sourceId);
            console.log(payload.targetId);
            let card = payload.card;
            if(sourcePlayer.mana >= card){
                sourcePlayer.mana -= card;
                sourcePlayer.cards.splice(sourcePlayer.selectedCardIndex, 1);
                sourcePlayer.selectedCardIndex = -1;
            }
        },
        launchMistle: function(state, mistle) {
            console.log("launchMistle mutation called in store");
            console.log(mistle);
            state.game.inFlight.push(mistle);
        },
        mistleImpact: function(state, mistle){
            console.log("mistleImpact mutation called in store");
            console.log(mistle);
            let sourcePlayer = state.game.players[mistle.sourceId];
            let targetPlayer = state.game.players[mistle.targetId];
            if(state.game.status === "PLAYING") {
                targetPlayer.health = Math.max(0, targetPlayer.health - mistle.card);
                if (targetPlayer.health <= 0) {
                    targetPlayer.isActive = false;
                    state.game.winner = sourcePlayer.team;
                    this.endGame();
                }
            }
        },
        startGame: function(state) {
            console.log("start game called");
            var scope = this;
            // state.game.players.forEach(function(player){
            //    player.deck = state.getters.shuffle(player.deck);
            // });
            state.game.timeStarted = Date.now();
            state.game.timeRunning = 0;
        },
        gameTick: function(state) {
            state.game.timeRunning = Date.now() - state.game.timeStarted;
        },
        manaTick: function(state) {
            state.game.players.forEach(function(player){
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
        endGame: function(state) {
            state.game.status = "OVER";
        }
    },
    getters: {
        numberOfPlayers: state => {
            console.log("accessing");
            return state.game.players.length;
        },
        playerById: function(state, playerId){
            console.log("playerId:" + playerId);
            return state.game.players[playerId];
        },
        shuffle: function(state, array) {
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
        }
    },
    modules: {
        lobby,
    },
    strict: debug,
//    plugins: debug ? [createLogger()] : []
})