// Main game

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 8;

var s = new Player(new Vector(0,0), ctx, 50, 50);