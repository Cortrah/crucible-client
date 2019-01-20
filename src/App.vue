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
    import Goto from "./stage/commands/Goto";

    import StartGame from './stage/commands/game/StartGame';
    import DrawMistle from './stage/commands/game/DrawMistle';
    import DrawShield from './stage/commands/game/DrawShield';
    import SelectCard from './stage/commands/game/SelectCard';
    import TargetActor from './stage/commands/game/TargetActor';
    import GameTick from './stage/commands/game/GameTick';
    import ManaTick from './stage/commands/game/ManaTick';
    import MistleImpact from './stage/commands/game/MistleImpact';
    import ShieldUp from './stage/commands/game/ShieldUp';
    import EndGame from './stage/commands/game/EndGame';

    // -----------------------------------
    // local, mostly navigation events
    // -----------------------------------
    let navigationEvents = [
        'goto-home',
        'goto-sign-in', 'goto-register', 'goto-forgot',
        'goto-profile', 'goto-lobby', 'goto-host', 'goto-stage',
    ];

    // -------------------------------------------------------------
    // remote rest based account creation and lobby management
    // accounts (and sessions)
    //      'register' user:{email,password,session,profile} => user:{email, password, _session_, profile}
    //      'sign-in' email, password => user:{email, password, _session_, profile}
    //
    // profiles
    //      'update-profile'
    //
    // tables (and games)
    //      'list-tables' => tables
    //      'create-table' rules numActors => table (&game)
    //
    // 'forgot-password' email
    // 'sign-out-user'
    // -------------------------------------------------------------
    let lobbyEvents = [
        'register', 'sign-in',
        'update-profile', 'get-accounts',
        'create-table',
        'sign-out',
    ];

    // ------------------------------------------------------------
    // nes websocket src events for players
    // 'join-table' playerId tableId => table.game
    // 'sit-at-table' playerId slotId
    // 'stand-from-table' playerId slotId => actor
    //
    // host only
    // 'start-game' table.game
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
    // handled at the game and actor levels
    // -----------------------
    // let gameEvents = [
    //     'start-game',
    //     'draw-mistle','draw-shield',
    //     'select-card','target-actor'
    // ];

    // -----------------------
    // nes websocket always server initiated
    // -----------------------
    // 'mana-tick',
    // 'game-tick',
    // 'mistle-impact',
    // 'shield-up',
    // 'end-game'

   export default Vue.extend( {
        name: 'App',

        http: {
            root: 'http://localhost:8080/'
        },

       data () {
            return {
                eventList: navigationEvents.concat(lobbyEvents, tableEvents, 'error'),
                serverIsRunning: false,
                signedIn: false,
                loginInfo: {},
                eventData: {}
            }
        },

       created() {
           this.$bus.$on('onDispatch',
               command => {
                   return this.$store.dispatch(
                       {
                           type: "onDispatch",
                           command: command
                       }
                   ).then(
                       result => {
                           console.log(result);
                           // this.$toasted({
                           //     type: 'success',
                           //     text: command.name + " was victorious: " + result,
                           //     position: 'bottom-right',
                           //     duration: 2000,
                           // });
                       }
                   ).catch(
                       error => {
                           console.log(error);
                           // this.$toasted({
                           //     type: 'error',
                           //     text: command.name + ' errored: ' + error,
                           //     position: 'bottom-right',
                           //     duration: 0,
                           // });
                       }
                   );
               }
           );
       },

       beforeDestroy () {
           this.$bus.$off('onDispatch');
       },

       methods: {
           signOutRequest: function() {
           },

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
