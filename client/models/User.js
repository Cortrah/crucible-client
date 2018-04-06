let defaults = {
    email: this.email,
    password: this.pwd,
    userName: 'Mina',
    signedIn: false,

    authHeader: '',
    sessionId: '',
    sessionKey: '',

    botChecked: false,
    ipAddress: 'https://123.122.1.2',
    port: '8000',
    token:"umagumma",
    selDog: this.$store.state.dogAvatars[0].img,
    selBot: this.$store.state.botAvatars[0].img,
    dogs: this.$store.state.dogAvatars,
    bots: this.$store.state.botAvatars,
}

export default class User {

    constructor(options) {
        this.sessionData = {};
        this.profileData = {};
    }
}
