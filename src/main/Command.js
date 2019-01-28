export default class Command {

    constructor(name, data) {
        this.name = name;
        this.data = data;
    };

    // actions
    async onDispatch(context, action) {
        return await context.commit('do', {action: action, results: null});
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        console.log('in command payload');
        console.log(payload);
        // console.log(payload.action);
        // console.log(payload.results);
        // console.log(this.data);

        // by default return the state
        return state;
    }
};
