// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var gravity = 1;
var player;
var level;

let s = [
    new Surface(new Vector(0,300), ctx, "images/square.jpg", 600, 100),
    new Surface(new Vector(100,400), ctx, "images/square.jpg", 800, 100),
    new Surface(new Vector(900,000), ctx, "images/square.jpg", 75, 500),
    new Brick(new Vector(0,300), ctx),
    new Brick(new Vector(75,300), ctx)
];
// const surface3 = new Surface(new Vector(900,200), ctx, "images/square.jpg", 75, 75);

let e = [
    new Turkey(new Vector(150,0), ctx, 2)
];

level = new Level(new Vector(50,0), new Vector(300,200), ctx, s, e);

function update()
{
    level.update();
    // update canvas
    requestAnimationFrame(update);
}
// first call
update();