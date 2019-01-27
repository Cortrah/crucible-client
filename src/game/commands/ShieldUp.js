import Command from "../../main/Command";

export default class ShieldUp extends Command {

    constructor(data) {
        super('ShieldUp', data);
    }

    do(store){
        let sourceActor = store.actors[this.data.shield.sourceId];
        let targetActor = store.actors[this.data.shield.targetId];
        if(store.status === "PLAYING") {
            this.data.shield.isUp = true;
        }
        return 'ok'
    }
};
