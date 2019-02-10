let defaultGame = {
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
    actorCount:10,
    actors:[],
    mistles:[],
    shields:[],
    gameIntervalId: null,
    manaIntervalId: null,
    timeStarted: 0,
    timeRunning: 0,
}

export default class Game {

    constructor(name) {
        this.name = name;
    }

    drawMistle() {
        // let myself = this.commands.actors[this.user.playerId];
        // if(myself.isActive && this.commands.status === "PLAYING"){
        //     if(myself.cards.length < 5 && myself.deckSize > 0){
        //         this.$bus.$emit("draw-mistle", this.user.playerId);
        //         //this.$store.dispatch({ type: 'drawMistle', actorId: actorId});
        //     }
        // }
    }

    drawShield() {
        // let myself = this.commands.actors[this.user.playerId];
        // if(myself.isActive && this.commands.status === "PLAYING"){
        //     if(myself.cards.length < 5 && myself.deckSize > 0) {
        //         this.$bus.$emit("draw-shield", this.user.playerId);
        //         //this.$store.dispatch({ type: 'drawShield', actorId: actorId});
        //     }
        // }
    }

    selectCard(card, cardIndex) {
        // let myself = this.commands.actors[this.user.playerId];
        // if(myself.isActive && this.commands.status === "PLAYING"){
        //     this.$bus.$emit("select-card", this.user.playerId, cardIndex);
        //     //this.$store.dispatch({ type: 'selectCard', actorId:actorId, cardIndex:cardIndex});
        // }
    }

    targetActor(targetId) {
        // if no store.user.actorId == null and commands.status === "Preparing"
        // then we are setting a slot to a player instead of a bot
        // (if there is an actorId there should be a way to leave a spot by setting it back to null)
        // if ((this.user.playerId == null) && (this.commands.status === "Preparing")){
        //     this.$bus.$emit("sit-at-table", targetId);
        // }
        //
        // let myself = this.commands.actors[this.user.playerId];
        // let cardIndex = myself.selectedCardIndex;
        // if(myself.isActive && this.commands.status === "PLAYING"){
        //     this.$bus.$emit("target-actor", this.user.playerId, targetId, cardIndex);
        // this.$store.dispatch({
        //     type: 'targetActor',
        //     sourceId:sourceId,
        //     targetId:targetId,
        //     cardIndex:cardIndex
        // });
        // }
    }
};
