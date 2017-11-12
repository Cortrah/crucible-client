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

    export default {
        data () {
            return {
                userName: '',
                title: 'Register'
            }
        },
        methods: {
            createAccount: function () {
                let formData = {
                    username: this.email,
                    password: this.pwd,
                    authHeader: '',
                    sessionId: '',
                    sessionKey: '',
                };
                this.$bus.$emit('register-request', formData);
            }
        }
    }
</script>
