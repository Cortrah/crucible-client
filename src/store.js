import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        appView: null,
        serverLive: false,
        user: {
            email: null,
            password: null,
            session: {
                signedIn: false,
                authHeader: '',
                sessionId: '',
                sessionKey: ''
            },
            profile: {
                name: 'Gogo Gadget',
                botChecked: false,
                ipAddress: 'https://123.122.1.2',
                port: '8000',
                token:'change me',
                selDog: '../static/dog1.png',
                selBot: '../static/robot1.png'
            },
            // playerId is the id of the user in the lobby and at the table
            playerId: null,
            // actorId is the id of the bot or eventManager for the user interface events of the player in game
            actorId: null,
        },
        lobby: {
            messages: [],
            players: [],
            tables: [],
        },
        game: {
            name:'Waypoint Crucible Game X',
            status:'PREPARING',
            winner:'',
            rules: {
                maxMana: 10,
                maxHealth: 30,
                startingDeck: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8],
                startingHandSize: 0,
                maxCards: 5,
                gameTickInterval: 500,
                manaGrowthInterval: 1000,
                manaReplentishInterval: 1000,
                drawInterval: 1000,
                fireInterval: 500,
                bleedoutInterval: 1000,
                flightTime: 4000,
                shieldsUpTime: 1000,
                shieldDecayRate: 1000
            },
            actorCount:10,
            actors:[],
            mistles:[],
            shields:[],
            gameIntervalId: null,
            manaIntervalId: null,
            timeStarted: 0,
            timeRunning: 0,
        },
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
    },
    actions: {
       onInit(context, payload){
            context.commit("init", payload);
        },
        async onDispatch(context, action) {
            //console.log("store onDispatch action called");
            // console.log(this);
            // console.log(context);
            //console.log(action);
            // console.log(action.command.thing1());
            // console.log(await action.command.thing2());
            return await action.command.onDispatch(context, action);
        },
    },
    mutations: {
        do(state, payload) {
            //console.log("=== store do mutation called ===");
            // console.log(state);
            //console.log(payload);
            // console.log(payload.action);
            // console.log(payload.action.type);
            // console.log(payload.action.command.name);
            // console.log(payload.action.command.data);
            return payload.action.command.do(state, payload.results);
        },
        init(state, payload){
            state.appView = payload;
        },
    },
})
