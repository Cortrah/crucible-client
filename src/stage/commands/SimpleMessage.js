'use strict';

const Command = require("../../main/Command");

module.exports = class SimpleMessage extends Command {

    constructor(stage, data) {
        super('simple-message', stage, data);
    }

    doAction(stage, data) {
        console.log("simple message")
        console.log(this.stage)
        console.log(this.data)
        console.log(stage)
        console.log(data)
        return 'ok'

    }
};
