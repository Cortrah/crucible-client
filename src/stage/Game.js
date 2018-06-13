'use strict';

import Actor from './Actor'
import Queue from '../main/Queue'

const UUID = require('uuid');

const StartGame = require('./commands/StartGame');
const GameTick = require('./commands/GameTick');
const ManaTick = require('./commands/ManaTick');

const DrawMistle = require('./commands/DrawMistle');
const DrawShield = require('./commands/DrawShield');
const SelectCard = require('./commands/SelectCard');
const TargetActor = require('./commands/TargetActor');
const MistleImpact = require('./commands/MistleImpact');
const ShieldUp = require('./commands/ShieldUp');
const EndGame = require('./commands/EndGame');

export default class Game {

    constructor(options) {
        this.id = UUID.v4();
        this.que = new Queue();

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
                gameTickInterval: 300,
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
            new GameTick(this), new ManaTick(this),
            new MistleImpact(this), new ShieldUp(this),
            new EndGame(this)
        ];
        //let _scope = this;
        //this.commands.forEach(command => {
        //    _scope.bus.addEventListener('start-game', _scope.startGame);
        //});
        this.que.addEventListener('start-game', this.startGame);
        this.que.addEventListener('game-tick', this.gameTick);
        this.que.addEventListener('mana-tick', this.manaTick);

        // init 10 actors: 5 'Good Guys', 5 'Bad Guys'
        for (let index = 0; index < this.store.actorCount; index++) {
            const randomIndex = Math.round(Math.random() * 4);
            let avatarImg = '../static/robot' + randomIndex + '.png';
            let team = "Bad Guys";
            if (index >= this.store.actorCount / 2) {
                team = 'Good Guys';
            }
            let actorOptions = {
                team: team,
                avatarImg: avatarImg,
            };
            let newActor = new Actor(index, this, actorOptions);
            this.store.actors.push(newActor);
        }

        let startCommand = new StartGame(this);
        this.que.add(startCommand);
    }

    startGame(stage, data){
        console.log("Game start-game")
        store.gameIntervalId = setInterval(this.gameTick, this.store.rules.gameTickInterval, this, data);
        store.manaIntervalId = setInterval(this.manaTick, this.store.rules.manaTickInterval, this, data);
    }

    gameTick(stage, data){
        console.log("Game game-tick")
        let gameTickCommand = new GameTick(stage, data);
        this.que.add(gameTickCommand);
        this.que.dispatchEvent('game')
    }

    manaTick(stage, data){
        console.log("Game mana-tick")
        let manaTickCommand = new ManaTick(stage, data);
        this.que.add(manaTickCommand);
    }
}
