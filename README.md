# Waypoint Crucible

Implementing
http://codingdojo.org/kata/TradingCardGame/

For
http://agnostechvalley.com/

## The Plan

Hapi and nes on the server side

Vue and SVG on the client side

Make it multiplayer

Add timing to the equation, you can attack in real time, but 

1) drawing a card takes one mana and is limited by a timed interval
2) mana replentishes over a timed interval (up to 10)
3) if a deck is empty, damage is done via a timer

The story is that there is an errant WayPoint Jumpgate that sucks in everyone, only one (team?) can leave.

If there is time create bots

If there is time after that create a team play scenario where dogs in space suits are under Admiral Hope
and robots are under General Scum.

Finally add shields, which would be in the form of a second button to draw from your deck, you can draw a mistle or a shield either way the number is the same but the card that results will be either offensive or defensive, the defensive shield would fade in strength after a certain timeout period, say a point per second.

The human players are the dogs and need to try to cooperate to defeat the ai bots which might have personalities or strategies or both. (A personality might be how frequently you change your strategy (or to what) based on how frustrated you are or by other semi-arbitrary things such as a lack of success or a sense of patterns, even smack talk?)

## status

For now it is a single player game with one player as admiral hope with 4 dog ai's vs general scum and his 4 bot ai's

At this point the ai's just choose a random opponent to fire at. I'd like to implement an interface for ai's so we can focus just on writing them.

## Build Setup

``` bash
# install dependencies
npm install

# serve the client with hot reload at localhost:8080
npm run dev

```

## To Play

run the app as above with 'npm run dev'

Click on Sign-In, sign in with the default user, click on 'Host a Table', then "Create Table"
 
You are now at your table 

Currently it's you and your 4 ai bot dogs vs General Scum(ai) and his 4 ai bot robots.

![A screenshot of the current state of the game, 10 postage stamp sized avatars and some dots for mistles](./design/five_vs_five.png?raw=true "Five on Five")

You are Admiral Hope, the manatee in the center of the bottom row, allied with the dogs.

Click 'Start Game' to start it. Players will start accumulating mana.

Click on 'Draw Mistle' to draw up to 5 mistles (You can draw shields, but you can't target pack buddies with them yet)

Click on a card to select it

Click on General Scum or one of his robots to target them, if you have the mana, you'll launch the mistle.

Last team standing will win.


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
- [X] remove command queue for now, just events are fine
- [X] fix routes
- [X] tweak bleeding out
- [X] lobby (but don't need persistence yet, just client side)
    - [X] login 
    - [X] show lobby (can be hardcoded to start)
    - [X] chose avatar in profile
    - [X] host tabletop
    - [X] join tabletop
    - [ ] choose a side
    - [X] host starts game
    - [X] ai takes over remaining slots
- [ ] spec server side interface
- [X] add shields
    - [X] enemies/mistles
    - [ ] allies shields
- [X] choose between hapi/nes, phoenix and akka
	- [X] hapi nes backend
		- [ ] configure basics
		- [ ] login adds a player to the list of players (no registration or persistence yet)
		- [ ] let a player host a game and choose a side
		- [ ] let another player join a game
		- [ ] propagate the game events
		- [ ] CORS
		- [ ] CSRF
		- [ ] registration of persistent accounts
		- [ ] emails and reset
	- [ ] java akka backend
	- [ ] phoenix GenStage backend
- [ ] set up vue-test-utils and start testing single player client
- [ ] add lab tests for server
- [ ] add some ai bot strategies
- [ ] add the ability to change ai bot strategies of your allies from the field while playing
- [ ] animate health, mana and deck counters
- [ ] tooltips for text details of health mana and deck counters
- [ ] have mistles dissapear or become damage after detonating
- [ ] create a little explosion
- [ ] larger mistles for larger values (grow as they come?)
- [ ] launch sound
- [ ] avatar images
- [ ] card images

## V2
- [ ] launch sounds
- [ ] explosions
- [ ] mistles grow to match size as they fly
- [ ] larger shields
- [ ] ships with avatars
- [ ] lobby login/registration persistence
- [ ] Other Audio

## V3
- [ ] Change group combat to one on one on one (3 max at one time)
- [ ] Create nicer ships with some variety
- [ ] Create a map of locations that the ships can navigate ala Faster Than Light
- [ ] create a surrounding vortex that forces the ships closer and closer to the center

## Technical Experiments

Event bus vs veux actions vs commands

Unifying router with events and veux actions

Have transitions determine their layouts via knowledge of both the vues and the viewport ala media queries
