import Command from "../../main/Command";

export default class StandFromTable extends Command {

    constructor(data) {
        super('StandFromTable', data);
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);
        return state;
    }

};
