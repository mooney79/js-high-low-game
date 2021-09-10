/*>>>>>>>>>>  INSTRUCTIONS <<<<<<<<<<<<<<
The goal is to be the first player to win all 52 cards

THE DEAL
The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, 
face down. Anyone may deal first. Each player places their stack of cards face down, 
in front of them.

THE PLAY
Each player turns up a card at the same time, and the player with the higher card takes 
both cards and puts them, face down, on the bottom of his stack.

If the cards are the same rank, it is War. Each player places three cards face down and 
one card face up. The player with the higher card takes both piles (ten cards). If the turned-up 
cards are again the same rank, each player places another three cards face down and turns another 
card face up. The player with the higher card takes all 18 cards, and so on.

HOW TO KEEP SCORE
The game ends when one player has won all the cards.

REQUIREMENTS
You must have a constructor for Game, Player, Deck, and Card
You must attach methods to the prototype chain
You must create a basic UI that includes a draw button and message box that informs the game status 
after each turn
*/

"use strict"

//>>>>>>>>> CONSTRUCTORS <<<<<<<<<<

function Game(){

};

function Deck(suit1=[], suit2=[], suit3=[], suit4=[]){
    let cardList = [...suit1, ...suit2,...suit3, ...suit4];
    return cardList;
};
//What if INSTEAD, I merged the suits into cardList, as above and shuffled them out to each player,
// THEN imported those two new arrays(decks) into Deck?
/*
function Deck(arr) {
    // Then what?  What do I DO with it now?
    // Wait.. can I ... shit... thought, come back!
    // Can I use Deck AS the sort?  No, not if I want to end up with two decks from one shuffle.  Right?
    //
}





function shuffle (target1, target2){
    while (startingDeck.length > 0) {
      let myCard = pickACard();
      target1.push(startingDeck[myCard]);
      startingDeck.splice(myCard, 1);
      myCard = pickACard();
      target2.push(startingDeck[myCard]);
      startingDeck.splice(myCard, 1);
    }
};

testing something...*/
/*
const deckList = [{name: "8 of hearts", value: 8}, {name: "3 of clubs", value: 3}, {name: "10 of diamonds", value: 10}, {name: "jack of hearts", value: 11}];
function Deck([{name, value}]){
    this.name = name;
    this.value = value;
};
for (let i=0;i < deckList.length; i++) {
   newDeck[i] = new Deck(deckList[i]);
}
console.log(newDeck);
*/
/*This returns an empty object.
newDeck = new Deck(deckList);

Am I using Card for Deck's intended purpose?

for (let i=2; i < 15; i++){
    hearts[i-2] = new Card({name: 'Hearts', value: i})
};

Should I use something like this to fill up Deck?


Okay.  So if I did something like...

for loop to create cards (nested?  One for suit, one for value) INSIDE the deck function?
for (i=0; i < 3; i++){
    for (j=2; j <14; j++){
        thing = new Card(i,j)
    }
}

Then what?  Can I re-write my switch statement to rename all them cards?  I really don't want them to be
visible to the user as {i:0, j:12}, no matter how convenient that might be.

*/

function Player({name, score=0}){
    this.name = name;
    this.score = score;
};
function Card({name, value}){
    this.name = name;
    this.value = value;
};

//>>>>>>>>>>>> Prototype Methods <<<<<<<<<<<<<<

/*  Is returning array making my new Deck objects not constructors anymore?

Deck.prototype.shuffle = function (target1, target2){
    while (this.length > 0) {
      let myCard = pickACard();
      target1.push(this[myCard]);
      this.splice(myCard, 1);
      myCard = pickACard();
      target2.push(this[myCard]);
      this.splice(myCard, 1);
    }
};
*/


//>>>>>>>>>>> Global Variables <<<<<<<<<<<

let hearts = [];
let diamonds = [];
let spades = [];
let clubs = [];

//>>>>>>>>>>>> DOM Elements <<<<<<<<<<<<<<<<

