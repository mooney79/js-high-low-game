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
1. Some indication of the currently drawn card for each player in the placeholder
   boxes.
2. Option to enter names for each player.
3. Updated card counts in area on page below card placeholders.
4. Game Over messages, with winner announcement

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

function Player({name, cardCount=0, deck}){
    this.name = name;
    this.cardCount = cardCount;
    this.deck = deck;
};

function Game(){
    startingDeck = new Deck(hearts, clubs, diamonds, spades);
    playerOneDeck = new Deck();
    playerTwoDeck = new Deck();
    startingDeck.shuffle(startingDeck, playerOneDeck, playerTwoDeck);
    this.playerOne = new Player ({name: 'Player 1', cardCount: playerOneDeck.cards.length, deck: playerOneDeck});
    this.playerTwo = new Player({name: 'Player 2', cardCount: playerTwoDeck.cards.length, deck: playerTwoDeck});
};


//>>>>>>>>>>>> Prototype Methods <<<<<<<<<<<<<<

Deck.prototype.shuffle = function (origin, target1, target2){
    while (this.cards.length > 0) {
//      let myCard = pickACard();
      let myCard = Math.floor(Math.random() * origin.cards.length);
      target1.cards.push(this.cards[myCard]);
      this.cards.splice(myCard, 1);
//      myCard = pickACard();
      myCard = Math.floor(Math.random() * origin.cards.length);
      target2.cards.push(this.cards[myCard]);
      this.cards.splice(myCard, 1);
    }
};

Game.prototype.compareTopCard = function (){
    if (playerOneDeck.cards[0].value > playerTwoDeck.cards[0].value){
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck.cards[0].name} and PlayerTwo flips a ${playerTwoDeck.cards[0].name}<br>`;
        $descPane.innerHTML += '<b>PlayerOne</b> wins!<br>';
        $leftCard.innerHTML = `${playerOneDeck.cards[0].name}`;
        $rightCard.innerHTML = `${playerTwoDeck.cards[0].name}`;
        console.log('P1 wins!');
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
        // $descPane.innerHTML += `<b>PlayerOne</b> cards remaining: ${playerOneDeck.cards.length}<br>`;
        // $descPane.innerHTML += `<b>PlayerTwo</b> cards remaining: ${playerTwoDeck.cards.length}<br>`;
        $p1cardCount.innerHTML = `Cards remaining: ${playerOneDeck.cards.length}`;
        $p2cardCount.innerHTML = `Cards remaining: ${playerTwoDeck.cards.length}`;
        $descPane.scrollTop = $descPane.scrollHeight;
    } else if (playerOneDeck.cards[0].value < playerTwoDeck.cards[0].value){
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck.cards[0].name} and PlayerTwo flips a ${playerTwoDeck.cards[0].name}<br>`;
        $descPane.innerHTML += '<b>PlayerTwo wins!</b><br>';
        console.log('P2 wins!');
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
        // $descPane.innerHTML += `<b>PlayerOne</b> cards remaining: ${playerOneDeck.cards.length}<br>`;
        // $descPane.innerHTML += `<b>PlayerTwo</b> cards remaining: ${playerTwoDeck.cards.length}<br>`;
        $p1cardCount.innerHTML = `Cards remaining: ${playerOneDeck.cards.length}`;
        $p2cardCount.innerHTML = `Cards remaining: ${playerTwoDeck.cards.length}`;
        $descPane.scrollTop = $descPane.scrollHeight;
    } else {
        $descPane.innerHTML += `PlayerOne flips a ${playerOneDeck.cards[0].name} and PlayerTwo flips a ${playerTwoDeck.cards[0].name}<br>`;
        $leftCard.innerHTML = `${playerOneDeck.cards[0].name}`;
        $rightCard.innerHTML = `${playerTwoDeck.cards[0].name}`;
        $descPane.innerHTML += 'War Initiated!<br> Each player burns three cards unseen!<br>';
        console.log('War Initiated!');
        $descPane.scrollTop = $descPane.scrollHeight;
        if (playerOneDeck.cards.length < 3 && playerTwoDeck.cards.length < 3) {
            console.log('Game Over!');
            return;
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
        if (playerOneDeck.cards.length === 0 || playerTwoDeck.cards.length === 0) {
            console.log('Game Over!');
            return;
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

let game = new Game();
// console.log('Game Initiated');
// console.log(game);
$playButton.addEventListener("click", function () {
    game.compareTopCard()});