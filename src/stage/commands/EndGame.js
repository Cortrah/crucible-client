'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(stage, data) {
        super('end-game');
    }

    doAction() {
        let store = this.stage.store;
        store.status = "OVER";
        return 'ok'
    }
};
