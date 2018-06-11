import Vue from 'vue'
import Vuex from 'vuex'
import User from '../lobby/User'
import Game from '../stage/Game'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export const state = {
    user: new User(),
    tables: [],
    game: null,
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
};
export default new Vuex.Store({
    // state,
    // actions: {
    //     // ------------------
    //     // actor actions
    //     // ------------------
    //     createTable(context, payload){
    //         context.commit('createTable', payload);
    //     },
    //     drawMistle(context, payload){
    //         context.commit('drawMistle', {actorId: payload.actorId});
    //     },
    //     drawShield(context, payload){
    //         context.commit('drawShield', {actorId: payload.actorId});
    //     },
    //     selectCard: function(context, payload){
    //         context.commit({type: 'selectCard', actorId: payload.actorId, cardIndex: payload.cardIndex});
    //     },
    //     targetActor: function (context, payload) {
    //         let sourceActor = state.game.actors[payload.sourceId];
    //         let targetActor = state.game.actors[payload.targetId];
    //         let card = null;
    //         if (sourceActor.selectedCardIndex !== -1) {
    //             card = sourceActor.cards[payload.cardIndex];
    //         }
    //         if (card != null && sourceActor.isActive && targetActor.isActive) {
    //             if (sourceActor.team !== targetActor.team && card.cardType === "MISTLE") {
    //                 let mistle = {
    //                     id: new Date(),
    //                     sourceId: payload.sourceId,
    //                     targetId: payload.targetId,
    //                     card: card,
    //                     hasLanded: false,
    //                     flightTime: state.game.rules.flightTime
    //                 };
    //                 context.commit({
    //                     type: 'targetActor',
    //                     sourceId: payload.sourceId,
    //                     targetId: payload.targetId,
    //                     cardIndex: payload.cardIndex,
    //                     mistle: mistle,
    //                 });
    //                 setTimeout(() => {
    //                     context.commit('mistleImpact', mistle)
    //                 }, state.game.rules.flightTime);
    //             } else if (sourceActor.team === targetActor.team && card.cardType === "SHIELD") {
    //                 let shield = {
    //                     id: new Date(),
    //                     sourceId: payload.sourceId,
    //                     targetId: payload.targetId,
    //                     card: card,
    //                     isUp: false,
    //                     upTime: state.game.rules.shieldsUpTime
    //                 };
    //                 context.commit({
    //                     type: 'targetActor',
    //                     sourceId: payload.sourceId,
    //                     targetId: payload.targetId,
    //                     cardIndex: payload.cardIndex,
    //                     shield: shield,
    //                 });
    //                 setTimeout(() => {
    //                     context.commit('shieldUp', shield)
    //                 }, state.game.rules.shieldsUpTime);
    //
    //             }
    //         }
    //     },
    //
    //     // ------------------
    //     // table management
    //     // ------------------
    //     sitAtTable: function(context, payload){
    //         context.commit({type: 'sitAtTable', playerId: payload.playerId});
    //     },
    //     standFromTable: function(context, payload){
    //         context.commit({type: 'standFromTable', playerId: payload.playerId});
    //     },
    //
    //     // ------------------
    //     // game management
    //     // ------------------
    //     startGame: function(context, payload) {
    //         context.commit('startGame', payload);
    //     },
    //     manaTick: function(context, payload) {
    //         context.commit('manaTick', payload);
    //     },
    //     endGame: function(context, payload) {
    //         context.commit('endGame', payload);
    //     },
    // },
    // mutations: {
    //     // ------------------
    //     // Actor actions
    //     // ------------------
    //     drawMistle: function(state, payload){
    //         let actor = state.game.actors[payload.actorId];
    //         if(actor.mana >= 1 && actor.deck.length > 0) {
    //             let drawn = actor.deck[0];
    //             actor.cards.push({cardType:"MISTLE", value: drawn});
    //             actor.deck.splice(0, 1);
    //             actor.deckSize = actor.deck.length;
    //             actor.mana--;
    //         }
    //     },
    //     drawShield: function(state, payload){
    //         let actor = state.game.actors[payload.actorId];
    //         if(actor.mana >= 1 && actor.deck.length > 0) {
    //             let drawn = actor.deck[0];
    //             actor.cards.push({cardType:"SHIELD", value: drawn});
    //             actor.deck.splice(0, 1);
    //             actor.deckSize = actor.deck.length;
    //             actor.mana--;
    //         }
    //     },
    //     selectCard: function(state, payload){
    //         let actor = state.game.actors[payload.actorId];
    //         actor.selectedCardIndex = payload.cardIndex;
    //     },
    //     targetActor: function (state, payload) {
    //         let sourceActor = state.game.actors[payload.sourceId];
    //         let targetActor = state.game.actors[payload.targetId];
    //         let card = sourceActor.cards[payload.cardIndex];
    //         if(sourceActor.mana >= card.value){
    //             sourceActor.mana -= card.value;
    //             sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
    //             sourceActor.selectedCardIndex = -1;
    //             if(card.cardType === "MISTLE") {
    //                 state.game.mistles.push(payload.mistle);
    //             } else if (card.cardType === "SHIELD"){
    //                 targetActor.shields.push(payload.shield);
    //             }
    //         }
    //     },
    //     mistleImpact: function(state, mistle){
    //         let sourceActor = state.game.actors[mistle.sourceId];
    //         let targetActor = state.game.actors[mistle.targetId];
    //         if(state.game.status === "PLAYING") {
    //             targetActor.health = Math.max(0, targetActor.health - mistle.card.value);
    //             mistle.landed = true;
    //             if (targetActor.health <= 0) {
    //                 targetActor.isActive = false;
    //                 let activeOpponents = state.game.actors.filter(actor => (actor.isActive && actor.team === targetActor.team));
    //                 if(activeOpponents.length === 0){
    //                     state.game.winner = sourceActor.team;
    //                     state.game.status = "OVER";
    //                 }
    //             }
    //         }
    //     },
    //     shieldUp: function(state, shield){
    //         let sourceActor = state.game.actors[shield.sourceId];
    //         let targetActor = state.game.actors[shield.targetId];
    //         if(state.game.status === "PLAYING") {
    //             shield.isUp = true;
    //         }
    //     },
    //
    //     // ------------------
    //     // table management
    //     // ToDo: should create the game give it an id and tie that id to the payload
    //     // should also create the game instance and add actors dynamically
    //     // should do this on the server
    //     // ------------------
    //     sitAtTable: function(state, payload) {
    //         state.user.playerId = (payload.data);
    //         //change other props
    //     },
    //     standFromTable: function(state, payload) {
    //         state.user.playerId = (payload.data);
    //     },
    //
    //     // ------------------
    //     // game management
    //     // ------------------
    //     createTable: function(state, payload) {
    //         // ToDo: should create the game give it an id and tie that id to the payload
    //         // should also create the game instance and add actors dynamically
    //         // should do this on the server
    //         payload.data.id = '0';
    //         state.tables.push(payload.data);
    //     },
    //     startGame: function(state, payload) {
    //         let scope = this;
    //         state.game.actors.forEach(function(actor){
    //             let remaining = actor.deck.length;
    //             let randomIndex;
    //             let last;
    //
    //             while (remaining) {
    //                 randomIndex = Math.floor(Math.random() * remaining--);
    //                 last = actor.deck[remaining];
    //                 actor.deck[remaining] = actor.deck[randomIndex];
    //                 actor.deck[randomIndex] = last;
    //             }
    //         });
    //         state.game.status = "PLAYING";
    //         state.game.timeStarted = Date.now();
    //         state.game.timeRunning = 0;
    //     },
    //     manaTick: function(state) {
    //         state.game.actors.forEach(function(actor){
    //             if(actor.maxMana < 10){
    //                 actor.maxMana++;
    //             }
    //             if(actor.mana < actor.maxMana){
    //                 actor.mana++;
    //             }
    //             if(actor.deck.length <= 0 && actor.cards.length === 0 && actor.isActive){
    //                 actor.health--;
    //             }
    //         })
    //     },
    //     endGame: function(state, payload) {
    //         state.game.status = "OVER";
    //     }
    //}
})
