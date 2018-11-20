'use strict';

const Command = require("../../main/Command");

module.exports = class SubSome extends Command {

    constructor(stage, data) {
        super('sub-some', stage, data);
    }

    async doAction() {
        await console.log("SubSome doAction")
        console.log(this.data);
        let store = this.stage.store;
        if(typeof store !== 'undefined'){
            store.counter -= this.data;
        }
        return "ok"
    }
};
