'use strict';

const Event = require('./Event');

module.exports = class Bus {

    constructor(){
        this.events = {};
    }

    registerEvent(eventName){
        let event = new Event(eventName);
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
        this.events[eventName].registerCallback(callback);
    };
};
