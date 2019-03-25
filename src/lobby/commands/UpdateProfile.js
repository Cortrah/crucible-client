import Command from "../../main/Command";
import Session from "../domain/Session";
import Goto from "../../main/Goto";

export default class UpdateProfile extends Command {

    constructor(profile) {
        super('UpdateProfile', profile);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            this.$http.patch('/hapi/api/accounts', action.command.data).then(
                response => {
                    // ok?
                    return context.commit('do', {action: action, results: action.command.data});
                }, error => {
                    // perhaps give a nice error message
                });
        } else {
            // just fake it
            return context.commit('do', {action: action, results: action.command.data});
        }
    }

    // mutation
    do(state, payload) {
        // console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);
        let indexById = state.user.profiles.findIndex( profile => profile.id == profileId);
        state.user.profiles[indexById] = payload.results;
        return state;
    }
};
