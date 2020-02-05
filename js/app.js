$(document).ready(function () {

    console.log("hello");
// CONSTRUCTORS
// FURRY CONSTRUCTOR
 const Furry = require('./furry');
 const Coin = require('./coin');


// COIN CONSTRUCTOR



//GAME CONSTRUCTOR

    class Game {

        constructor(board, furry, coin, score, index) {
            this.board = document.querySelector('#board').querySelectorAll('div');
            this.furry = new Furry();
            this.coin = new Coin();
            this.score = 0;
            this.index = function (x, y) {
                return x + (y * 10);
            };
        }

        showFurry() {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

        }

        showCoin() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }

        startGame() {
            var self = this;
           this.interval = setInterval(function move () {
                self.moveFurry();
            }, 250);
        }

        moveFurry() {

            if (this.furry.direction === 'right') {
               this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === 'down') {
               this.furry.y = this.furry.y + 1;
            } else if (this.furry.direction === 'left') {
               this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === 'up') {
               this.furry.y = this.furry.y - 1;
            }

            var isGameOver = this.gameOver();
            if(isGameOver){
                return;
            }
            this.hideVisibleFurry();
            this.showFurry();
            this.checkCoinCollision();

        }

        hideVisibleFurry() {
            var divFurry = document.querySelector('.furry');
            divFurry.classList.remove('furry');
        }

        turnFurry (event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        }

        checkCoinCollision () {
            if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
                var divCoin = document.querySelector('.coin');
                divCoin.classList.remove('coin');
                this.score = this.score + 1;
                var newScore = document.querySelector('#score div strong');
                newScore.innerText = this.score;
                this.coin = new Coin();
                this.showCoin();
            }
        }

        gameOver () {
            var gameOver = false;
            if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
                gameOver = true;
                clearInterval(this.interval);
                this.hideVisibleFurry();
                document.querySelector('#over').classList.remove('invisible');
                document.querySelector('#board').classList.add('invisible');
                document.querySelector('#score').classList.add('invisible');
                document.querySelector('#over pre p').innerText = `Your score is: ${this.score}.`;
                return gameOver;
            }
        }

    }

    //INITIALIZING GAME

var game = new Game();

game.showCoin();
game.showFurry();
game.checkCoinCollision();
game.startGame();


document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });








});