<template>
    <div >
        <div id="header" class="pure-menu pure-menu-horizontal pure-menu-scrollable">
            <a href="#" class="pure-menu-link pure-menu-heading">
                <img id="logo" src="../static/logo.jpg"/>
            </a>
            <ul class="pure-menu-list">
                <span v-if="signedIn">
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="eventSwitch('goto-lobby')">
                            Lobby
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="eventSwitch('goto-table-top')">
                            Table Top
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="eventSwitch('goto-profile')">
                            Profile
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="signOutRequest()">
                            Sign Out
                        </a>
                    </li>
                </span>
                <span v-else>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="eventSwitch('goto-register')">
                            Register
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="eventSwitch('goto-sign-in')">
                            Sign In
                        </a>
                    </li>
                </span>
            </ul>
        </div>
        <div id="stage">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/babel">

    // -----------------------
    // local events
    // -----------------------
    // 'goto-home',
    // 'goto-sign-in', 'goto-register', 'goto-forgot',
    // 'goto-profile', 'goto-lobby', 'goto-host', 'goto-table-top',
    // 'error' msg

    // -----------------------
    // remote rest based account creation and lobby management
    // -----------------------
    //== accounts ==
    // 'register-user' user:{email,password,session,profile} => user:{email, password, _session_, profile}
    // 'sign-in-user' email, password => user:{email, password, _session_, profile}
    //--'forgot-password' email

    //== profiles ==
    // 'update-profile'
    //--'sign-out-user'

    //== tables (and games) ==
    // 'list-tables' => tables
    // 'create-table' rules numActors => table (&game)

    // -----------------------
    // nes websocket client events
    // -----------------------
    // 'join-table' playerId tableId => table.game
    // 'sit-at-table' playerId slotId
    // 'stand-from-table' playerId slotId => actor
    // 'start-game' table.game
    // 'draw-mistle' gameId playerId
    // 'draw-shield' gameId  playerId
    // 'select-card' gameId  playerId cardIndex
    // 'target-actor' gameId  sourceId targetId cardIndex

    // -----------------------
    // nes websocket server initiated
    // -----------------------
    // 'mana-tick',
    // 'game-tick',
    // 'mistle-impact',
    // 'shield-up',
    // 'end-game'

    let eventList = [
        'goto-home',
        'goto-sign-in', 'goto-register', 'goto-forgot',
        'goto-profile', 'goto-lobby', 'goto-host', 'goto-table-top',
        'register-request', 'sign-in-request',
        'update-profile',
        'sign-out-request', 'sign-out-result',
        'get-accounts-request','get-accounts-result',
        'create-table',
        'sit-at-table','stand-from-table',
        'start-game', 'end-game',
        'draw-mistle','select-card','target-actor',
        'mana-tick', 'game-tick',
        'error'
    ];

    export default {
        name: 'App',

        http: {
            root: 'http://localhost:8080/'
        },

        created () {
            let _self = this;
            eventList.forEach(eventName => {
                this.$bus.$on(eventName, function(data) {
                    _self.eventSwitch(eventName, data);
                });
            });
        },

        beforeDestroy () {
            eventList.forEach(eventName => {
                this.$bus.$off(eventName);
            });
        },

        data () {
            return {
                serverIsRunning: false,
                signedIn: false,
                loginInfo: {},
                eventData: {}
            }
        },

        methods: {
            eventSwitch: function(event, data) {
                // console.log(event);
                // if(typeof data !== 'undefined'){
                //    console.log(data);
                // }
                if(event.substring(0,5) === 'goto-'){
                    let newRoute = event.substring(5);
                    this.$router.push({ name: newRoute, params: data});
                } else {
                    switch (event) {
                        case 'register-request': {
                            this.registerRequest(data);
                            break;
                        }
                        case 'sign-in-request': {
                            this.signInRequest(data);
                            break;
                        }
                        case 'update-profile': {
                            this.updateProfile(data);
                            break;
                        }
                        case 'sign-out-request': {
                            this.signOutRequest(data);
                            break;
                        }
                        case 'sign-out-result': {
                            this.signOutResult(data);
                            break;
                        }
                        case 'get-accounts-request': {
                            this.getAccounts(data);
                            break;
                        }
                        case 'create-table': {
                            this.createTable(data);
                            break;
                        }
                        case 'start-game': {
                            this.startGame(data);
                            break;
                        }
                        case 'game-tick': {
                            this.$store.dispatch('gameTick', data);
                            break;
                        }
                        case 'mana-tick': {
                            this.$store.dispatch('manaTick', data);
                            break;
                        }
                        case 'draw-mistle': {
                            this.$store.dispatch('drawMistle', data);
                            break;
                        }
                        case 'draw-shield': {
                            this.$store.dispatch('drawShield', data);
                            break;
                        }
                        case 'select-card': {
                            this.$store.dispatch('selectCard', data);
                            break;
                        }
                        case 'target-actor': {
                            this.$store.dispatch('targetActor', data);
                            break;
                        }
                        case 'sit-at-table': {
                            this.$store.dispatch('sitAtTable', data);
                            break;
                        }
                        case 'stand-from-table': {
                            this.$store.dispatch('standFromTable', data);
                            break;
                        }
                        case 'end-game': {
                            this.endGame(data);
                            break;
                        }
                        default: {
                            throw "App error, invalid event: " + event + " .";
                        }
                    }
                }
            },

            registerRequest: function (formData) {
                if(this.serverIsRunning) {
                    this.$http.post('/hapi/api/accounts', formData).then(
                        (response) => {
                            this.loginInfo = response.body;
                            this.signedIn = true;
                            this.$bus.$emit('goto-profile');
                        }, (error) => {
                            // perhaps give a nice error message and customize login page
                            // for now go to splash just to mark that a change has happened
                            this.$bus.$emit('goto-home');
                        });
                } else {
                    // just fake it
                    this.signedIn = true;
                    this.$bus.$emit('goto-profile');
                }
            },

            signInRequest: function (formData) {
                if (this.serverIsRunning) {
                    this.$http.post('/hapi/api/login', formData)
                        .then((response) => {
                            this.loginInfo = response.body;
                            this.signedIn = true;
                            this.$bus.$emit('goto-profile');
                        }, (error) => {
                            // perhaps give a nice error message and customize login page
                            // for now go to splash just to mark that a change has happened
                            this.$bus.$emit('goto-home');
                        });
                } else {
                    // just fake it
                    this.signedIn = true;
                    this.$bus.$emit('goto-lobby');
                }
            },

            updateProfile: function (formData) {
                if(this.serverIsRunning) {
                    this.$http.patch('/hapi/api/accounts', formData).then(
                        (response) => {
                            // ok?
                        }, (error) => {
                            // perhaps give a nice error message
                        });
                } else {
                    // not sure
                }
            },

            signOutRequest: function (data) {
                if (this.serverIsRunning) {
                    this.$http.delete('/hapi/api/logout', {
                            headers: {
                                username: this.loginInfo.session._id,
                                password: this.loginInfo.session.key,
                                authorization: this.loginInfo.authHeader,
                            }
                        }).then((response) => {
                            this.loginInfo = {};
                            this.signedIn = false;
                            this.$bus.$emit('goto-home');
                        }, (error) => {
                            // either retry or emit error message?
                            // let the server side session timeout?
                            this.loginInfo = {};
                            this.signedIn = false;
                            this.$bus.$emit('goto-home');
                        });
                } else {
                    // just fake it
                    this.loginInfo = {};
                    this.signedIn = false;
                    this.$bus.$emit('goto-home');
                }
            },

            getAccounts: function () {
                this.$http.get('/hapi/api/accounts', {
                    headers: {
                        username: this.loginInfo.session._id,
                        password: this.loginInfo.session.key,
                        authorization: this.loginInfo.authHeader,
                    }
                }).then((response) => {
                    this.$bus.$emit('goto-lobby');
                }, (error) => {
                    this.gotoHome();
                });
            },

            createTable: function (data) {
                this.$store.dispatch({ type: 'createTable', data});
                this.$bus.$emit('goto-table-top');
            },

            startGame: function (data) {
                this.$store.dispatch({ type: 'startGame', data});
            },

            endGame: function (data) {
                this.$store.dispatch({ type: 'endGame', data});
            },
        }
    }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('../static/stars.jpg');
    }

    #header {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        background-color: #f5f5f5;
    }

    #stage {
        font-family: Source Sans Pro, Helvetica, sans-serif;
        height: 200px;
        width: 300px;
        margin: 20px;
        color: #ee9554;
        background-color: #000;
    }

    #main a {
        color: #42b983;
        text-decoration: none;
    }

    #logo {
        height:40px;
        width:40px;
    }

</style>
