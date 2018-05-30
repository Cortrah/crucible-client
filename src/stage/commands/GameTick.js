'use strict';

const Command = require("../../main/Command");

module.exports = class GameTick extends Command {

    constructor(stage, data) {
        super('game-tick', stage, data);
    }

    doAction(stage, data) {
        console.log('tick');
        return 'ok'
    }
};