let $descPane = document.querySelector(".description");

//>>>>>>>>>>> Instantiating Cards <<<<<<<<<<

for (let i=2; i < 15; i++){
    hearts[i-2] = new Card({name: 'Hearts', value: i})
};

for (let i=2; i < 15; i++){
    diamonds[i-2] = new Card({name: 'Diamonds', value: i})
};

for (let i=2; i < 15; i++){
    spades[i-2] = new Card({name: 'Spades', value: i})
};

for (let i=2; i < 15; i++){
    clubs[i-2] = new Card({name: 'Clubs', value: i})
};

//>>>>>>>>>>> Clean up Card Names <<<<<<<<<<<<<<<<

for (let i=0; i < 13; i++){
    switch (i) {
        case 0: clubs[i].name = "Two of Clubs";
            diamonds[i].name = "Two of Diamonds";
            hearts[i].name = "Two of Hearts";
            spades[i].name = "Two of Spades";
            break;
        case 1: clubs[i].name = "Three of Clubs";
            diamonds[i].name = "Three of Diamonds";
            hearts[i].name = "Three of Hearts";
            spades[i].name = "Three of Spades";
            break;
        case 2: clubs[i].name = "Four of Clubs";
            diamonds[i].name = "Four of Diamonds";
            hearts[i].name = "Four of Hearts";
            spades[i].name = "Four of Spades";
            break;
        case 3: clubs[i].name = "Five of Clubs";
            diamonds[i].name = "Five of Diamonds";
            hearts[i].name = "Five of Hearts";
            spades[i].name = "Five of Spades";
            break;
        case 4: clubs[i].name = "Six of Clubs";
            diamonds[i].name = "Six of Diamonds";
            hearts[i].name = "Six of Hearts";
            spades[i].name = "Six of Spades";
            break;
        case 5: clubs[i].name = "Seven of Clubs";
            diamonds[i].name = "Seven of Diamonds";
            hearts[i].name = "Seven of Hearts";
            spades[i].name = "Seven of Spades";
            break;
        case 6: clubs[i].name = "Eight of Clubs";
            diamonds[i].name = "Eight of Diamonds";
            hearts[i].name = "Eight of Hearts";
            spades[i].name = "Eight of Spades";
            break;
        case 7: clubs[i].name = "Nine of Clubs";
            diamonds[i].name = "Nine of Diamonds";
            hearts[i].name = "Nine of Hearts";
            spades[i].name = "Nine of Spades";
            break;
        case 8: clubs[i].name = "Ten of Clubs";
            diamonds[i].name = "Ten of Diamonds";
            hearts[i].name = "Ten of Hearts";
            spades[i].name = "Ten of Spades";
            break;
        case 9: clubs[i].name = "Jack of Clubs";
            diamonds[i].name = "Jack of Diamonds";
            hearts[i].name = "Jack of Hearts";
            spades[i].name = "Jack of Spades";
            break;
        case 10: clubs[i].name = "Queen of Clubs";
            diamonds[i].name = "Queen of Diamonds";
            hearts[i].name = "Queen of Hearts";
            spades[i].name = "Queenof Spades";
            break;
        case 11: clubs[i].name = "King of Clubs";
            diamonds[i].name = "King of Diamonds";
            hearts[i].name = "King of Hearts";
            spades[i].name = "King of Spades";
            break;
        case 12: clubs[i].name = "Ace of Clubs";
            diamonds[i].name = "Ace of Diamonds";
            hearts[i].name = "Ace of Hearts";
            spades[i].name = "Ace of Spades";
            break;
    }
}

//>>>>>>>> Create Initial Decks <<<<<<<<<<<<<<<<<<

let startingDeck = new Deck(hearts, clubs, diamonds, spades);
let playerOneDeck = new Deck();
let playerTwoDeck = new Deck();
shuffle(playerOneDeck, playerTwoDeck);


