import Command from "../../main/Command";

export default class SignOut extends Command {

    constructor(data) {
        super('SignOut', data);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            await this.$http.delete('/hapi/api/logout', {
                headers: {
                    username: action.command.data.session.id,
                    password: action.command.data.session.key,
                    authorization: action.command.data.session.authHeader,
                }
            }).then( response => {
                return context.commit('do', {action: action, results: response.body});
            }, error => {
                // either retry or emit error message?
                // let the server side session timeout?
                return context.commit('do', {action: action, results: null});
            });
        }
    }

    // mutation
    do(state, payload) {
        state.user.session.signedIn = false;
        return state;
    }
};
