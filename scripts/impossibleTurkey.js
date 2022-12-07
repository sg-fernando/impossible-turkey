// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
// first call
update();

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