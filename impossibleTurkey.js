// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


var gravity = 1;
var player;
var level;
const camera = new Camera();

let s = [
    new Brick(new Vector(500,400), ctx)
];
// const surface3 = new Surface(new Vector(900,200), ctx, "images/square.jpg", 75, 75);

let e = [
];

level = new Level(new Vector(500,0), new Vector(0,0), ctx, s, e);

function update()
{
    camera.update();
    level.update();
    // update canvas
    requestAnimationFrame(update);
}
// first call
update();