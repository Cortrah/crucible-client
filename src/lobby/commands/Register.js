import Command from "../../main/Command";
import Goto from "../../main/Goto";

// Server 'register' user:{email,password,session,profile} => user:{email, password, _session_, profile}
export default class Register extends Command {

    constructor(data) {
        super('Register', data);
    }

    // actions
    async onDispatch(context, action) {

        if(context.state.serverLive) {
            // action.command.data will be constructor data of the command
            this.$http.post('/hapi/api/accounts', action.command.data).then(
                response => {
                    context.state.user.session = response.body;
                    context.state.user.session.signedIn = true;
                    context.dispatch({type:'onDispatch', command: new Goto({destination: 'Profile'})})
                }, error => {
                    // perhaps give a nice error message and customize login page
                    // for now go to splash just to mark that a change has happened
                    context.dispatch({type:'onDispatch', command: new Goto({destination: 'Home'})})
                });
        } else {
            // just fake it
            context.state.user.session.signedIn = true;
            context.dispatch({type:'onDispatch', command: new Goto({destination: 'Profile'})})
        }

        return await context.commit('do', {action: action, results: null});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);
        state.user = new User(payload.results);
        return state;
    }
};
