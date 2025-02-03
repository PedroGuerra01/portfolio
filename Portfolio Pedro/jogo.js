const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// Atualizar a pontuação
function updateScore() {
    score++;
    scoreDisplay.textContent = `Pontos: ${score}`;
}

// Atualizar o cronômetro
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Tempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        alert(`Fim do jogo! Você marcou ${score} pontos.`);
        resetGame();
    }
}

// Criar um alvo
function createTarget() {
    // Remover qualquer alvo existente
    const existingTarget = document.querySelector(".target");
    if (existingTarget) {
        existingTarget.remove();
    }

    // Criar novo alvo
    const target = document.createElement("div");
    target.classList.add("target");

    // Gerar posição aleatória dentro do contêiner
    const x = Math.random() * (gameContainer.offsetWidth - 50);
    const y = Math.random() * (gameContainer.offsetHeight - 50);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    // Evento de clique no alvo
    target.addEventListener("click", () => {
        updateScore();
        createTarget();
    });

    gameContainer.appendChild(target);
}

// Iniciar o jogo
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Pontos: ${score}`;
    timerDisplay.textContent = `Tempo: ${timeLeft}s`;

    startButton.style.display = "none";

    // Criar o primeiro alvo e iniciar os intervalos
    createTarget();
    gameInterval = setInterval(createTarget, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

// Resetar o jogo
function resetGame() {
    const target = document.querySelector(".target");
    if (target) target.remove();

    startButton.style.display = "block";
}

// Evento para o botão de iniciar
startButton.addEventListener("click", startGame);
