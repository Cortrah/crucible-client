'use strict';

const Command = require("../../main/Command");

module.exports = class TargetActor extends Command {

    constructor(stage, data) {
        super('target-actor', stage, data);
    }

    doAction() {
        let store = this.stage.store;
        let data = this.data;
        let sourceActor = store.actors[data.sourceId];
        let targetActor = store.actors[data.targetId];
        let card = sourceActor.cards[data.cardIndex];
        if(sourceActor.mana >= card.cardValue){
            sourceActor.mana -= card.cardValue;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                store.mistles.push(card);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(card);
            }
        }
        return 'ok'
    }
};
