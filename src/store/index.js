import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../../src/plugins/logger.js'

import lobby from './modules/lobby.js'
import rules from './modules/rules.js'
import game from './modules/game.js'
import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        lobby,
        rules,
        game,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
