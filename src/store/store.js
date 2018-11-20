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
    state,
    actions: {
        enqueue(context, command) {
            return  context.commit('do', command);
        },
    },
    mutations: {
        do(state, payload) {
            return payload.command.do(state);
        },
    }
})
