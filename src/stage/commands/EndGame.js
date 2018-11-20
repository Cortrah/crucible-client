'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(data) {
        super('EndGame', data);
    }

    async do(state){
        let store = this.stage.store;
        store.status = "OVER";
        return 'ok'
    }
};
