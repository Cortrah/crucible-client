import Session from './Session';
import Profile from './Profile';
import Actor from './Actor';

let defaults = {
    email: '',
    password: '',
}

export default class User {

    constructor( options ) {

        let session = new Session();
        let profile = new Profile();
        let actor = new Actor();

        if(options != null) {
            this.email = options.email || defaults.email;
            this.password = options.password || defaults.password;
            this.session = options.session ? new Session(options.session) : session;
            this.profile = options.profile ? new Profile(options.profile) : profile;
            this.actor = options.actor ? new Actor(options.actor) : actor;
        } else {
            Object.assign(this, defaults);
            this.session = session;
            this.profile = profile;
            this.actor = actor;
        }
    }
}
