'use strict';

const Command = require("../../main/Command");

module.exports = class ShieldUp extends Command {

    constructor(data) {
        super('ShieldUp', data);
    }

    async do(state){
        let store = this.stage.store;
        let sourceActor = store.actors[this.data.shield.sourceId];
        let targetActor = store.actors[this.data.shield.targetId];
        if(store.status === "PLAYING") {
            this.data.shield.isUp = true;
        }
        return 'ok'
    }
};
