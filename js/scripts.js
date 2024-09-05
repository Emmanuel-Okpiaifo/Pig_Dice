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

//User Interface Logic 
let pigGame = new pigGame();

function displayCurrentPlayer(player){
    $("#current-player").text(`${player.name}'s turn`);
}

function displayScores() {
    pigGame.players.forEach((player, index) => {
        $(`#player${index + 1}-current`).text(`Current: ${player.currentScore}`);
        $(`#player${index + 1}-total`).text(`Total: ${player.totalScore}`);
    });
}

function showPopupMessage(message) {
    const popup = document.getElementById("popup-message");
    document.getElementById("popup-text").textContent = message;
    popup.classList.remove("hidden");
    popup.style.display = "block";
}

function hidePopupMessage() {
    const popup = document.getElementById("popup-message");
    popup.classList.add("hidden");
    popup.style.display = "none";
}

function attachGameListeners() {
    $("#roll-die").click(function() {
        let player = pigGame.getCurrentPlayer();
        let roll = player.rollDie();

        if (roll === 1) {
            player.currentScore = 0;
            pigGame.switchTurn();
        } else {
            player.currentScore += roll;
        }

        displayScores();
        displayCurrentPlayer(pigGame.getCurrentPlayer());

        if (pigGame.isGameOver()) {
            showPopupMessage(`${player.name} wins!`);
            pigGame.resetGame();
            displayScores();
        }
    });

    $("#hold").click(function() {
        let player = pigGame.getCurrentPlayer();
        player.hold();
        if (!pigGame.isGameOver()) {
            pigGame.switchTurn();
        }
        displayScores();
        displayCurrentPlayer(pigGame.getCurrentPlayer());

        if (pigGame.isGameOver()) {
            showPopupMessage(`${player.name} wins!`);
            pigGame.resetGame();
            displayScores();
        }
    });

    // Close pop-up message
    document.getElementById("popup-close").addEventListener("click", hidePopupMessage);
}

$(document).ready(function() {
    // Initialize players
    let player1 = new Player("Player 1");
    let player2 = new Player("Player 2");
    pigGame.addPlayer(player1);
    pigGame.addPlayer(player2);

    displayCurrentPlayer(pigGame.getCurrentPlayer());
    displayScores();
    
    attachGameListeners();
});
