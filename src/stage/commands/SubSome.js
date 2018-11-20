'use strict';

const Command = require("../../main/Command");

module.exports = class SubSome extends Command {

    constructor(stage, data) {
        super('sub-some', stage, data);
    }

    async do(store){
        if(typeof store !== 'undefined'){
            store.counter -= this.data;
        }
        return "ok"
    }
};
