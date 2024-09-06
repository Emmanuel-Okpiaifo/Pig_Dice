  // Business Logic for Player
  function Player(name) {
    this.name = name;
    this.currentScore = 0;
    this.totalScore = 0;
}

Player.prototype.rollDie = function () {
    return Math.floor(Math.random() * 6) + 1;
};

Player.prototype.hold = function () {
    this.totalScore += this.currentScore;
    this.currentScore = 0;
};

Player.prototype.reset = function () {
    this.currentScore = 0;
    this.totalScore = 0;
};

// Business Logic for Pig Dice Game
function PigGame() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.winningScore = 100; 
}

PigGame.prototype.addPlayer = function (player) {
    this.players.push(player);
};

PigGame.prototype.getCurrentPlayer = function () {
    return this.players[this.currentPlayerIndex];
};

PigGame.prototype.switchTurn = function () {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    document.getElementById('player-0').classList.toggle('active');
    document.getElementById('player-1').classList.toggle('active');
};

PigGame.prototype.isGameOver = function () {
    return this.players.some(player => player.totalScore >= this.winningScore);
};

PigGame.prototype.resetGame = function () {
    this.players.forEach(player => player.reset());
    this.currentPlayerIndex = 0;
    document.getElementById('player-0').classList.add('active');
    document.getElementById('player-1').classList.remove('active');
};

// User Interface Logic
let pigGame = new PigGame();

function displayCurrentPlayer(player) {
    document.getElementById("current-player").textContent = `${player.name}'s turn`;
}

function displayScores() {
    pigGame.players.forEach((player, index) => {
        document.getElementById(`score-${index}`).textContent = `${player.totalScore}`;
        document.getElementById(`current-${index}`).textContent = `${player.currentScore}`;
    });
}

        // Function to update dice face
        function showDie(roll) {
            const dice = document.getElementById("dice");
            const diceImages = [
                '1/1b/Dice-1-b.svg', 
                '5/5f/Dice-2-b.svg', 
                '2/2c/Dice-3-b.svg', 
                'f/fd/Dice-4-b.svg', 
                '0/08/Dice-5-b.svg', 
                'a/a6/Dice-6-b.svg'  
            ];
            dice.classList.add('animate');
            setTimeout(() => {
                dice.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/${diceImages[roll - 1]}/1200px-Dice-${roll}-b.svg.png`;
                dice.classList.remove('animate');
            }, 300); // 300ms delay to allow transition effect
        }

function showPopupMessage(message) {
    const popup = document.getElementById("popup-message");
    document.getElementById("popup-text").textContent = message;
    popup.style.display = "block";
}

function hidePopupMessage() {
    const popup = document.getElementById("popup-message");
    popup.style.display = "none";
}

function attachGameListeners() {
    document.getElementById("roll-die").addEventListener("click", function () {
        let player = pigGame.getCurrentPlayer();
        let roll = player.rollDie();

        showDie(roll);  // Show the rolled die number

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

    document.getElementById("hold").addEventListener("click", function () {
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

    document.getElementById("popup-close").addEventListener("click", function () {
        hidePopupMessage();
    });
}

function initializeGame() {
    let player1 = new Player("Player 1");
    let player2 = new Player("Player 2");

    pigGame.addPlayer(player1);
    pigGame.addPlayer(player2);

    displayScores();
    attachGameListeners();
}

// Start the game when the page loads
window.onload = function () {
    initializeGame();
};


