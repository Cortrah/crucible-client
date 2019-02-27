<template>
    <div id="stage">
        <form class="pure-form pure-form-stacked">
            <fieldset>
                <h1>{{ title }}</h1>

                <label for="email">
                    Email
                </label>
                <input id="email" v-model="email" type="email" placeholder="Email">

                <label for="password">
                    Password
                </label>
                <input id="password" v-model="pwd" type="password" placeholder="Password">

                <label for="remember" class="pure-checkbox">
                    <input id="remember" type="checkbox">
                    Remember me
                </label>
                <br/>

                <button @click.prevent="signIn()"
                        class="pure-button pure-button-primary">
                    Sign in
                </button>
                <router-link to="forgot">
                    forgot your password?
                </router-link>
                <br/>
                <br/>
            </fieldset>
        </form>

    </div>
</template>

<script type="text/babel">

    import {v4 as createUUId} from 'uuid';
    import Session from '../domain/Session';
    import User from '../domain/User';
    import Profile from '../domain/Profile';

    import Goto from '../../main/Goto';
    import SignIn from '../commands/SignIn';

    export default {
        name: 'sign-in',

        data () {
            // ToDo: possibly init from localstore with a remember me option
            return {
                title: 'Sign In',
                email: '',
                pwd: '',
                authHeader: '',
                sessionId: '',
                sessionKey: ''
            }
        },
        methods: {
            signIn: function () {
                // the session info will be filled in by the server
                let session = new Session({
                    signedIn: false,
                    authHeader: '',
                    sessionId: '',
                    sessionKey: '',
                })

                // ToDo: get profile from last saved in localstore if its there
                // for now just use defaults
                let profile = new Profile();

                // actorId is only instantiated when the player sits at a table
                let user = new User({
                    email: this.email,
                    password: this.pwd,
                    playerId: createUUId(),
                    actorId: null,
                    session: session,
                    profile: profile,
                });


                this.$store.dispatch({
                        type: "onDispatch",
                        command: new SignIn(user)
                    }
                ).then(
                    result => {
                        //console.log(result);
                        this.$bus.$emit('onDispatch', new Goto({destination: "Lobby"}))
                        return result;
                    }
                ).catch(
                    error => {
                        //console.log(error);
                        this.$bus.$emit('onDispatch', new Goto({destination: "Home"}))
                        throw error;
                    }
                );
            }
        }
    }
</script>
