import Command from "../../main/Command";

export default class SitAtTable extends Command {

    constructor(data) {
        super('SitAtTable', data);
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);
        return state;
    }

};
