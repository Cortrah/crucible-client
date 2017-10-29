<template>
    <div id="stage">
        <div class="splash">
            <h1>{{ title }}</h1>
            <ul>
                <li>
                    <router-link to="Register">Register</router-link>
                </li>
                <li>
                    <router-link to="Login">Login</router-link>
                </li>
                <li>
                    <router-link to="Forgot">Forgot</router-link>
                </li>
                <li>
                    <router-link to="Profile">Profile</router-link>
                </li>
                <li>
                    <router-link to="Lobby">Lobby</router-link>
                </li>
                <li>
                    <router-link to="TableTop">TableTop</router-link>
                </li>
                <li>
                    <router-link to="Crucible">Crucible</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">

    import Vue from 'vue'
    import store from '../../store/store.js'

    export default {
        name: 'Splash',
        computed: {
            title () {
                return this.$store.state.game.title;
            }
        }
    }
</script>
