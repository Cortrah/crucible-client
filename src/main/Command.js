'use strict';

module.exports = class Command {

    constructor(name, stage, data) {
        console.log("Command constructor")
        this.name = name;
        this.stage = stage; // has bus and store
        this.data = data;
    };

    dispatch() {
        console.log("Command distpatching");
        console.log(this.name);
        console.log(this.stage);
        console.log(this.data);
        this.stage.que.dispatchEvent(this.name, this.stage, this.data);
    }
};
