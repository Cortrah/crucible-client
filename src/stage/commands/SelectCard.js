'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(stage, data) {
        super('select-card', stage, data);
    }

    doAction() {
        let store = this.stage.store;
        let data = this.data;
        let actor = store.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
        return 'ok'
    }
};
