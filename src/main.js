import menuState from "./states/menu";

// Initialize canvas
const canvas = document.getElementById("asteroids");
const ctx = canvas.getContext("2d");

// Initialize game menu state
menuState(canvas, ctx);
