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


/*>>>>>>>>>>>>> DESIRED FEATURES LIST <<<<<<<<<<<<<<<<
1. Re-start game button (remember to remap $button)
*/

"use strict"

//>>>>>>>>>>> Global Variables <<<<<<<<<<<

let hearts = [];
let diamonds = [];
let spades = [];
let clubs = [];
let playerOneDeck = [];
let startingDeck = [];
let playerTwoDeck = [];
let playerOne = {};
let playerTwo = {};
let holdingDeck = []; // The pot
let holdingSpace = {};
let p1Name = '';
let p2Name = '';

//>>>>>>>>> DOM ELEMENTS <<<<<<<<<<

let $descPane = document.querySelector(".description");
let $p1cardCount = document.querySelector(".p1-card-count");
let $p2cardCount = document.querySelector(".p2-card-count");
let $playButton = document.querySelector("button");
let $leftCard = document.querySelector(".left");
let $rightCard = document.querySelector(".right");


//>>>>>>>>> CONSTRUCTORS <<<<<<<<<<

function Deck(suit1=[], suit2=[], suit3=[], suit4=[]){
    this.cards = [...suit1, ...suit2,...suit3, ...suit4];
};

function Card({name, value}){
    this.name = name;
    this.value = value;
};

function Player({name = `Player`, cardCount=0, deck}){
    this.name = name;
    this.cardCount = cardCount;
    this.deck = deck;
};

function Game(){
    startingDeck = new Deck(hearts, clubs, diamonds, spades);
    playerOneDeck = new Deck();
    playerTwoDeck = new Deck();
    startingDeck.shuffle(startingDeck, playerOneDeck, playerTwoDeck);
    this.playerOne = new Player ({name: p1Name, cardCount: playerOneDeck.cards.length, deck: playerOneDeck});
    this.playerTwo = new Player({name: p2Name, cardCount: playerTwoDeck.cards.length, deck: playerTwoDeck});
};


//>>>>>>>>>>>> Prototype Methods <<<<<<<<<<<<<<

Deck.prototype.shuffle = function (origin, target1, target2){
    while (this.cards.length > 0) {
      let myCard = Math.floor(Math.random() * origin.cards.length);
      target1.cards.push(this.cards[myCard]);
      this.cards.splice(myCard, 1);
      myCard = Math.floor(Math.random() * origin.cards.length);
      target2.cards.push(this.cards[myCard]);
      this.cards.splice(myCard, 1);
    }
};

