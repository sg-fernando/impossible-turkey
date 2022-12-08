window.onload = function() {
    music_num = Math.floor(Math.random() * 2 + 1);
    music_id = "music" + music_num;
    document.getElementById(music_id).play();
    document.getElementById("start").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("gameover").style.display = "none";
}