<template>
    <div>
        <div id="header" class="pure-menu pure-menu-horizontal pure-menu-scrollable">
            <a href="#" class="pure-menu-link pure-menu-heading">
                W-C
            </a>
            <ul class="pure-menu-list">
                <span v-if="signedIn">
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="goto('Lobby')">
                            Lobby
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="goto('TableTop')">
                            Table Top
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="goto('Profile')">
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
                           @click.prevent="goto('Register')">
                            Register
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="goto('SignIn')">
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

    let eventList = [
        "go-to",
        'sign-in-request', 'sign-in-result',
        'sign-out-request', 'sign-out-result',
        'register-request', 'register-response',
        'get-accounts-request','get-accounts-result',
        'create-table', "error"
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

        computed: {
            routes () {
                let routes = [];
                this.$router.options.routes.forEach( function(item) {
                    routes.push(item.name);
                });
                return routes;
            }
        },

        methods: {

            // convert a named route into a event and trigger it
            goto(destination){
                if(this.routes.includes(destination) ){
                    this.eventSwitch('go-to', {'destination': destination});
                }
            },
            eventSwitch: function(event, data) {
                console.log(event);
                console.log(data);
                switch (event) {
                    case 'go-to': {
                        let elem = document.getElementById('stage');
                        this.eventData = data;
                        window.TweenMax.to(elem, 0.5,
                            {height: 400, width: 600, onComplete: this.nav});
                        break;
                    }
                    case 'register-request': {
                        this.registerRequest(data);
                        break;
                    }
                    case 'sign-in-request': {
                        this.signInRequest(data);
                        break;
                    }
                    case 'sign-in-result': {
                        this.signInResult(data);
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
                    default: {
                        throw "App error, invalid event: " + event + " .";
                    }
                }
            },

            nav: function () {
                this.$router.push({ name: this.eventData.destination, params: this.eventData});
            },

            registerRequest: function (formData) {
                if(this.serverIsRunning) {
                    this.$http.post('/hapi/api/login', formData).then(
                        (response) => {
                            this.loginInfo = response.body;
                            this.store.bus.$emit('sign-in-result');
                        }, (error) => {
                            console.log(error);
                            // perhaps give a nice error message and customize login page
                            // for now go to splash just to mark that a change has happened
                            this.gotoHome();
                        });
                } else {
                    // just fake it
                    this.$bus.$emit('register-result');
                }
            },
            registerResult: function (data) {
                this.signedIn = true;
                this.$bus.$emit('go-to', {'destination': 'Lobby'});
            },

            signInRequest: function (formData) {
                if(this.serverIsRunning) {
                    this.$http.post('/hapi/api/login', formData).then(
                        (response) => {
                            this.loginInfo = response.body;
                            this.store.bus.$emit('sign-in-result');
                        }, (error) => {
                            console.log(error);
                            // perhaps give a nice error message and customize login page
                            // for now go to splash just to mark that a change has happened
                            this.gotoHome();
                        });
                } else {
                    // just fake it
                    this.$bus.$emit('sign-in-result');
                }
            },
            signInResult: function (data) {
                this.signedIn = true;
                this.$bus.$emit('go-to', {'destination': 'Lobby'});
            },

            signOutRequest: function (data) {
                if(this.serverIsRunning) {
                    this.$http.delete('/hapi/api/logout', {
                        headers: {
                            username: this.loginInfo.session._id,
                            password: this.loginInfo.session.key,
                            authorization: this.loginInfo.authHeader,
                        }
                    })
                        .then(
                            (response) => {
                                this.store.bus.$emit('sign-out-result');
                            }, (error) => {
                                // either retry or emit logout-result regardless
                                // and let the server side session timeout?
                                console.log(error);
                                this.store.bus.$emit('sign-out-result');
                            });
                } else {
                    // just fake it
                    this.$bus.$emit('sign-out-result');
                }
            },
            signOutResult: function (data) {
                this.loginInfo = {};
                this.signedIn = false;
                this.$bus.$emit('go-to', {'destination': 'Home'});
            },

            getAccounts: function () {
                this.$http.get('/hapi/api/accounts', {
                    headers: {
                        username: this.loginInfo.session._id,
                        password: this.loginInfo.session.key,
                        authorization: this.loginInfo.authHeader,
                    }
                }).then(
                    (response) => {
                        console.log(response);
                        this.gotoLobby();
                    }, (error) => {
                        console.log(error);
                        this.gotoHome();
                    });
            },
            createTable: function (date) {
                console.log("create table");
                this.$bus.$emit('go-to', {'destination': 'TableTop'});
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
        background-image: url('../static/nebula/6.jpg');
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
        align-items: left;
        margin: 20px;
        color: #ee9554;
        background-color: #000;
    }

    #main a {
        color: #42b983;
        text-decoration: none;
    }

    .avatar {
        width: 100px;
        height: 100px
    }
</style>
