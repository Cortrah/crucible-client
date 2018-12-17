'use strict';
import Command from "../../../main/Command";

export default class SelectCard extends Command {

    constructor(data) {
        super('SelectCard', data);
    }

    do(store){
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
