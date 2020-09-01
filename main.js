
// get the canvas and set the context
const canvas = document.querySelector('canvas');
const screen = canvas.getContext("2d");

// get the score counter
const score = document.getElementById("points");

// set the grid's square size and declare the positions
const pixel = 20;
let gridPos = [];

// set a direction for the snake to folow
let direction = [-1, 0];

// set a function for a given key pressed
const keys = {
    'ArrowUp': player => {
        if (direction[1] != -1){
            direction = [0, 1];
        }
    },
    'ArrowDown': player => {
        if (direction[1] != 1) {
            direction = [0, -1];
        }
    },
    'ArrowLeft': player => {
        if (direction[0] != -1) {
            direction = [1, 0];
        }
    },
    'ArrowRight': player => {
        if (direction[0] != 1) {
            direction = [-1, 0];
        }
    }
}


function main() {

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

    renderScreen(snake, fruit);

}

// fill array with all positions
function fillArray() {
    for (let i = 0;i < canvas.width; i+=pixel) {
        gridPos.push([i, i]);
    }
}

// renders the snake
function renderSnake(snake) {
    screen.fillStyle = "blue";

    for (let i = 0; i < snake.x.length; i++) {
        if (i > 0) {
            screen.fillStyle = "green";
        }
        screen.fillRect(snake.x[i], snake.y[i], pixel, pixel);
    }
}

// wrap all rendering functions
function renderScreen( snake, fruit ) {
    screen.clearRect(0, 0, canvas.width, canvas.height);

    renderSnake(snake);
    score.innerHTML = snake.points;

    handleFruit(fruit, snake);

    requestAnimationFrame( () => {renderScreen(snake, fruit)} );
}

function handleFruit(fruit, snake){

    if (snake.x[0] === fruit.x && snake.y[0] === fruit.y) {
        snake.points += 1;
        fruit.x = gridPos[Math.floor(Math.random() * gridPos.length)][0];
        fruit.y = gridPos[Math.floor(Math.random() * gridPos.length)][1];

        snake.x.push(snake.x[snake.x.length-1] + (direction[0] * pixel));
        snake.y.push(snake.y[snake.y.length-1] + (direction[1] * pixel));
    }

    screen.fillStyle = "red";
    screen.fillRect(fruit.x, fruit.y, pixel, pixel);
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

    for (let i = 1; i < snake.x.length; i++) {
        if (snake.x[0] === snake.x[i] && snake.y[0] === snake.y[i]) {
            gameOver(snake);
        }
    }

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

function gameOver( snake, fruit ) {
    snake.points = 0;
    snake.x = [gridPos[Math.floor(Math.random() * gridPos.length)][0]];
    snake.y = [gridPos[Math.floor(Math.random() * gridPos.length)][1]];
}

main();
