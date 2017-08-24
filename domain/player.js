'use strict';

const Ai = require('./ai');

const uuid = require('uuid');

module.exports = class Player {

    constructor( name = '', ip = 'http://pumpkin.local', port = "4000") {

        this.id = uuid.v4();
        this.name = name;
        this.ip = ip;
        this.port = port;
        this.wins = 0;
        this.losses = 0;
        this.ai = new Ai();
    }
};
