let defaults = {
    botChecked: false,
    ipAddress: 'https://123.122.1.2',
    port: '8000',
    token:"umagumma",
    selDog: this.$store.state.dogAvatars[0].img,
    selBot: this.$store.state.botAvatars[0].img,
    dogs: this.$store.state.dogAvatars,
    bots: this.$store.state.botAvatars,
}

export default class Profile {

    constructor(options) {
    }
}
