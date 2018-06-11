'use strict';

module.exports = class Queue {

    constructor (playHead = 0, commands = []) {
        this.playhead = playHead;
        this.commands = commands;
        this.isRunning = false;
    }

    add(command) {
        console.log('adding');
        console.log(command);
        this.commands.push(command);
    }

   play(stage, data) {
        this.isRunning = true;
        while(this.isRunning && (this.playhead < this.commands.length)){
            console.log(this.commands);
            let command = this.commands[this.playhead];
            command.doAction(stage, data)
            if(this.playhead < this.commands.length + 1) {
                this.playhead++;
            }
        }
    }

    pause() {
        this.isRunning = false;
    }
};
