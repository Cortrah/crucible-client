// for lobby
export const TABLE_CREATED = 'TABLE_CREATED';
export const PLAYER_JOINED = 'PLAYER_JOINED';
export const PLAYER_LEFT = 'PLAYER_LEFT';
export const PLAYER_TIMED_OUT = 'PLAYER_TIMED_OUT';
export const PLAYER_RECONNECTED = 'PLAYER_RECONNECTED';

// for game
export const GAME_STARTED = 'GAME_STARTED';
export const MANA_TICK = 'MANA_TICK';
export const DREW_MISTLE = 'DREW_MISTLE';
export const DREW_SHIELD = 'DREW_SHIELD';
export const SELECTED_CARD = 'SELECTED_CARD';
export const TARGETED_PLAYER = 'TARGETED_PLAYER';
export const MISTLE_IMPACTED = 'MISTLE_IMPACTED';
export const PLAYER_OUT = 'PLAYER_OUT';
export const GAME_ENDED = 'GAME_ENDED';

/*
tableCreated, {
    tableState: {
        title,
        axisName,
        aliesName,
        host {playerId}
        rules: {
            "maxMana": 10,
            "maxHealth": 30,
            "startingDeck": [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
            "startingHandSize": 0,
            "maxCards":5,
            "flightTime": 4000,
            "manaGrowthInterval":1000,
            "manaReplentishInterval":1000,
            "drawInterval":1000,
            "fireInterval":500,
            "bleedoutInterval":1000,
            "shieldDecayInterval": 1000
        },
        state: {
            "status": "JOINING",
            "winner": "",
            "tableEvents":[],
            "gameEvents":[],
            "players":{
            }
        }
    }
    // tableEvents
    playerJoined {
        publicPlayerState{
            "id":9,
            "name":"Max",
            "team":"Good Guys",
            "avatarImg": "../static/dog4.png",
            "maxMana":0,
            "mana":0,
            "maxHealth":30,
            "health":30,
            "shields":[],
            "cards":[],
            "selectedCardIndex":null,
            "deckSize:20,
                "drawEnabled":false,
    "isbleedingOut":false,
    "isActive":true
}
playerLeft { playerId }
playerTimedOut { playerId }
playerReConnected { playerId }

// gameEvents
gameStarted timeStamp
manaTick timeStamp
drewMistle playerId, card
drewShield playerId, card
selectedCard playerId, card
targetedPlayer sourceId, targetId
mistleImpacted, sourcePlayer, targetPlayer, mistle
playerOut playerId
gameEnded winnerName
*/
