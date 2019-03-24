<template>
    <div id="stage">
        <form class="pure-form pure-form-stacked">
            <fieldset>
                <h1>{{ title }}</h1>

                <label for="email">Email</label>
                <input id="email" type="email" placeholder="Email">

                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Password">
                <br/>

                <button @click="createAccount()"
                        class="pure-button pure-button-primary">
                    Create my account
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script type="text/babel">
    import Register from "../commands/Register";
    import SignIn from '../commands/SignIn';
    import User from '../domain/User';
    import Goto from '../../main/Goto';

    export default {
        name: 'register',
        data () {
            return {
                email: '',
                title: 'Register'
            }
        },
        methods: {
            createAccount: function () {

                // create a user object (with a session and a profile and send it to the register command)
                let user = new User({
                    email: this.email,
                    password: this.pwd,
                });

                this.$store.dispatch({
                        type: "onDispatch",
                        command: new Register(user)
                    }
                ).then(
                    result => {
                        this.$store.dispatch({
                            type: 'onDispatch',
                            command: new SignIn(this.$store.user)
                        })
                    }
                ).then(
                    result => {
                        this.$store.dispatch({
                            type: 'onDispatch',
                            command: new Goto({destination: "Profile"})
                        })
                    }
                ).catch(
                    error => {
                        this.$store.dispatch({
                            type: 'onDispatch',
                            command: new Goto({destination: "Home"})
                        })
                    }
                );
            }
        }
    }
</script>
