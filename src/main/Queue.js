'use strict';

const Event = require('./Event');

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
            await command.doAction(command.stage, command.data)
            this.playhead++;
        }
       this.pause()
    }

    pause() {
        this.isRunning = false;
    }

    dispatchEvent(eventName, stage, data){
        if(this.events[eventName] != undefined){
            this.events[eventName].callbacks.forEach(function(callback){
                callback(stage, data);
            });
        }
    };

    addEventListener(eventName, callback){
        if(typeof this.events[eventName] === 'undefined'){
            this.events[eventName] = new Event(eventName);
            this.events[eventName].registerCallback(callback);
        } else {
            this.events[eventName].registerCallback(callback);
        }
    };
};
