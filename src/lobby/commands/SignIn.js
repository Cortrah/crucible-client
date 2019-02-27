import Command from "../../main/Command";

// Server 'sign-in' email, password => user:{email, password, _session_, profile}
export default class SignIn extends Command {

    constructor(data) {
        //console.log("sign in command being constructed");
        super('SignIn', data);
    }

    // actions
    async onDispatch(context, action) {
        //console.log("signing in");

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
            console.log("faking it");
            return await context.commit('do', {action: action, results: action.command.data});
        }
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        //console.log('signin payload should be a user with some session data from server');
        //console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);

        state.user = payload;
        state.user.session.signedIn = true;

        return state;
    }
};
