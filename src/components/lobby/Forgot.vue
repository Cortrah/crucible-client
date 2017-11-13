<template>
    <div id="stage">
        <form class="pure-form pure-form-stacked">
            <fieldset>
                <h1>{{ title }}</h1>
                <div v-if="sent">
                    <p>
                    If an account matched that address,
                    an email will be sent with instructions.
                    </p>
                </div>
                <div v-else>
                    <label for="email">What's your email?</label>
                    <input id="email" type="email" placeholder="Email">
                    <br/>
                    <button @click="reset()" class="pure-button pure-button-primary">
                        Send reset
                    </button>
                </div>

                <br/>
                <br/>
            </fieldset>
        </form>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'Forgot',
        data () {
            return {
                sent: false,
                title: 'Forgot your password?'
            }
        },
        methods: {
            reset: function () {
                this.sent = true;
            }
        }
    }
</script>
