'use strict';

import Actor from './Actor'

const UUID = require('uuid');
const Bus = require('../main/Bus');

const StartGame = require('./commands/StartGame');
const DrawMistle = require('./commands/DrawMistle');
const DrawShield = require('./commands/DrawShield');
const SelectCard = require('./commands/SelectCard');
const TargetActor = require('./commands/TargetActor');
const GameTick = require('./commands/GameTick');
const ManaTick = require('./commands/ManaTick');
const MistleImpact = require('./commands/MistleImpact');
const ShieldUp = require('./commands/ShieldUp');
const EndGame = require('./commands/EndGame');

export default class Game {

    constructor(options) {
        this.id = UUID.v4();
        this.bus = new Bus();
        this.store = {
            name:'Waypoint Crucible Game X',
            status:'PREPARING',
            winner:'',
            rules: {
                maxMana: 10,
                maxHealth: 30,
                startingDeck: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8],
                startingHandSize: 0,
                maxCards: 5,
                gameTickInterval: 1000,
                manaGrowthInterval: 1000,
                manaReplentishInterval: 1000,
                drawInterval: 1000,
                fireInterval: 500,
                bleedoutInterval: 1000,
                flightTime: 4000,
                shieldsUpTime: 1000,
                shieldDecayRate: 1000
            },
            actorCount:10,
            actors:[],
            mistles:[],
            shields:[],
            gameIntervalId: null,
            manaIntervalId: null,
            timeStarted: 0,
            timeRunning: 0,
        };

        this.commands = [
            new StartGame(this),
            new DrawMistle(this), new DrawShield(this),
            new SelectCard(this), new TargetActor(this),
            new GameTick(this),
            new ManaTick(this),
            new MistleImpact(this), new ShieldUp(this),
            new EndGame(this)
        ];

        let _scope = this;
        // init actors
        for (let index = 0; index < _scope.store.actorCount; index++) {
            const randomIndex = Math.round(Math.random() * 4);
            let avatarImg = '../static/robot' + randomIndex + '.png';
            let team = "Bad Guys";
            if (index >= _scope.store.actorCount / 2) {
                team = 'Good Guys';
            }
            let actorOptions = {
                team: team,
                avatarImg: avatarImg,
            };
            let newActor = new Actor(index, _scope, actorOptions);
            _scope.store.actors.push(newActor);
        }
        this.commands.forEach(command => {
            _scope.bus.registerEvent(command.name);
            _scope.bus.addEventListener(command.name, command.doAction);
        });
    }

    gameTick(stage, data){
        let gtick = new GameTick(stage, data).dispatch();
        let mtick = new ManaTick(stage, data).dispatch();

        stage.store.actors.forEach(actor => {
            actor.gameTick(stage, {index: actor.index});
        })
    }
}
