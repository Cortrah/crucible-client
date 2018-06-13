'use strict';

const Command = require("../../main/Command");

module.exports = class StartGame extends Command {

    constructor(stage, data) {
        super('start-game', stage, data);
    }

    doAction() {
        let store = this.stage.store;
        if(typeof store !== 'undefined'){
            store.gameIntervalId = setInterval(this.stage.gameTick, store.rules.gameTickInterval, this.stage, this.data);
            store.manaIntervalId = setInterval(this.stage.manaTick, store.rules.manaTickInterval, this.stage, this.data);
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
