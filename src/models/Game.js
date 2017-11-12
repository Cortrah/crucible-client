import Player from '../models/Player'

export default class Game {

    constructor() {
        this.id = '0';
        this.title = 'Waypoint Crucible';
        this.status = "PREPARING";
        this.winner = "";
        this.players = [
            new Player( '0', "Grammarbot", "Bad Guys", "AI", "../static/robot1.png"),
            new Player( '1', "Protobot", "Bad Guys", "AI", "../static/robot2.png"),
            new Player( '2', "General Scum", "Bad Guys", "AI", "../static/general_scum.png"),
            new Player( '3', "Streambot", "Bad Guys", "AI", "../static/robot3.png"),
            new Player( '4', "Lambdabot", "Bad Guys", "AI", "../static/robot4.png"),
            new Player( '5', "Phoebe", "Good Guys", "AI", "../static/dog2.png"),
            new Player( '6', "Mina", "Good Guys", "AI", "../static/dog1.png"),
            new Player( '7', "Admiral Hope", "Good Guys", "player7", "../static/admiral_hope.png"),
            new Player( '8', "Lucy", "Good Guys", "AI", "../static/dog3.png"),
            new Player( '9', "Max", "Good Guys", "AI", "../static/dog4.png"),
        ];
        this.mistles = [];
        this.timeRunning = 0;
        this.timeStarted = 0;
    }
}
