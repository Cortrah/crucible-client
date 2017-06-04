# stageground

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

This is using a vue-cli starter see the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

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
- [ ] retrofit to be a single player client that just receives events (see crucible comments for details)
- [ ] lobby
    - [ ] login (don't need registration/validation yet)
    - [ ] show lobby (can be hardcoded to start)
    - [ ] chose avatar in profile
    - [ ] create tabletop (also determines host)
    - [ ] join tabletop
    - [ ] choose a side
    - [ ] host starts game
    - [ ] ai takes over remaining slots
- [ ] phoenix backend
    - [ ] spec messages
    - [ ] fix id/s and structures
    - [ ] split pseudo server and have only one player per client
- [ ] animate health, mana and deck counters
- [ ] tooltips for text details of health mana and deck counters
- [ ] have mistles dissapear or become damage after detonating
- [ ] create a little explosion
- [ ] larger mistles for larger values (grow as they come?)
- [ ] launch sound
- [ ] avatar images
- [ ] card images

## V2
- [ ] add shields
    - [ ] enemies/mistles
    - [ ] allies shields
- [ ] launch sounds
- [ ] explosions
- [ ] larger mistles
- [ ] larger shields
- [ ] ships with avatars
- [ ] login/registration
- [ ] Other Audio
