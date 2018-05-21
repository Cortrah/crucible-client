'use strict';

const Command = require("../../main/Command");
const GameTick = require("./GameTick");

module.exports = class StartGame extends Command {

    constructor(stage, data) {
        super('start-game', stage, data);
    }

    doAction() {
        let store = this.stage.store;
        if(typeof this.stage.store !== 'undefined'){
            this.stage.store.gameIntervalId = setInterval(this.gameTick, this.stage.store.rules.gameTickInterval, this.stage);
            // shuffle each actors deck
            this.stage.store.actors.forEach(function(actor){
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
            this.stage.store.status = "PLAYING";
            this.stage.store.timeStarted = Date.now();
            this.stage.store.timeRunning = 0;
        }
        return 'ok'
    }

    gameTick(stage){
        new GameTick(stage).dispatch();
    }
};
