import Command from "../../main/Command";
import Goto from "../../main/Goto";
import User from '../domain/User';


// Register command
// takes a user domain object as it's constructor data
// creates an account on the server
// sets the local user to it
// Server 'register' user:{email,password,session,profile} => user:{email, password, _session_, profile}
export default class Register extends Command {

    constructor(data) {
        super('Register', data);
    }

    // actions
    async onDispatch(context, action) {
        if(context.state.serverLive) {
            // action.command.data will be constructor data of the command
            await this.$http.post('/hapi/api/accounts', action.command.data).then(
                response => {
                    return context.commit('do', { action: action, results: response.body});
                }, error => {
                    // perhaps give a nice error message and customize register page
                    // for now go to splash just to mark that a change has happened
                });
        } else {
            // just fake it
            return await context.commit('do', { action: action, results: action.command.data });
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
        return state;
    }
};
