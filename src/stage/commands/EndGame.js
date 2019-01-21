import Command from "../../main/Command";

export default class EndGame extends Command {

    constructor(data) {
        super('EndGame', data);
    }

    do(store){
        store.status = "OVER";
        return 'ok'
    }
};
