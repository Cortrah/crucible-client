'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(data) {
        super('SelectCard', data);
    }

    async do(store){
        let data = this.data;
        if(typeof data !== 'undefined') {
            let actor = store.actors[data.actorId];
            if (typeof actor != 'undefined') {
                actor.selectedCardIndex = data.cardIndex;
            }
        }
        return 'ok'
    }
};
