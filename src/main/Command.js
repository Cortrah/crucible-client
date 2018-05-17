'use strict';

module.exports = class Command {

    constructor(name, stage, data) {
        this.name = name;
        this.stage = stage; // has bus and store
        this.data = data;
    };

    dispatch() {
        this.stage.bus.dispatchEvent(this.name, this.data);
    }
};
