import Command from "../../main/Command";

// tables (and games)
//      'list-tables' => tables
//      'create-table' rules numActors => table (&commands)
export default class CreateTable extends Command {

    constructor(data) {
        super('CreateTable', data);
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);

        // create the table
        // goto stage

        return state;
    }
};
