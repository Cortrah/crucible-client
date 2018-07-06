'use strict';

const Command = require("../../main/Command");

module.exports = class SubOne extends Command {

    constructor(stage, data) {
        super('sub-one', stage, data);
    }

    async doAction() {
        await console.log("SubOne doAction")
        let store = this.stage.store;
        if(typeof store !== 'undefined'){
            store.timeRunning--;
        }
        return "ok"
    }
};
