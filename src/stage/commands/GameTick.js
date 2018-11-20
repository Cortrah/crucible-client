'use strict';

const Command = require("../../main/Command");

module.exports = class GameTick extends Command {

    constructor(data) {
        super('GameTick', data);
    }

    async do(state){
        return 'ok'
    }
};
