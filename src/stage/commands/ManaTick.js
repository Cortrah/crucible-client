'use strict';

const Command = require("../../main/Command");

module.exports = class ManaTick extends Command {

    constructor(stage, data) {
        super('mana-tick', stage, data);
    }

    doAction() {
        // let store = this.stage.store;
        // store.actors.forEach(function(actor){
        //     if(actor.maxMana < 10){
        //         actor.maxMana++;
        //     }
        //     if(actor.mana < actor.maxMana){
        //         actor.mana++;
        //     }
        //     if(actor.deck.length <= 0 && actor.cards.length === 0 && actor.isActive){
        //         // bleeding out damage
        //         actor.health--;
        //     }
        // });
        return 'ok'
    }
};
