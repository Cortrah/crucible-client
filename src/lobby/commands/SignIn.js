import Command from "../../main/Command";
import Session from '../Session';

export default class AddSome extends Command {

    constructor(data) {
        super('SignIn', data);
    }

    async gotoLobby(context, action){

    }

    async gotoHome(context, action){

    }

    // actions
    async onDispatch(context, action) {
        if (context.state.serverLive) {
            this.$http.post('login', payload)
                .then( response => {
                    state.session.loginInfo = response.body;
                    state.session.signedIn = true;
                    this.$bus.$emit('onDispatch', new Goto({destination: "Lobby"}));
                }, error => {
                    // perhaps give a nice error message and customize login page
                    // for now go to Home just to mark that a change has happened
                    this.$bus.$emit('onDispatch', new Goto({destination: "Home"}));
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
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);

        state.session.loginInfo = payload.results
        state.session.signedIn = true;

        return state;
    }
};
