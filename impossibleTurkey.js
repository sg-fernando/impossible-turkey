// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var gravity = 1;

const player = new Player(new Vector(0,0), ctx);
const surface = new Surface(new Vector(100,300), ctx, "images/square.jpg", 500, 100);
const surface2 = new Surface(new Vector(100,400), ctx, "images/square.jpg", 800, 100);
const surface3 = new Surface(new Vector(900,300), ctx, "images/square.jpg", 100, 100);

const enemy = new Turkey(new Vector(100,0), ctx, 2);

player.surfaces = [surface, surface2, surface3];
enemy.surfaces = [surface, surface2, surface3];


function update()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.showLives();
    player.move();

    enemy.move();

    surface.draw();
    surface2.draw();
    surface3.draw();


    // update canvas
    requestAnimationFrame(update);
}
// first call
update();