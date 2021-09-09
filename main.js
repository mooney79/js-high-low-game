/*>>>>>>>>>>  INSTRUCTIONS <<<<<<<<<<<<<<
The goal is to be the first player to win all 52 cards

THE DEAL
The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them.

THE PLAY
Each player turns up a card at the same time, and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.

If the cards are the same rank, it is War. Each player places three cards face down and one card face up. The player with the higher card takes both piles (ten cards). If the turned-up cards are again the same rank, each player places another three cards face down and turns another card face up. The player with the higher card takes all 18 cards, and so on.

HOW TO KEEP SCORE
The game ends when one player has won all the cards.

REQUIREMENTS
You must have a constructor for Game, Player, Deck, and Card
You must attach methods to the prototype chain
You must create a basic UI that includes a draw button and message box that informs the game status after each turn
*/



//>>>>>>>>> CONSTRUCTORS <<<<<<<<<<

function Game(){

};

function Deck(){
  
};

function Player({name, score=0}){
    this.name=name;
    this.score=score;
};

function Card(){

};

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

    // Okay.  Logic time.
    // Random number between 1 and Decklist.length
    // Use a playerOneDeck and a playerTWoDeck.
    // Take the item from Decklist[random] (delete it behind us)
    // push it into proper player's array.
    // run until Decklest.length = 0;

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
    return Math.floor(Math.random()*deckList.length);
}

dealCards();
console.log(playerOneDeck);
console.log(playerTwoDeck);

