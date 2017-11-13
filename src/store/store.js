import Vue from 'vue'
import Vuex from 'vuex'
import Player from '../models/Player'
import Rules from '../models/Rules'
import Game from '../models/Game'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export const state = {
    rules: new Rules(),
    game: new Game(),
    dogAvatars: [
        {id: '1', name: 'Cavalier', img: '../static/dog1.png'},
        {id: '2', name: 'Mini Schnauser', img: '../static/dog2.png'},
        {id: '3', name: 'Boston Terrier', img: '../static/dog3.png'},
        {id: '4', name: 'Border Collie', img: '../static/dog4.png'}
    ],
    botAvatars: [
        {id: '1', name: 'Protobot', img: '../static/robot1.png'},
        {id: '2', name: 'Streambot', img: '../static/robot2.png'},
        {id: '3', name: 'Grammarbot', img: '../static/robot3.png'},
        {id: '4', name: 'Lambdabot', img: '../static/robot4.png'}
    ],
    tables: [],
    players: [],
    messages: [],
};
export default new Vuex.Store({
    state,
    actions: {
        // ------------------
        // player actions
        // ------------------
        createTable(context, payload){
            context.commit('createTable', payload);
        },
        drawMistle(context, payload){
            context.commit('drawMistle', {playerId: payload.playerId});
        },
        drawShield(context, payload){
            context.commit('drawShield', {playerId: payload.playerId});
        },
        selectCard: function(context, payload){
            context.commit({type: 'selectCard', playerId: payload.playerId, cardIndex: payload.cardIndex});
        },
        targetPlayer: function (context, payload) {
            let sourcePlayer = state.game.players[payload.sourceId];
            let targetPlayer = state.game.players[payload.targetId];
            let card = null;
            if (sourcePlayer.selectedCardIndex !== -1) {
                card = sourcePlayer.cards[payload.cardIndex];
            }
            if (card != null && sourcePlayer.isActive && targetPlayer.isActive) {
                if (sourcePlayer.team !== targetPlayer.team && card.cardType === "MISTLE") {
                    let mistle = {
                        id: new Date(),
                        sourceId: payload.sourceId,
                        targetId: payload.targetId,
                        card: card,
                        hasLanded: false,
                        flightTime: state.rules.flightTime
                    };
                    context.commit({
                        type: 'targetPlayer',
                        sourceId: payload.sourceId,
                        targetId: payload.targetId,
                        cardIndex: payload.cardIndex,
                        mistle: mistle,
                    });
                    setTimeout(() => {
                        context.commit('mistleImpact', mistle)
                    }, state.rules.flightTime);
                } else if (sourcePlayer.team === targetPlayer.team && card.cardType === "SHIELD") {
                    let shield = {
                        id: new Date(),
                        sourceId: payload.sourceId,
                        targetId: payload.targetId,
                        card: card,
                        isUp: false,
                        upTime: state.rules.shieldsUpTime
                    };
                    context.commit({
                        type: 'targetPlayer',
                        sourceId: payload.sourceId,
                        targetId: payload.targetId,
                        cardIndex: payload.cardIndex,
                        shield: shield,
                    });
                    setTimeout(() => {
                        context.commit('shieldUp', shield)
                    }, state.rules.shieldsUpTime);

                }
            }
        },

        // ------------------
        // game management
        // ------------------
        startGame: function(context, payload) {
            context.commit('startGame', payload);
        },
        manaTick: function(context, payload) {
            context.commit('manaTick', payload);
        },
        endGame: function(context, payload) {
            context.commit('endGame', payload);
        },
    },
    mutations: {
        // ------------------
        // player actions
        // ------------------
        drawMistle: function(state, payload){
            let player = state.game.players[payload.playerId];
            if(player.mana >= 1 && player.deck.length > 0) {
                let drawn = player.deck[0];
                player.cards.push({cardType:"MISTLE", value: drawn});
                player.deck.splice(0, 1);
                player.deckSize = player.deck.length;
                player.mana--;
            }
        },
        drawShield: function(state, payload){
            let player = state.game.players[payload.playerId];
            if(player.mana >= 1 && player.deck.length > 0) {
                let drawn = player.deck[0];
                player.cards.push({cardType:"SHIELD", value: drawn});
                player.deck.splice(0, 1);
                player.deckSize = player.deck.length;
                player.mana--;
            }
        },
        selectCard: function(state, payload){
            let player = state.game.players[payload.playerId];
            player.selectedCardIndex = payload.cardIndex;
        },
        targetPlayer: function (state, payload) {
            let sourcePlayer = state.game.players[payload.sourceId];
            let targetPlayer = state.game.players[payload.targetId];
            let card = sourcePlayer.cards[payload.cardIndex];
            if(sourcePlayer.mana >= card.value){
                sourcePlayer.mana -= card.value;
                sourcePlayer.cards.splice(sourcePlayer.selectedCardIndex, 1);
                sourcePlayer.selectedCardIndex = -1;
                if(card.cardType === "MISTLE") {
                    state.game.mistles.push(payload.mistle);
                } else if (card.cardType === "SHIELD"){
                    targetPlayer.shields.push(payload.shield);
                }
            }
        },
        mistleImpact: function(state, mistle){
            let sourcePlayer = state.game.players[mistle.sourceId];
            let targetPlayer = state.game.players[mistle.targetId];
            if(state.game.status === "PLAYING") {
                targetPlayer.health = Math.max(0, targetPlayer.health - mistle.card.value);
                mistle.landed = true;
                if (targetPlayer.health <= 0) {
                    targetPlayer.isActive = false;
                    let activeOpponents = state.game.players.filter(player => (player.isActive && player.team === targetPlayer.team));
                    if(activeOpponents.length === 0){
                        state.game.winner = sourcePlayer.team;
                        state.game.status = "OVER";
                    }
                }
            }
        },
        shieldUp: function(state, shield){
            let sourcePlayer = state.game.players[shield.sourceId];
            let targetPlayer = state.game.players[shield.targetId];
            if(state.game.status === "PLAYING") {
                shield.isUp = true;
            }
        },
        // ------------------
        // game management
        // ------------------
        createTable: function(state, payload) {
            // ToDo: should create the game give it an id and tie that id to the payload
            // should also create the game instance and add players dynamically
            // should do this on the server
            payload.data.id = '0';
            state.tables.push(payload.data);
        },
        startGame: function(state, payload) {
            let scope = this;
            state.game.players.forEach(function(player){
                let remaining = player.deck.length;
                let randomIndex;
                let last;

                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = player.deck[remaining];
                    player.deck[remaining] = player.deck[randomIndex];
                    player.deck[randomIndex] = last;
                }
            });
            state.game.status = "PLAYING";
            state.game.timeStarted = Date.now();
            state.game.timeRunning = 0;
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
        endGame: function(state, payload) {
            state.game.status = "OVER";
        }
    }
})
