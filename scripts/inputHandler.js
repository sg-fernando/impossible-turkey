

addEventListener("keydown", function(e)
{
    if (e.code in keys) keys[e.code] = true;
    if ((e.code == "KeyW" || e.code == "Space")&& player.canJump()) { player.jump(); player.jumpCount++; }
})

addEventListener("keyup", function(e)
{
    if (e.code in keys) keys[e.code] = false;
})
