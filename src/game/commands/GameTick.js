import Command from "../../main/Command";

export default class GameTick extends Command {

    constructor(data) {
        super('GameTick', data);
    }

    do(store){
        return 'ok'
    }
};
