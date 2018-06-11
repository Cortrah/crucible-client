'use strict';

const Command = require("../../main/Command");

module.exports = class StartGame extends Command {

    constructor(stage, data) {
        super('start-game', stage, data);
    }

    doAction(stage, data) {
        console.log("start-game doAction");
        console.log(this.stage);
        console.log(this.data);
        let store = stage.store;
        if(typeof store !== 'undefined'){
            store.gameIntervalId = setInterval(stage.gameTick, store.rules.gameTickInterval, stage, data);
            store.manaIntervalId = setInterval(stage.manaTick, store.rules.manaTickInterval, stage, data);
            // shuffle each actors deck
            store.actors.forEach(function(actor){
                let remaining = actor.deck.length;
                let randomIndex;
                let last;
                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = actor.deck[remaining];
                    actor.deck[remaining] = actor.deck[randomIndex];
                    actor.deck[randomIndex] = last;
                }
            });
            store.status = "PLAYING";
            store.timeStarted = Date.now();
            store.timeRunning = 0;
        }
        return "ok"
    }
};
