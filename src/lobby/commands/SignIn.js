import Command from "../../main/Command";
import Session from '../domain/Session';
import Goto from '../../main/Goto';

// Server 'sign-in' email, password => user:{email, password, _session_, profile}
export default class SignIn extends Command {

    constructor(data) {
        super('SignIn', data);
    }

    // actions
    async onDispatch(context, action) {

        let session = new Session({
            user: new User({
                email: "joe cool",
                password: "magilicutty",
                _session_: server
            }),
            signedIn: true,
            loginInfo : null,
        });


        if (context.state.serverLive) {
            // action.command.data will be constructor data of the command
            this.$http.post('login', action.command.data)
                .then( response => {
                    context.state.session.loginInfo = response.body;
                    context.state.session.signedIn = true;
                    context.dispatch({
                            type: "onDispatch",
                            command: new Goto({destination: "Lobby"})
                        }
                    )
                }, error => {
                    // perhaps give a nice error message and customize login page
                    // for now go to Home just to mark that a change has happened
                    context.dispatch({
                            type: "onDispatch",
                            command: new Goto({destination: "Lobby"})
                        }
                    )
                });
        } else {
            // just use the fake session
            // context.dispatch({
            //         type: "onDispatch",
            //         command: new Goto({destination: "Lobby"})
            //     }
            // )
        }
        return await context.commit('do', { action: action, results: fakeSession});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        console.log('signin payload');
        console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);

        state.session.loginInfo = payload.results
        state.session.signedIn = true;

        return state;
    }
};
