let defaults = {
    id: '',
    signedIn: false,
    authHeader: '',
    sessionKey: '',
}

export default class Session {

    constructor( options ) {

        if(options != null) {
            this.id = options.id || defaults.id;
            this.signedIn = options.signedIn || defaults.signedIn;
            this.authHeader = options.authHeader || defaults.authHeader;
            this.sessionKey = options.sessionKey || defaults.sessionKey;
        } else {
            Object.assign(this, defaults);
        }
    }

    signedIn(){
        this.signedIn = true;
    }
}
