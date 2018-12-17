import Command from "../../../main/Command";

export default class SignOut extends Command {

    constructor(data) {
        super('SignOut', data);
    }

    do(store){
        if (this.serverIsRunning) {
            this.$http.delete('/hapi/api/logout', {
                headers: {
                    username: this.loginInfo.session._id,
                    password: this.loginInfo.session.key,
                    authorization: this.loginInfo.authHeader,
                }
            }).then( response => {
                this.loginInfo = {};
                this.signedIn = false;
                this.$bus.$emit('goto-home');
            }, error => {
                // either retry or emit error message?
                // let the server side session timeout?
                this.loginInfo = {};
                this.signedIn = false;
                this.$bus.$emit('goto-home');
            });
        } else {
            // just fake it
            this.loginInfo = {};
            this.signedIn = false;
            this.$bus.$emit('goto-home');
        }
    }
};
