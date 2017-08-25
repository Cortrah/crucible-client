# Waypoint Crucible

> A simple kata extended into a multiplayer realtime card game with vue and hapi

## Build Setup

``` bash
# install dependencies
npm install

# serve the client with hot reload at localhost:8080
npm run dev

# run the server in a second command window at localhost:5000
node server.js

# visit the lobby to create a match at
localhost:5000/lobby

```

## V1
- [x] Fix Structure
- [X] Error checking
    - [X] before deducting health
    - [X] limit to 5 cards
    - [X] that the player has the mana to target
- [X] highlight selected card
- [X] deselect other cards on highlight
- [X] create a layer for mistles
- [X] have a mistle go from one player to the other when launched
- [X] only target enemies with mistles
- [X] tween the mistles flight a bit
- [X] simple ai for a single player game
- [X] mark players as out when at 0 health
- [X] stop actions when player is out
- [X] announce a winner at the end
- [X] have players bleed out when out of cards
- [X] move to veux
- [X] maintain a list of commands
- [X] playback a list of commands
- [X] retrofit to be a single player game with ai or manual input
- [X] fix id/s and structures so we can target any player
- [ ] lobby (but don't need persistence yet)
    - [ ] login 
    - [ ] show lobby (can be hardcoded to start)
    - [ ] chose avatar in profile
    - [ ] create tabletop (also determines host)
    - [ ] join tabletop
    - [ ] choose a side
    - [ ] host starts game
    - [ ] ai takes over remaining slots
- [X] choose
	- [X] hapi nes apollo graphql backend
		- [ ] implement choice
	- [ ] spring appolo-android and akka backend
	- [ ] phoenix GenStage and absynthe backend
- [ ] set up vue-test-utils and start testing single player client
- [ ] add lab tests for server
- [ ] animate health, mana and deck counters
- [ ] tooltips for text details of health mana and deck counters
- [ ] have mistles dissapear or become damage after detonating
- [ ] create a little explosion
- [ ] larger mistles for larger values (grow as they come?)
- [ ] launch sound
- [ ] avatar images
- [ ] card images

## V2
- [X] add shields
    - [ ] enemies/mistles
    - [ ] allies shields
- [ ] launch sounds
- [ ] explosions
- [ ] larger mistles
- [ ] larger shields
- [ ] ships with avatars
- [ ] lobby login/registration persistence
- [ ] Other Audio

## More npm commands

``` bash
# build the client for production with minification
npm run build

# build the client for production and view the bundle analyzer report
npm run build --report

# run client unit tests
npm run unit

# run client e2e tests
npm run e2e

# run all client tests
npm test
```