//>>>>>>>>>>> Random Card Function <<<<<<<<<<<<<<<<<<<<<<
function pickACard(){//randomly determines a number to act as index
    return Math.floor(Math.random() * startingDeck.length);
}

//>>>>>>>>>>> Shuffle cards into starting Decks <<<<<<<<
function shuffle (target1, target2){
    while (startingDeck.length > 0) {
      let myCard = pickACard();
      target1.push(startingDeck[myCard]);
      startingDeck.splice(myCard, 1);
      myCard = pickACard();
      target2.push(startingDeck[myCard]);
      startingDeck.splice(myCard, 1);
    }
};


//>>>>>>>>>> Messy Code <<<<<<<<<<<<<
console.log(playerOneDeck);
console.log(playerTwoDeck);
/*



const playerOne = new Player({name: 'John', score: 0,});
Player.prototype.updateCardCount = function(){
   //add gained cards to bottom of deck, update each player's count.
   //This may be two (or more) functions. Maybe also should go on Game?
   //dunno
}

const deckList = 
    [{name: "Ace of Spades", value: 14}, {name: "Ace of Diamonds", value: 14}, 
    {name: "Ace of Hearts", value: 14}, {name: "Ace of Clubs", value: 14},
    {name: "King of Spades", value: 13}, {name: "King of Diamonds", value: 13}, 
    {name: "King of Hearts", value: 13}, {name: "King of Clubs", value: 13},
    {name: "Queen of Spades", value: 12}, {name: "Queen of Diamonds", value: 12}, 
    {name: "Queen of Hearts", value: 12}, {name: "Queen of Clubs", value: 12},
    {name: "Jack of Spades", value: 11}, {name: "Jack of Diamonds", value: 11}, 
    {name: "Jack of Hearts", value: 11}, {name: "Jack of Clubs", value: 11},
    {name: "Ten of Spades", value: 10}, {name: "Ten of Diamonds", value: 10}, 
    {name: "Ten of Hearts", value: 10}, {name: "Ten of Clubs", value: 10},
    {name: "Nine of Spades", value: 9}, {name: "Nine of Diamonds", value: 9}, 
    {name: "Nine of Hearts", value: 9}, {name: "Nine of Clubs", value: 9},
    {name: "Eight of Spades", value: 8}, {name: "Eight of Diamonds", value: 8}, 
    {name: "Eight of Hearts", value: 8}, {name: "Eight of Clubs", value: 8},
    {name: "Seven of Spades", value: 7}, {name: "Seven of Diamonds", value: 7}, 
    {name: "Seven of Hearts", value: 7}, {name: "Seven of Clubs", value: 7},
    {name: "Six of Spades", value: 6}, {name: "Six of Diamonds", value: 6}, 
    {name: "Six of Hearts", value: 6}, {name: "Six of Clubs", value: 6},
    {name: "Five of Spades", value: 5}, {name: "Five of Diamonds", value: 5}, 
    {name: "Five of Hearts", value: 5}, {name: "Five of Clubs", value: 5},
    {name: "Four of Spades", value: 4}, {name: "Four of Diamonds", value: 4}, 
    {name: "Four of Hearts", value: 4}, {name: "Four of Clubs", value: 4},
    {name: "Three of Spades", value: 3}, {name: "Three of Diamonds", value: 3}, 
    {name: "Three of Hearts", value: 3}, {name: "Three of Clubs", value: 3},
    {name: "Two of Spades", value: 2}, {name: "Two of Diamonds", value: 2}, 
    {name: "Two of Hearts", value: 2}, {name: "Two of Clubs", value: 2}];

playerOneDeck = [];
playerTwoDeck = [];

function dealCards(){
  while (deckList.length > 0){
    myCard = pickACard();
    playerOneDeck.push(deckList[myCard]);
    deckList.splice(myCard, 1);
    myCard = pickACard();
    playerTwoDeck.push(deckList[myCard]);
    deckList.splice(myCard, 1);
  }
};

function pickACard(){//randomly determines a number to act as index
    return Math.floor(Math.random() * deckList.length);
}


let holdingDeck = [];
function compareTopCard(){
    if (playerOneDeck[0].value > playerTwoDeck[0].value){
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck[0].name} and PlayerTwo flips a ${playerTwoDeck[0].name}<br>`;
        $descPane.innerHTML += '<b>PlayerOne</b> wins!<br>';
        console.log('P1 wins!');
        let holdingSpace = playerOneDeck[0];
        playerOneDeck.shift();
        playerOneDeck.push(holdingSpace);
        holdingSpace = playerTwoDeck[0];
        playerTwoDeck.shift();
        playerOneDeck.push(holdingSpace);
        if (holdingDeck !== []) {
            playerOneDeck = [...playerOneDeck, ...holdingDeck];
            holdingDeck = [];
        }
        $descPane.innerHTML += `<b>PlayerOne</b> cards remaining: ${playerOneDeck.length}<br>`;
        $descPane.innerHTML += `<b>PlayerTwo</b> cards remaining: ${playerTwoDeck.length}<br>`;
    } else if (playerOneDeck[0].value < playerTwoDeck[0].value){
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck[0].name} and PlayerTwo flips a ${playerTwoDeck[0].name}<br>`;
        $descPane.innerHTML += '<b>PlayerTwo wins!</b><br>';
        console.log('P2 wins!');
        let holdingSpace = playerTwoDeck[0];
        playerTwoDeck.shift();
        playerTwoDeck.push(holdingSpace);
        holdingSpace = playerOneDeck[0];
        playerOneDeck.shift();
        playerTwoDeck.push(holdingSpace);
        if (holdingDeck !== []) {
            playerTwoDeck = [...playerTwoDeck, ...holdingDeck];
            holdingDeck = [];
        }
        $descPane.innerHTML += `<b>PlayerOne</b> cards remaining: ${playerOneDeck.length}<br>`;
        $descPane.innerHTML += `<b>PlayerTwo</b> cards remaining: ${playerTwoDeck.length}<br>`;
    } else {
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck[0].name} and PlayerTwo flips a ${playerTwoDeck[0].name}<br>`;
        $descPane.innerHTML += 'War Initiated!<br> Each player burns three cards unseen!<br>';
        console.log('War Initiated!');
        if (playerOneDeck.length < 3 && playerTwoDeck.length < 3) {
            console.log('Game Over!');
            return;
        }
        //Shove three cards into each side
        for (i=0; i<3; i++) {
            let holdingSpace = playerOneDeck[0];
            playerOneDeck.shift();
            holdingDeck.push(holdingSpace);
            holdingSpace = playerTwoDeck[0];
            playerTwoDeck.shift();
            holdingDeck.push(holdingSpace);
        }
        if (playerOneDeck.length === 0 || playerTwoDeck.length === 0) {
            console.log('Game Over!');
            return;
        }
        compareTopCard();
    }
};


dealCards();
console.log(playerOneDeck);
console.log(playerTwoDeck);


while (playerOneDeck.length > 1 && playerTwoDeck.length > 1) {
    compareTopCard();
}
// If I change minimum length to 2, do I still get undefined error?
// Yes, occasionally.  Why?
// It's immediately after a long war is declared.  So I think the array is being emptied, then the value
// of a nonexistant card checked.

console.log(playerOneDeck);
console.log(playerTwoDeck);
console.log(holdingDeck);
console.log('Above to be added to winner after each showdown');
//Lose condition -- not enough cards to flip.

//card constructor to create cards (value, suit).  Each card

//deck constructor to create deck of cards.   Decks required: p1, p2, and holding
// cards: key; value would be an array of objects? 

//player constructor to ... store player decks? Players required: p1, p2
//game constructor: 
//instance of card can be inside instance of deck, for example?
function Dog({name} = {}) {
    this.name = name;
    this.speaks = function(){
        console.log('Woof! Woof!');
    }
}
*/