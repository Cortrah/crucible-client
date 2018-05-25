'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(stage, data) {
        super('select-card', stage, data);
    }

    doAction() {
        // let store = this.stage.store;
        // let data = this.data;
        // if(typeof data !== 'undefined') {
        //     let actor = store.actors[data.actorId];
        //     if (typeof actor != 'undefined') {
        //         actor.selectedCardIndex = data.cardIndex;
        //     }
        // }
        return 'ok'
    }
};
