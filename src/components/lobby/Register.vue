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
                        class="pure-button pure-button-primary">  Create my account  </button>

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
                // this.$children;
                // this.store.login();
                let elem = document.getElementById('stage');
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.go('profile')});
            },
            go: function (route) {
                this.$route.router.go('/' + route);
            }
        }
    }
</script>
