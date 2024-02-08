const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
// define game variables
const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// draw map, snake, food
const draw = () => {
	board.innerHTML = "";
	drawSnake();
	drawFood();
};

const drawSnake = () => {
	snake.forEach((segment) => {
		const snakeElement = createGameElement("div", "snake");
		setPosition(snakeElement, segment);
		board.appendChild(snakeElement);
	});
};

// create a snake or food cube/div

const createGameElement = (tag, className) => {
	const element = document.createElement(tag);
	element.className = className;
	return element;
};

// set the position of snake or food

function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

// testing draw function
// draw();

// draw food function

function drawFood() {
	const foodElement = createGameElement("div", "food");
	setPosition(foodElement, food);
	board.appendChild(foodElement);
}

// generate food
function generateFood() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return { x, y };
}

// moving the snake

const move = () => {
	const head = { ...snake[0] };

	switch (direction) {
		case "right":
			head.x++;
			break;
		case "left":
			head.x--;
			break;
		case "up":
			head.y--;
			break;
		case "down":
			head.y++;
			break;
	}

	snake.unshift(head);
	// snake.pop();

	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		increaseSpeed();
		clearInterval(gameInterval); // clear past interval
		gameInterval = setInterval(() => {
			move();
			// checkCollision()
			draw();
		}, gameSpeedDelay);
	} else {
		snake.pop();
	}
};

// test moving
// setInterval(() => {
// 	move(); // move first
// 	draw(); // then draw again new position
// }, 200);

// start game function

function startGame() {
	gameStarted = true; // keep track of running game
	instructionText.style.display = "none";
	logo.style.display = "none";
	gameInterval = setInterval(() => {
		move();
		// checkCollision()
		draw();
	}, gameSpeedDelay);
}

// keypress event listener

function handleKeyPress(e) {
	if ((!gameStarted && e.code === "Space") || (!gameStarted && e.key === " ")) {
		startGame();
	} else {
		switch (e.key) {
			case "ArrowUp":
				direction = "up";
				break;
			case "ArrowDown":
				direction = "down";
				break;
			case "ArrowLeft":
				direction = "left";
				break;
			case "ArrowRight":
				direction = "right";
				break;
		}
	}
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
	// console.log(gameSpeedDelay);
	if (gameSpeedDelay > 150) {
		gameSpeedDelay -= 5;
	} else if (gameSpeedDelay > 100) {
		gameSpeedDelay -= 3;
	} else if (gameSpeedDelay > 50) {
		gameSpeedDelay -= 2;
	} else if (gameSpeedDelay > 25) {
		gameSpeedDelay -= 1;
	}
}

// function checkCollision() {
// 	const head  
// }
