const board = document.getElementById("game-board");

// define game variables

let snake = [{ x: 10, y: 10 }];

// draw map, snake, food
const draw = () => {
	board.innerHTML = "";
	drawSnake();
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
