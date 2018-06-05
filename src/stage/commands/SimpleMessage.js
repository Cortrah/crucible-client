'use strict';

const Command = require("../../main/Command");

module.exports = class SimpleMessage extends Command {

    constructor(stage, data) {
        super('simple-message', stage, data);
    }

    doAction(stage, data) {
        return 'ok'
    }
};
