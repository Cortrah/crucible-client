<template>
    <div id="main">
        <div id="header" class="pure-menu pure-menu-horizontal pure-menu-scrollable">
            <a href="#" class="pure-menu-link pure-menu-heading">
                Main
            </a>
            <ul class="pure-menu-list">
                <span v-if="!this.loggedIn">
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link">
                            Register
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" @click.prevent="gotoSignIn()" class="pure-menu-link">
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
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/babel">

    import Vue from 'vue'
    import Home from './components/lobby/Home'
    import Crucible from './components/stage/Crucible'

    let bus = new Vue();

    export default {
        name: 'Main',
        http: {
            root: 'http://localhost:8080/'
        },
        created () {
            this.bus.$on('sign-in-request', this.signInRequest);
            this.bus.$on('sign-in-result', this.signInResult);
            this.bus.$on('sign-out-request', this.signOutRequest);
            this.bus.$on('sign-out-result', this.signOutResult);
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
            Home
        },
        methods: {
            signInRequest: function (formData) {
                this.$http.post('/hapi/api/login', {
                    username: formData.username,
                    password: formData.password
                }).then(
                    (response) => {
                        this.loginInfo = response.body;
                        this.store.bus.$emit('sign-in-result');
                    }, (error) => {
                        console.log(error);
                        // perhaps give a nice error message and customize login page
                        // for now go to splash just to mark that a change has happened
                        this.gotoHome();
                    });
            },
            signInResult: function () {
                this.loggedIn = true;
                this.gotoLobby();
            },
            signOutRequest: function () {
                this.$http.delete('/hapi/api/logout', {
                    headers: {
                        username: this.loginInfo.session._id,
                        password: this.loginInfo.session.key,
                        authorization: this.loginInfo.authHeader,
                    }
                }).then(
                    (response) => {
                        this.store.bus.$emit('sign-out-result');
                    }, (error) => {
                        // either retry or emit logout-result regardless
                        // and let the server side session timeout?
                        console.log(error);
                        this.store.bus.$emit('sign-out-result');
                    });
            },
            signOutResult: function () {
                this.loginInfo = {};
                this.loggedIn = false;
                this.gotoHome();
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
            gotoSignIn: function () {
                let elem = document.getElementById('stage');
                this.destination = 'sign-in';
                window.TweenMax.to(elem, 0.5,
                    {height: 350, onComplete: this.nav});
            },
            gotoHome: function () {
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
                this.destination = 'table-top';
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
