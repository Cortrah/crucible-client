import Command from "./Command";

export default class Goto extends Command{

    constructor(data) {
        super('Goto', data);
    }

    // actions
    async onDispatch(context, action) {

        return await context.commit('do', {action: action, results: {action: action, results: "Gogo Gadgeteer"}});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        console.log('goto payload');
        console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);
        return state.appView.$router.push({name: this.data.destination});
    }
}

