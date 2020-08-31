
// get the canvas and set the context
const canvas = document.querySelector('canvas');
const screen = canvas.getContext("2d");

const score = document.getElementById("points");

// set the grid's square size and declare the positions
const pixel = 20;
let gridPos = [];

let direction = [-1, 0];

// set a function for a given key pressed
const keys = {
    'ArrowUp': player => {
        direction = [0, 1];
    },
    'ArrowDown': player => {
        direction = [0, -1];
    },
    'ArrowLeft': player => {
        direction = [1, 0];
    },
    'ArrowRight': player => {
        direction = [-1, 0];
    },
    'c': (player) => {
        player.points += 1;
        player.x.push(player.x[player.x.length-1] + (direction[0] * pixel));
        player.y.push(player.y[player.y.length-1] + (direction[1] * pixel));
    }
}


function main() {

    const showGrid = false;

    fillArray();

    const snake = {
        x: [
            gridPos[Math.floor(Math.random() * gridPos.length)][0],
        ],
        y: [
            gridPos[Math.floor(Math.random() * gridPos.length)][1],
        ],
        points: 0
    }

    const fruit = {
        x: gridPos[Math.floor(Math.random() * gridPos.length)][0],
        y: gridPos[Math.floor(Math.random() * gridPos.length)][1]
    }

    window.addEventListener('keydown', event => {
        handleKeyDown(event, snake);
    });

    setInterval( () => {moveSnake(snake)}, 80);

    renderScreen(snake, showGrid);

}

// fill array with all positions
function fillArray() {
    for (let i = 0;i < canvas.width; i+=pixel) {
        gridPos.push([i, i]);
    }
}

// this function renders a grid for debugging
function renderGrid( show ){

    if (!show) {
        return;
    }

    for (let i = 0;i < gridPos.length; i++) {
        // horizontal lines
        screen.moveTo(0, gridPos[i][0]);
        screen.lineTo(canvas.width, gridPos[i][0]);
        screen.stroke();

        // vertical lines
        screen.moveTo(gridPos[i][1], 0);
        screen.lineTo(gridPos[i][1], canvas.height);
        screen.stroke();
    }

}

// renders the snake
function renderSnake(snake) {
    screen.fillStyle = "green";

    for (let i = 0; i < snake.x.length; i++) {
        screen.fillRect(snake.x[i], snake.y[i], pixel, pixel);
    }
}

// wrap all rendering functions
function renderScreen( snake, show ) {
    screen.clearRect(0, 0, canvas.width, canvas.height);

    renderGrid(show);
    renderSnake(snake);
    score.innerHTML = snake.points;

    requestAnimationFrame( () => {renderScreen(snake, show)} );
}

// handle any key that gets pressed
function handleKeyDown( event, snake ) {
    const keyPressed = event.key;

    keys[keyPressed](snake)
}

// set all positions for the snake units
function updateSnakeBody(player){
    for (let i = player.y.length-1; i > 0; i--) {
        player.y[i] = player.y[i-1];
        player.x[i] = player.x[i-1];
    }
}

// moves all the snake units to the next position
// and handles out of bounds situation
function moveSnake(snake) {
    updateSnakeBody(snake);
    snake.x[0] = snake.x[0] + (pixel * direction[0] * -1);
    snake.y[0] = snake.y[0] + (pixel * direction[1] * -1);

    if (snake.x[0] < 0){
        snake.x[0] = canvas.width - pixel;
    }
    if (snake.x[0] >= canvas.width){
        snake.x[0] = 0;
    }
    if (snake.y[0] < 0){
        snake.y[0] = canvas.height - pixel;
    }
    if (snake.y[0] >= canvas.height){
        snake.y[0] = 0;
    }
}

main();
