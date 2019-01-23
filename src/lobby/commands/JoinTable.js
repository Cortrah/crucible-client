import Command from "../../main/Command";

// tables (and games)
//      'list-tables' => tables
//      'create-table' rules numActors => table (&commands)
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
