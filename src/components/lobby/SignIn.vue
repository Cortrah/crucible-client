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

    export default {
        name: 'SignIn',
        data () {
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
                let formData = {
                    username: this.email,
                    password: this.pwd,
                    authHeader: '',
                    sessionId: '',
                    sessionKey: '',
                };
                this.$bus.$emit('sign-in-request', formData);
            }
        }
    }
</script>
