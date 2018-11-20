'use strict';

const Command = require("../../main/Command");

module.exports = class DrawMistle extends Command {

    constructor(data) {
        super('DrawMistle', data);
    }

    async do(state){
        let store = this.stage.store;
        let data = this.data;
        if(data != undefined ){
            let actor = store.actors[data.actorId];
        }
        if(typeof actor != 'undefined' && actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"MISTLE", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
        return 'ok'
    }
};