Game.prototype.compareTopCard = function (){
    if (playerOneDeck.cards.length === 0 || playerTwoDeck.cards.length === 0) {
        if (playerOneDeck.cards.length === 0) {
            $descPane.innerHTML += `${game.playerOne.name} has run out of cards!<br> ${game.playerTwo.name} wins!<br> Refresh to play again.<br>`;
            $descPane.scrollTop = $descPane.scrollHeight;
            return;
        } else {
            $descPane.innerHTML += `${game.playerTwo.name} has run out of cards!<br> ${game.playerOne.name} wins!<br> Refresh to play again.<br>`;
            $descPane.scrollTop = $descPane.scrollHeight;
            return;
        }
       
    }
    if (playerOneDeck.cards[0].value > playerTwoDeck.cards[0].value){
        $descPane.innerHTML += `${game.playerOne.name} flips a ${playerOneDeck.cards[0].name} and ${game.playerTwo.name} flips a ${playerTwoDeck.cards[0].name}<br>`;
        $descPane.innerHTML += `${game.playerOne.name} wins the hand!<br>`;
        $leftCard.innerHTML = `${playerOneDeck.cards[0].name}`;
        $rightCard.innerHTML = `${playerTwoDeck.cards[0].name}`;
        let holdingSpace = playerOneDeck.cards[0];
        playerOneDeck.cards.shift();
        playerOneDeck.cards.push(holdingSpace);
        holdingSpace = playerTwoDeck.cards[0];
        playerTwoDeck.cards.shift();
        playerOneDeck.cards.push(holdingSpace);
        if (holdingDeck !== []) {
            playerOneDeck.cards = [...playerOneDeck.cards, ...holdingDeck];
            holdingDeck = [];
        };
        $p1cardCount.innerHTML = `Cards remaining: ${playerOneDeck.cards.length}`;
        $p2cardCount.innerHTML = `Cards remaining: ${playerTwoDeck.cards.length}`;
        $descPane.scrollTop = $descPane.scrollHeight;
    } else if (playerOneDeck.cards[0].value < playerTwoDeck.cards[0].value){
        $descPane.innerHTML += `${game.playerOne.name} flips a ${playerOneDeck.cards[0].name} and ${game.playerTwo.name} flips a ${playerTwoDeck.cards[0].name}<br>`;
        $descPane.innerHTML += `${game.playerTwo.name} wins the hand!<br>`;
        $leftCard.innerHTML = `${playerOneDeck.cards[0].name}`;
        $rightCard.innerHTML = `${playerTwoDeck.cards[0].name}`;
        let holdingSpace = playerTwoDeck.cards[0];
        playerTwoDeck.cards.shift();
        playerTwoDeck.cards.push(holdingSpace);
        holdingSpace = playerOneDeck.cards[0];
        playerOneDeck.cards.shift();
        playerTwoDeck.cards.push(holdingSpace);
        if (holdingDeck !== []) {
            playerTwoDeck.cards = [...playerTwoDeck.cards, ...holdingDeck];
            holdingDeck = [];
        }
        $p1cardCount.innerHTML = `Cards remaining: ${playerOneDeck.cards.length}`;
        $p2cardCount.innerHTML = `Cards remaining: ${playerTwoDeck.cards.length}`;
        $descPane.scrollTop = $descPane.scrollHeight;
    } else {
        $descPane.innerHTML += `${game.playerOne.name} flips a ${playerOneDeck.cards[0].name} and ${game.playerTwo.name} flips a ${playerTwoDeck.cards[0].name}<br>`;
        $leftCard.innerHTML = `${playerOneDeck.cards[0].name}`;
        $rightCard.innerHTML = `${playerTwoDeck.cards[0].name}`;
        $descPane.innerHTML += 'War Initiated!<br> Each player burns three cards unseen!<br>';
        $descPane.scrollTop = $descPane.scrollHeight;
        if (playerOneDeck.cards.length < 4 || playerTwoDeck.cards.length < 4) {
            if (playerOneDeck.cards.length < 4) {
                $descPane.innerHTML += `${game.playerOne.name} doesn't have enough cards!<br> ${game.playerTwo.name} wins!<br> Refresh to play again.<br>`;
                $descPane.scrollTop = $descPane.scrollHeight;
                return;
            } else {
                $descPane.innerHTML += `${game.playerTwo.name} doesn't have enough cards!<br> ${game.playerOne.name} wins!<br> Refresh to play again.<br>`;
                $descPane.scrollTop = $descPane.scrollHeight;
                return;
            }

        }
        //Shove three cards into each side
        for (let i=0; i<4; i++) {
            let holdingSpace = playerOneDeck.cards[0];
            playerOneDeck.cards.shift();
            holdingDeck.push(holdingSpace);
            holdingSpace = playerTwoDeck.cards[0];
            playerTwoDeck.cards.shift();
            holdingDeck.push(holdingSpace);
        }
    }
};

//>>>>>>>>>> Utility Functions <<<<<<<<<<<<

// function updateScroll(){
//     $descPane.scrollTop = $descPane.scrollHeight;
// }


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
            spades[i].name = "Queen of Spades";
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

p1Name = prompt(`Please enter player one's name:`);
p2Name = prompt(`Please enter player two's name:`);

let game = new Game();
$playButton.addEventListener("click", function () {
    game.compareTopCard()});



/*
>>>>>>>>>>>> Brainstorming implementing features... <<<<<<<<<<<<<<<



*/