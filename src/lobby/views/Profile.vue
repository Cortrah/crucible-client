<template>
    <div id="stage">
        <form class="pure-form pure-form-stacked">
        <fieldset>

            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-3">
                    <h1>Profile</h1>

                    <label for="email">
                        Email
                    </label>
                    <input id="email"
                           type="email"
                           v-model="this.model.email"
                           placeholder="Email">

                    <label for="password">
                        Password
                    </label>
                    <input id="password"
                           type="password"
                           v-model="this.model.password"
                           placeholder="Password">

                    <label for="userName">
                        Username
                    </label>
                    <input id="userName"
                           v-model="this.model.name"
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
                                   v-model="this.model.botChecked">
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
                           placeholder="https://123.122.1.2"
                           v-model="this.model.ipAddress"/>
                    <label for="port">
                        Port
                    </label>
                    <input id="port"
                           type="text"
                           placeholder=":8080"
                            v-model="this.model.port"/>
                    <label for="token">
                        Token
                    </label>
                    <input id="token"
                           type="text"
                           placeholder="umaguma"
                           v-model="this.model.token"/>
                </div>
                <button @click="saveChanges()"
                        class="pure-button pure-button-primary">
                    Save Changes
                </button>
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
    import Profile from '../domain/Profile.js'
    import Goto from '../../main/Goto';
    import UpdateProfile from '../commands/UpdateProfile';

    export default {

        name: 'profile',
        data () {
            return {
                model: new Profile(),
                dogs: this.$store.state.dogAvatars,
                bots: this.$store.state.botAvatars,
            }
        },
        methods: {
            gotoLobby: function () {
                this.$bus.$emit('onDispatch', new Goto({destination: "Lobby"}));
            },
            saveChanges: function () {
                this.$bus.$emit('onDispatch', new UpdateProfile(this.model));
            },
        }
    }
</script>
