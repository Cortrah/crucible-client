import Command from "../../main/Command";

export default class JoinTable extends Command {

    constructor(data) {
        super('JoinTable', data);
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);
        return state;
    }
};
