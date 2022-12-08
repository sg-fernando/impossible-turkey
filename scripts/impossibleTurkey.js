// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var score = getCookie("highscore");
if (score == null)
{
    score = 0;
}
var levelScore = 0;

const epoch = new Date('July 20, 69 20:17:40 GMT+00:00');

var gravity = 1;
var player;
var level;
const camera = new Camera();

// const surface3 = new Surface(new Vector(900,200), ctx, "images/square.jpg", 75, 75);
generator = new LevelGenerator(0);
level = new MenuLevel();

function update()
{
    level.update();
    // update canvas
    requestAnimationFrame(update);
}
function difficulty(difficulty)
{
    generator.difficulty = difficulty;
    generator.randomLevel();
    generator.arrayConversion();
}

function play()
{
    generator.getLevel();
    level = generator.create();
}

// first call
update();
difficulty(0);