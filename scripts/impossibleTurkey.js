// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var gravity = 1;
var player;
var level;
const camera = new Camera();

let s = [
    new Brick(new Vector(500,375)),
    new Brick(new Vector(500+75,375)),
    new Brick(new Vector(500+75+75,375)),
    new Brick(new Vector(500+75+75+75,375)),
    new Brick(new Vector(500+75+75+75+75,375))
];
// const surface3 = new Surface(new Vector(900,200), ctx, "images/square.jpg", 75, 75);

let e = [
];

level = new Level(new Vector(550,0), new Vector(0,0), s, e);

function update()
{
    camera.update();
    level.update();
    // update canvas
    requestAnimationFrame(update);
}
// first call
update();