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
                           @click.prevent="navigate('Lobby')" >
                            Lobby
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="navigate('TableTop')">
                            Table Top
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="navigate('Profile')">
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
                           @click.prevent="navigate('Register')">
                            Register
                        </a>
                    </li>
                    <li class="pure-menu-item">
                        <a href="#" class="pure-menu-link"
                           @click.prevent="navigate('SignIn')">
                            Sign In
                        </a>
                    </li>
                </span>
            </ul>
        </div>
        <div id="router-view-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from "vue";
    import Goto from "./main/Goto";

    // ------------------------------------------------------------
    // nes websocket src events for players
    // 'join-table' playerId tableId => table.commands
    // 'sit-at-table' playerId slotId
    // 'stand-from-table' playerId slotId => actor
    //
    // host only
    // 'start-commands' table.commands
    //
    // server events for actors, src events for players
    // 'draw-mistle' gameId actorId
    // 'draw-shield' gameId  actorId
    // 'select-card' gameId  actorId cardIndex
    // 'target-actor' gameId  sourceId targetId cardIndex
    // ------------------------------------------------------------
    let tableEvents = [
        'join-table',
        'sit-at-table','stand-from-table',
    ];

    // -----------------------
    // handled at the commands and actor levels
    // -----------------------
    // let gameEvents = [
    //     'start-commands',
    //     'draw-mistle','draw-shield',
    //     'select-card','target-actor'
    // ];

    // -----------------------
    // nes websocket always server initiated
    // -----------------------
    // 'mana-tick',
    // 'commands-tick',
    // 'mistle-impact',
    // 'shield-up',
    // 'end-commands'

   export default Vue.extend( {
        name: 'App',

        http: {
            root: 'http://localhost:8080/'
        },

       created() {
           this.$bus.$on('onDispatch',
               command => {
                   return this.$store.dispatch({
                           type: "onDispatch",
                           command: command
                       }
                   ).then(
                       result => {
                           console.log(result);
                       }
                   ).catch(
                       error => {
                           console.log(error);
                       }
                   );
               }
           );
       },

       beforeDestroy () {
           this.$bus.$off('onDispatch');
       },

       methods: {
           navigate: function(destination){
               this.$bus.$emit('onDispatch', new Goto({destination: destination, router: this.$router}))
           }
       }

    })
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

    #router-view-container {
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
