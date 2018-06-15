'use strict';

const Command = require("../../main/Command");

module.exports = class GameTick extends Command {

    constructor(stage, data) {
        super('game-tick', stage, data);
    }

    async doAction(stage, data) {
        return 'ok'
    }
};
