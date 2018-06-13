'use strict';

const Command = require("../../main/Command");
const ManaTick = require("./ManaTick");

module.exports = class GameTick extends Command {

    constructor(stage, data) {
        super('game-tick', stage, data);
    }

    doAction(stage, data) {
        return 'ok'
    }
};
