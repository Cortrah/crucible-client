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

                // ToDo: get profile from last saved in localstore if its there
                let profile = new Profile();


                let user = new User({
                    email: this.email,
                    password: this.pwd,
                    profile: profile,
                });


                this.$store.dispatch({
                        type: "onDispatch",
                        command: new SignIn(user)
                    }
                ).then(
                    result => {
                        this.$bus.$emit('onDispatch', new Goto("Lobby"))
                        return result;
                    }
                ).catch(
                    error => {
                        this.$bus.$emit('onDispatch', new Goto("Home"))
                        throw error;
                    }
                );
            }
        }
    }
</script>
