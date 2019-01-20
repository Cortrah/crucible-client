import Command from "../../main/Command";

export default class Goto extends Command{

    constructor(data) {
        super('Goto', data);
    }

    // actions
    async onDispatch(context, action) {
        return await context.commit('do', {action: action, results: null});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);

        return this.data.router.push({name: this.data.destination});
    }
}

