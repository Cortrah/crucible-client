'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(data) {
        super('EndGame', data);
    }

    async do(store){
        store.status = "OVER";
        return 'ok'
    }
};
