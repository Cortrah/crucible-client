'use strict';

const Command = require("../../main/Command");

module.exports = class SimpleMessage extends Command {

    constructor(data) {
        super('SimpleMessage', data);
    }

    async do(state){
        return 'ok'
    }
};
