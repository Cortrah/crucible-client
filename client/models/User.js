let defaults = {
    email: this.email,
    password: this.pwd,
    userName: 'Mina',
    signedIn: false,
}

export default class User {

    constructor(options) {
        this.email = options.email;
        this.sessionData = {};
        this.profileData = {};
    }
}
