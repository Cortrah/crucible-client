export default class Rules {

    constructor() {
        this.maxMana = 10;
        this.maxHealth = 30;
        this.startingDeck = [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8];
        this.startingHandSize = 0;
        this.maxCards = 5;
        this.manaGrowthInterval = 1000;
        this.manaReplentishInterval = 1000;
        this.drawInterval = 1000;
        this.fireInterval = 500;
        this.bleedoutInterval = 1000;
        this.flightTime = 4000;
        this.shieldsUpTime = 1000;
        this.shieldDecayRate = 1000;
    }
}
