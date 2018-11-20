'use strict';

const Command = require("../../main/Command");

module.exports = class AddSome extends Command {

    constructor(data) {
        super('AddSome', data);
    }

    async do(store){
        store.counter = Number(store.counter) + Number(this.data.amt);
    }
};
