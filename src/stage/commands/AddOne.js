'use strict';

const Command = require("../../main/Command");

module.exports = class AddOne extends Command {

    constructor(stage, data) {
        super('add-one', stage, data);
    }

    async doAction() {
        await console.log("AddOne doAction")
        let store = this.stage.store;
        if(typeof store !== 'undefined'){
            store.timeRunning++;
        }
        return "ok"
    }
};
