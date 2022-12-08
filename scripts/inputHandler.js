addEventListener("keydown", function(e)
{
    if (e.code == "KeyD") { player.vx = player.step; }
    if (e.code == "KeyA") { player.vx = -player.step; }
    if (e.code == "KeyS") { player.vy = player.step; }
    if ((e.code == "KeyW" || e.code == "Space")&& player.canJump()) { player.jump(); player.jumpCount++; }
})

addEventListener("keyup", function(e)
{
    if (e.code == "KeyD" || e.code == "KeyA") { player.vx = 0; }
    if (e.code == "KeyS") { player.vy = 0; }
})


// this doesn't work and i have no idea why
// but its okay we're trying something different now
// 
// function getMousePosition(canvas, event) {
//     let rect = canvas.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;

//     x = Math.floor(x/75)*75;
//     y = Math.floor(y/75)*75;

//     level.appendSurface(new Brick(new Vector(x,y)));
    

//     console.log("Coordinate x: " + x, 
//                 "Coordinate y: " + y);
// }
// addEventListener("mousedown", function(e)
// {
//     getMousePosition(canvas, e);
// });