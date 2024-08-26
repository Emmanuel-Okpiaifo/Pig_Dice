// Business Logic for Player
function player(name){
    this.name = name;
    this.currentScore = 0;
    this.totalScore = 0;
}

player.prototype.rollDie = function() {
    return Math.floor(Math.random() * 6) + 1;
}

player.prototype.hold = function() {
    this.totalScore += this.currentScore;
    this.currentScore = 0;
}

player.prototype.reset = function() {
    this.currentScore = 0;
    this.totalScore = 0;
}

// Business Logic for Pig Dice Game
function pigGame() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.WinningScore = 100;
}

pigGame.prototype.addPlayer = function(player){
    this.players.push(player);
}

pigGame.prototype.getCurrentPlayer = function(){
    return this.players[this.currentPlayerIndex];
}

pigGame.prototype.switchTurn = function(){
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
}

pigGame.prototype.gameOver = function(){
    return this.players.some(player => player.totalScore >= this.winningScore);
}

pigGame.prototype.resetGame = function(){
    this.players.forEach(player => player.reset());
    this.currentPlayerIndex = 0;
}