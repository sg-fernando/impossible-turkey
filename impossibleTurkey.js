// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 8;

const player = new Player(new Vector(0,0), ctx, 50, 50);

function update()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();
    
    requestAnimationFrame(update);
}

update();