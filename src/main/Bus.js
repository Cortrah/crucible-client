'use strict';

const Event = require('./Event');

module.exports = class Bus {

    constructor(){
        this.events = {};
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
            console.log(this)
        }
    };
};
