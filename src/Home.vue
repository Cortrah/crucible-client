<template>
    <div id="home">
        <div id="header" class="pure-menu pure-menu-horizontal pure-menu-scrollable">
            <a href="#" class="pure-menu-link pure-menu-heading" v-link="{ path: '/' }">
                Home
            </a>
            <ul class="pure-menu-list">
                <span v-if="!this.loggedIn">
                    <li class="pure-menu-item">
                        <a href="#" v-link="{ path: 'register' }" class="pure-menu-link">
                            Register
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" @click.prevent="gotoLogin()" class="pure-menu-link">
                            Sign In
                        </a>
                    </li>
                </span>
                <span v-else>
                    <li class="pure-menu-item">
                        <a href="#" @click.prevent="gotoLobby()" class="pure-menu-link">
                            Lobby
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" @click.prevent="gotoProfile()" class="pure-menu-link">
                            Profile
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" @click="logoutRequest()" class="pure-menu-link">
                            Sign Out
                        </a>
                    </li>
                </span>
            </ul>
        </div>
        <div id="stage">
            <router-view :store="store"></router-view>
        </div>
    </div>
</template>

<script type="text/babel">

    import Vue from 'vue'
    import Splash from './components/lobby/Splash'
    import Crucible from './components/stage/Crucible'

    let bus = new Vue();

    let store = new Vue({
        data () {
            return {
                bus: bus,
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
                players: [
                    {
                        'name': 'Jim',
                        'dealer': true,
                        'host': false,
                        'avatar': 'static/dog1.png',
                        'bones': 100,
                        'betting': 60
                    },
                    {
                        'name': 'Whitey',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/robot1.png',
                        'bones': 200,
                        'betting': 0
                    },
                    {
                        'name': 'Dan',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/dog2.png',
                        'bones': 300,
                        'betting': 0
                    },
                    {
                        'name': 'Kyle',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/dog3.png',
                        'bones': 400,
                        'betting': 0
                    },
                    {
                        'name': 'Bob',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/robot2.png',
                        'bones': 100,
                        'betting': 0
                    },
                    {
                        'name': 'Cort',
                        'dealer': false,
                        'host': true,
                        'avatar': 'static/robot3.png',
                        'bones': 200,
                        'betting': 0
                    }
                ],
                tables: [],
                messages: []
            };
        },
        methods: {
            createTable (tableName) {
                let t = new DealersChoiceTable();
                t.name = tableName;
                this.tables.push(t);
            },
            // logout () {
            //     this.loggedIn = false;
            //     this.bus.$emit('logout-event');
            // }
        }
    });

    export default {
        name: 'Home',
        http: {
            root: 'http://localhost:8080/'
        },
        created () {
            this.bus.$on('login-request', this.loginRequest);
            this.bus.$on('login-result', this.loginResult);
            this.bus.$on('logout-request', this.logoutRequest);
            this.bus.$on('logout-result', this.logoutResult);
            this.bus.$on('get-accounts-request', this.getAccounts);
        },
        data () {
            return {
                bus: bus,
                store: store,
                loggedIn: false,
                loginInfo: {},
                destination: ''
            }
        },
        components: {
            Splash
        },
        methods: {
            loginRequest: function (formData) {
                this.$http.post('/hapi/api/login', {
                    username: formData.username,
                    password: formData.password
                }).then(
                    (response) => {
                        this.loginInfo = response.body;
                        this.store.bus.$emit('login-result');
                    }, (error) => {
                        console.log(error);
                        // perhaps give a nice error message and customize login page
                        // for now go to splash just to mark that a change has happened
                        this.gotoSplash();
                    });
            },
            loginResult: function () {
                this.loggedIn = true;
                this.gotoLobby();
            },
            logoutRequest: function () {
                this.$http.delete('/hapi/api/logout', {
                    headers: {
                        username: this.loginInfo.session._id,
                        password: this.loginInfo.session.key,
                        authorization: this.loginInfo.authHeader,
                    }
                }).then(
                    (response) => {
                        this.store.bus.$emit('logout-result');
                    }, (error) => {
                        // either retry or emit logout-result regardless
                        // and let the server side session timeout?
                        console.log(error);
                        this.store.bus.$emit('logout-result');
                    });
            },
            logoutResult: function () {
                this.loginInfo = {};
                this.loggedIn = false;
                this.gotoSplash();
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
                        this.gotoSplash();
                    });
            },
            gotoLogin: function () {
                let elem = document.getElementById('stage');
                this.destination = 'login';
                window.TweenMax.to(elem, 0.5,
                    {height: 350, onComplete: this.nav});
            },
            gotoSplash: function () {
                let elem = document.getElementById('stage');
                this.destination = 'home';
                window.TweenMax.to(elem, 0.5,
                    {height: 300, onComplete: this.nav});
            },
            gotoProfile: function () {
                // this.$children;
                let elem = document.getElementById('stage');
                this.destination = 'profile';
                window.TweenMax.to(elem, 0.5,
                    {height: 400, width: 600, onComplete: this.nav});
            },
            gotoLobby: function () {
                // this.$children;
                let elem = document.getElementById('stage');
                this.destination = 'lobby';
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.nav});
            },
            gotoTabletop: function () {
                // this.$children;
                let elem = document.getElementById('stage');
                this.destination = 'tabletop';
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.nav});
            },
            nav: function () {
                this.$router.push('/' + this.destination);
            }
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
