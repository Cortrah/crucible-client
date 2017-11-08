<template>
    <div id="stage">
        <div class="home">
            <h1>{{ title }}</h1>
            <ul>
                <li>
                    <router-link to="Register">Register</router-link>
                </li>
                <li>
                    <router-link to="SignIn">SignIn</router-link>
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

    export default {
        name: 'Home',
        computed: {
            title () {
                return this.$store.state.game.title;
            }
        }
    }
</script>
