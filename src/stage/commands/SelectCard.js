'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(actorId) {
        super('select-card');
        this.data = {
            actorId: actorId || 40
        };
    }

    doAction() {
        let store = this.stage.store;
        let data = this.data;
        let actor = store.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
        return 'ok'
    }
};
