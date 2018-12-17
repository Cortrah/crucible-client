import Command from "../../../main/Command";

export default class CreateTable extends Command {

    constructor(data) {
        super('CreateTable', data);
    }

    do(store){
        this.$store.dispatch({ type: 'createTable', data});
        this.$bus.$emit('goto-stage');
    }
};
