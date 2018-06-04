'use strict';

const Event = require('./Event');

module.exports = class Bus {

    constructor(){
        this.events = {};
    }

    registerEvent(eventName){
        console.log('Bus registerEvent ' + eventName );
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
        // console.log('Bus addEventListener');
        // console.log(this.events);
        // console.log(this.events[eventName]);
        if(this.events[eventName]){
            this.events[eventName].registerCallback(callback);
        } else {
            console.log(this)
        }
    };
};
