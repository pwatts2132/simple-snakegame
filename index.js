const UNIT_SIZE = 25;
const gameBoard = document.querySelector('.game-canvas');
const gameScore = document.querySelector('.game-score');
const resetButton = document.querySelector('.reset-btn');
const foodColor = "red";
const snakeColor = "green";
const ctx = gameBoard.getContext('2d');
const borderColor = "black";
const boardColor = "midnightblue";
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
let xVelocity = 0;
let yVelocity = 0;
let foodX = 0;
let foodY = 0;
let score = 0;
let gameRunning = false;
let snake = [{x: UNIT_SIZE*5, y: UNIT_SIZE*5}];

const gameStart = () => {
    gameRunning = true;
    gameScore.textContent = `Score: ${score}`;
    createFood();
    drawFood();
    nextTick();
}

const nextTick = () => {
    if (gameRunning === true) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
}

const clearBoard = () => {
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

const createFood = () => {
    const randomFood = (max) => {
        const randNum = Math.round((Math.random() * max) / UNIT_SIZE) * 25;
        return randNum;
    }
    foodX = randomFood(gameWidth - UNIT_SIZE);
    foodY = randomFood(gameHeight - UNIT_SIZE);
}

const drawFood = () => {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(foodX, foodY, UNIT_SIZE, UNIT_SIZE);

}

const moveSnake = () => {
    const head = {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity};
    snake.unshift(head);
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        gameScore.textContent = `Score: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}

const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = borderColor;
    snake.forEach(snakepart => {
        ctx.fillRect(snakepart.x, snakepart.y, UNIT_SIZE, UNIT_SIZE);
        ctx.strokeRect(snakepart.x, snakepart.y, UNIT_SIZE, UNIT_SIZE);
    });
}

const changeDirection = (event) => {
    const keyPressed = event.keyCode;
    // up
    if (keyPressed === 38 && yVelocity !== UNIT_SIZE) {
        yVelocity = -UNIT_SIZE;
        xVelocity = 0;
    // left
    } else if (keyPressed === 37 && xVelocity !== UNIT_SIZE) {
        xVelocity = -UNIT_SIZE;
        yVelocity = 0;
    // right
    } else if (keyPressed === 39 && xVelocity !== -UNIT_SIZE) {
        xVelocity = UNIT_SIZE;
        yVelocity = 0;
    // down
    } else if (keyPressed === 40 && yVelocity !== -UNIT_SIZE) {
        yVelocity = UNIT_SIZE
        xVelocity = 0;
    }
}

const checkGameOver = () => {
    if (snake[0].x < 0 || snake[0].y < 0) {
        gameRunning = false;
    } else if (snake[0].x > gameWidth || snake[0].y > gameHeight) {
        gameRunning = false;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameRunning = false;
        }
    }
}

const displayGameOver = () => {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    gameRunning = false;
}

const resetGame = () => {
    score = 0;
    xVelocity = 0;
    yVelocity = 0;
    snake = [{x: UNIT_SIZE*5, y: UNIT_SIZE*5}];
    gameStart();
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);
gameStart();