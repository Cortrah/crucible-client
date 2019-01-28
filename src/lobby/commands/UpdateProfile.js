import Command from "../../main/Command";
import Session from "../domain/Session";

export default class UpdateProfile extends Command {

    constructor(data) {
        super('UpdateProfile', data);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            this.$http.patch('/hapi/api/accounts', formData).then(
                response => {
                    // ok?
                }, error => {
                    // perhaps give a nice error message
                });
        } else {
            // just fake it
            state.session = new Session({
                signedIn: true,
                loginInfo : null,
            });
            this.$bus.$emit('onDispatch', new Goto({destination: 'Lobby'}));
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
