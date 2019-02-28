import Command from "../../main/Command";
import User from '../domain/User';

// Server 'sign-in' email, password => user:{email, password, session, profile}
export default class SignIn extends Command {

    constructor(data) {
        super('SignIn', data);
    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            // action.command.data will be constructor data of the command
            // in this case a user with a session, a profile and the username and password
            this.$http.post('login', action.command.data)
                .then( response => {
                    context.commit('do', response.body);
                }, error => {
                    throw error;
                });
        } else {
            // just use the fake session
            return await context.commit('do', {action: action, results: action.command.data});
        }
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);
        state.user = new User(payload.results);
        state.user.session.signedIn = true
        return state;
    }
};
