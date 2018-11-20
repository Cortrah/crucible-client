'use strict';

const Command = require("../../main/Command");

module.exports = class AddSome extends Command {

    constructor(stage, data) {
        console.log("AddSome Constructor");
        console.log(stage);
        console.log(data);
        super('add-some', stage, data);
    }

    async doAction() {
        await console.log("AddSome doAction")
        console.log(this.data);
        let store = this.stage.store;
        if(typeof store !== 'undefined'){
            store.counter += this.data;
        }
        return "ok"
    }
};
