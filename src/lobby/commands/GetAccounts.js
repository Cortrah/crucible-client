import Command from "../../main/Command";
import Session from "../Session";

export default class GetAccounts extends Command {

    constructor(data) {
        super('GetAccounts', data);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            this.$http.get('/hapi/api/accounts', {
                headers: {
                    username: this.loginInfo.session._id,
                    password: this.loginInfo.session.key,
                    authorization: this.loginInfo.authHeader,
                }
            }).then( response => {
                this.$bus.$emit('goto-lobby');
            }, error => {
                this.gotoHome();
            });
        } else {
            // just fake it
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
