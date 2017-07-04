import Vue from 'vue'
import Vuex from 'vuex'

import lobby from './modules/lobby.js'
import rules from './modules/rules.js'
import game from './modules/game.js'

import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations'

import createLogger from '../../src/plugins/logger.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
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
        "gameIntervalId": 0,
        "manaIntervalId": 0,
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
    getters,
    actions,
    mutations,
    modules: {
        lobby,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
