addEventListener("keydown", function(e)
{
    if (e.code == "KeyD") player.vx = 5;
    if (e.code == "KeyA") player.vx = -5;
    if (e.code == "KeyS") player.vy = 5;
    if (e.code == "KeyW") player.jump();
})

addEventListener("keyup", function(e)
{
    if (e.code == "KeyD" || e.code == "KeyA") player.vx = 0;
    if (e.code == "KeyS") player.vy = 0;
})