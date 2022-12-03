addEventListener("keydown", function(e)
{
    if (e.code == "KeyD") { player.vx = player.step; }
    if (e.code == "KeyA") { player.vx = -player.step; }
    if (e.code == "KeyS") { player.vy = player.step; }
    if (e.code == "KeyW" && player.canJump()) { player.jump(); player.jumpCount++; }
})

addEventListener("keyup", function(e)
{
    if (e.code == "KeyD" || e.code == "KeyA") { player.vx = 0; }
    if (e.code == "KeyS") { player.vy = 0; }
})