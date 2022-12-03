// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 1;

const player = new Player(new Vector(0,0), ctx);

function update()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();
    player.animate();


    // update canvas
    requestAnimationFrame(update);
}
// first call
update();