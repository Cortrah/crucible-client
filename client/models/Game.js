import Actor from './Actor'

export default class Game {

    constructor() {
        this.id = '0';
        this.title = 'Waypoint Crucible Game 1';
        this.status = "PREPARING";
        this.winner = "";
        this.actors = [
            new Actor( '0', "Grammarbot", "Bad Guys", "AI", "../static/robot1.png"),
            new Actor( '1', "Protobot", "Bad Guys", "AI", "../static/robot2.png"),
            new Actor( '2', "General Scum", "Bad Guys", "AI", "../static/general_scum.png"),
            new Actor( '3', "Streambot", "Bad Guys", "AI", "../static/robot3.png"),
            new Actor( '4', "Lambdabot", "Bad Guys", "AI", "../static/robot4.png"),
            new Actor( '5', "Phoebe", "Good Guys", "AI", "../static/dog2.png"),
            new Actor( '6', "Mina", "Good Guys", "AI", "../static/dog1.png"),
            new Actor( '7', "Admiral Hope", "Good Guys", "actor7", "../static/admiral_hope.png"),
            new Actor( '8', "Lucy", "Good Guys", "AI", "../static/dog3.png"),
            new Actor( '9', "Max", "Good Guys", "AI", "../static/dog4.png"),
        ];
        this.mistles = [];
        this.timeRunning = 0;
        this.timeStarted = 0;
    }
}
