import Command from "../../main/Command";
import Session from "../Session";

export default class SignOut extends Command {

    constructor(data) {
        super('SignOut', data);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
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
        }
        return await context.commit('do', {action: action, results: response.body});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);
        return state;
    }

};
