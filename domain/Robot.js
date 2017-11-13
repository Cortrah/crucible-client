'use strict';

const uuid = require('uuid');

module.exports = class Robot {

    constructor() {
        this.id = uuid.v4();

    }
};
