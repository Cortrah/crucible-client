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

const AddSome = require('./commands/AddSome');
const SubSome = require('./commands/SubSome');

export default class Game {

    constructor(options) {
        console.log("Game constructor called");
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
                gameTickInterval: 500,
                manaGrowthInterval: 1000,
                manaReplentishInterval: 1000,
                drawInterval: 1000,
                fireInterval: 500,
                bleedoutInterval: 1000,
                flightTime: 4000,
                shieldsUpTime: 1000,
                shieldDecayRate: 1000
            },
            counter: 0,
            actorCount:10,
            actors:[],
            mistles:[],
            shields:[],
            gameIntervalId: null,
            manaIntervalId: null,
            timeStarted: 0,
            timeRunning: 0,
        };

        // this.commands = [
        //     new StartGame(this),
        //     new DrawMistle(this), new DrawShield(this),
        //     new SelectCard(this), new TargetActor(this),
        //     new GameTick(this), new ManaTick(this),
        //     new MistleImpact(this), new ShieldUp(this),
        //     new EndGame(this)
        // ];
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
        let adda  = new AddSome(this, 1);
        let addb  = new AddSome(this, 2);
        let addc  = new AddSome(this, 3);
        let addd  = new AddSome(this, 1);

        let suba  = new SubSome(this, 1);
        let subb  = new SubSome(this, 2);

        console.log('----------------');
        this.que.add(startCommand);
        this.que.add(adda);
        console.log(this.store.counter);
        this.que.add(addb);
        console.log(this.store.counter);
        this.que.add(addc);
        console.log(this.store.counter);
        this.que.add(suba);
        console.log(this.store.counter);
        this.que.add(addd);
        console.log(this.store.counter);
        this.que.add(subb);
        console.log(this.store.counter);
        console.log('----------------');
        this.que.play();

        console.log('===============');
        console.log(this.store.counter);
        console.log('===============');
    }

    startGame(stage, data){
        console.log("Game startGame");
        stage.store.gameIntervalId = setInterval(stage.gameTick, stage.store.rules.gameTickInterval, stage, data);
        stage.store.manaIntervalId = setInterval(stage.manaTick, stage.store.rules.manaTickInterval, stage, data);
    }

    gameTick(stage, data){
        console.log("Game gameTick");
        let gameTick = new GameTick(stage);
        stage.que.add(gameTick)
    }

    manaTick(stage, data){
        console.log("Game mana-tick")
    }
}
