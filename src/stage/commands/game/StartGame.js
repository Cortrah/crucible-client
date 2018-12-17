import Command from "../../../main/Command";

export default class StartGame extends Command {

    constructor(data) {
        super('StartGame', data);
    }

    do(store){
        if(typeof store !== 'undefined'){
            // init 10 actors: 5 'Good Guys', 5 'Bad Guys'
            for (let index = 0; index < store.actorCount; index++) {
                const randomIndex = Math.round(Math.random() * 4);
                let avatarImg = '../static/robot' + randomIndex + '.png';
                let team = "Bad Guys";
                if (index >= store.actorCount / 2) {
                    team = 'Good Guys';
                }
                let actorOptions = {
                    team: team,
                    avatarImg: avatarImg,
                };
                let newActor = new Actor(index, this, actorOptions);
                store.actors.push(newActor);
            }

            // shuffle each actors deck
            store.actors.forEach(function(actor){
                let remaining = actor.deck.length;
                let randomIndex;
                let last;
                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = actor.deck[remaining];
                    actor.deck[remaining] = actor.deck[randomIndex];
                    actor.deck[randomIndex] = last;
                }
            });
            store.status = "PLAYING";
            store.timeStarted = Date.now();
            store.timeRunning = 0;
        }
        return "ok"
    }
};
