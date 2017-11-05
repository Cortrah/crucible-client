export class Player {

    constructor(
        id = 0,
        name = "",
        team = "Bad Guys",
        controller = "AI",
        avatarImg =  "../static/default.png",
        maxMana = 0,
        mana = 0,
        maxHealth = 30,
        health = 30,
        shields = [],
        cards = [],
        selectedCardIndex = null,
        deck = [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
        deckSize = 20,
        drawEnabled = false,
        isbleedingOut = false,
        isActive = true
    ) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.controller = controller;
        this.avatarImg = avatarImg;
        this.maxMana = maxMana;
        this.mana = mana;
        this.maxHealth = maxHealth;
        this.health = health;
        this.shields = shields;
        this.cards = cards;
        this.selectedCardIndex = selectedCardIndex;
        this.deck = deck;
        this.deckSize = deckSize;
        this.drawEnabled = drawEnabled;
        this.isbleedingOut = isbleedingOut;
        this.isActive = isActive;
    }
}
