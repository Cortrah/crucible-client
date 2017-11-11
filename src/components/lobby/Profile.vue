<template>
    <div id="stage">
        <form class="pure-form pure-form-stacked">
        <fieldset>

            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-3">
                    <h1>{{ title }}</h1>

                    <label for="email">
                        Email
                    </label>
                    <input id="email"
                           type="email"
                           placeholder="Email">

                    <label for="password">
                        Password
                    </label>
                    <input id="password"
                           type="password"
                           placeholder="Password">

                    <label for="userName">
                        Username
                    </label>
                    <input id="userName"
                           v-model="userName"
                           type="text"
                           placeholder="Mina"/>
                </div>

                <div class="pure-u-1 pure-u-md-1-3">
                     <div v-if="!botChecked" >
                         <img class="avatar"
                              :src="selDog"/>
                         <select v-model="selDog">
                             <option v-for="dog in dogs"
                                     :value="dog.img">
                                 {{ dog.name }}
                             </option>
                         </select>
                     </div>
                    <div>
                        <label for="checkbox" >
                            <input id="checkbox"
                                   type="checkbox"
                                   v-model="botChecked">
                            Or use a Bot
                        </label>
                    </div>
                </div>

                <div v-if="botChecked" class="pure-u-1 pure-u-md-1-3">
                    <img class="avatar"
                         :src="selBot"/>
                    <select v-model="selBot">
                        <option v-for="bot in bots"
                                :value="bot.img">
                            {{ bot.name }}
                        </option>
                    </select>
                    <label for="ipAddress">
                        Ip Address
                    </label>
                    <input id="ipAddress"
                           type="text"
                           placeholder="https://123.122.1.2"/>
                    <label for="port">
                        Port
                    </label>
                    <input id="port"
                           type="text"
                           placeholder=":8080"/>
                </div>

                <button @click="gotoLobby()"
                        class="pure-button pure-button-primary">
                    Goto the Lobby
                </button>
            </div>

        </fieldset>
    </form>
  </div>
</template>

<script type="text/babel">

    export default {
        name: 'Profile',
        data () {
            return {
                title: 'Profile',
                userName: 'Mina',
                botChecked: false,
                selDog: this.$store.state.dogAvatars[0].img,
                selBot: this.$store.state.botAvatars[0].img,
                dogs: this.$store.state.dogAvatars,
                bots: this.$store.state.botAvatars,
            }
        },
        methods: {
            gotoLobby: function () {
                this.$bus.$emit('go-to', {'destination': 'Lobby'});
            },
        }
    }
</script>
