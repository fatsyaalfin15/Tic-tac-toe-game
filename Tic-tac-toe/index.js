document.addEventListener('DOMContentLoaded', function() {
    // Create animated background elements
    createStars();
    createRain();
    
    // Game variables
    let currentPlayer = 'X';
    let gameActive = false;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let playerNames = { X: 'Player X', O: 'Player O' };
    
    // DOM elements
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('gameStatus');
    const currentPlayerDisplay = document.getElementById('currentPlayer');
    const resetButton = document.getElementById('resetGame');
    const startButton = document.getElementById('startGame');
    const gameContainer = document.getElementById('gameContainer');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    // Winning conditions
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Start game button click handler
    startButton.addEventListener('click', function() {
        const player1Name = player1Input.value.trim() || 'Player X';
        const player2Name = player2Input.value.trim() || 'Player O';
        
        playerNames.X = player1Name;
        playerNames.O = player2Name;
        
        gameContainer.classList.remove('hidden');
        startGame();
    });
    
    // Reset game button click handler
    resetButton.addEventListener('click', startGame);
    
    // Cell click handler
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Start a new game
    function startGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameStatus.textContent = '';
        
        currentPlayerDisplay.textContent = `Current Player: ${playerNames[currentPlayer]}`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('text-green-400', 'text-blue-400', 'bg-green-800');
        });
    }
    
    // Handle cell click
    function handleCellClick() {
        const clickedCell = this;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;
        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        if (currentPlayer === 'X') {
            clickedCell.classList.add('text-green-400');
        } else {
            clickedCell.classList.add('text-blue-400');
        }
        
        checkResult();
    }
    
    // Check game result
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                cells[a].classList.add('bg-green-800');
                cells[b].classList.add('bg-green-800');
                cells[c].classList.add('bg-green-800');
                break;
            }
        }
        
        if (roundWon) {
            gameStatus.textContent = `${playerNames[currentPlayer]} wins!`;
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')) {
            gameStatus.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = `Current Player: ${playerNames[currentPlayer]}`;
    }
    
    // Create animated stars background
    function createStars() {
        const starsContainer = document.getElementById('stars-container');
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const delay = Math.random() * 5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--delay', delay);
            
            starsContainer.appendChild(star);
        }
    }
    
    // Create animated rain background
    function createRain() {
        const rainContainer = document.getElementById('rain-container');
        const rainCount = 50;
        
        for (let i = 0; i < rainCount; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            
            const x = Math.random() * 100;
            const height = Math.random() * 20 + 10;
            const duration = Math.random() * 1 + 0.5;
            const delay = Math.random() * 2;
            
            raindrop.style.left = `${x}%`;
            raindrop.style.height = `${height}px`;
            raindrop.style.animationDuration = `${duration}s`;
            raindrop.style.animationDelay = `${delay}s`;
            
            rainContainer.appendChild(raindrop);
        }
    }
});