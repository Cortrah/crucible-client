'use strict';

module.exports = class Queue {

    constructor (playHead = 0, commands = []) {
        this.events = {};
        this.playhead = playHead;
        this.commands = commands;
        this.isRunning = false;
    }

    add(command) {
        this.commands.push(command);
        this.play();
    }

    async play() {
        this.isRunning = true;
        while(this.isRunning && (this.playhead < this.commands.length)){
            let command = this.commands[this.playhead];
            await command.doAction(command.stage, command.data);
            this.dispatchEvent(command.name, command.stage, command.data);
            if(this.playhead < this.commands.length + 1) {
                this.playhead++;
            }
        }
        this.pause()
    }

    pause() {
        this.isRunning = false;
    }

    registerEvent(eventName){
        this.events[eventName] = event;
    };

    dispatchEvent(eventName, stage, data){
        if(this.events[eventName] != undefined){
            this.events[eventName].callbacks.forEach(function(callback){
                callback(stage, data);
            });
        }
    };

    addEventListener(eventName, callback){
        if(this.events[eventName]){
            this.events[eventName].registerCallback(callback);
        } else {
            //console.log(this)
        }
    };
};
