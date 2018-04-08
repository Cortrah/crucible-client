import Actor from './Actor'

export default class Game {

    constructor() {
        this.id = '0';
        this.title = 'Waypoint Crucible Game 1';
        this.status = "PREPARING";
        this.winner = "";
        this.rules = {
            maxMana:10,
            maxHealth:30,
            startingDeck:[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
            startingHandSize:0,
            maxCards:5,
            manaGrowthInterval:1000,
            manaReplentishInterval:1000,
            drawInterval:1000,
            fireInterval:500,
            bleedoutInterval:1000,
            flightTime:4000,
            shieldsUpTime:1000,
            shieldDecayRate:1000,
        }
        this.actorCount = 10;
        this.slots = [];
        for(let i = 0; i < this.actorCount; i++){
            if (i < this.actorCount/2){
                this.slots.push(new Actor({id:i, team:"Bad Guys"}));
            } else {
                this.slots.push(new Actor({id:i, team:"Good Guys"}));
            }
        }
        this.mistles = [];
        this.shields = [];
        this.timeStarted = 0;
        this.timeRunning = 0;
    }
}
