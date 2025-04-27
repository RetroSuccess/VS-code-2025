const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const gravity = 0.5;

let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  speed: 5,
  dx: 0,
  dy: 0,
  color: '#FFD700',
  isJumping: false,
};

let platforms = [
  { x: 0, y: 350, width: 800, height: 20 },
  { x: 200, y: 250, width: 100, height: 10 },
  { x: 400, y: 200, width: 150, height: 10 },
];

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  platforms.forEach(platform => {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function updatePlayer() {
  player.x += player.dx;
  player.y += player.dy;

  // Gravity effect
  if (player.y + player.height < canvas.height) {
    player.dy += gravity;
  } else {
    player.dy = 0;
    player.isJumping = false;
    player.y = canvas.height - player.height;
  }

  // Collision detection with platforms
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height < platform.y + gravity &&
      player.y + player.height > platform.y
    ) {
      player.dy = 0;
      player.isJumping = false;
      player.y = platform.y - player.height;
    }
  });

  // Boundary check
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function handleInput(e) {
  if (e.type === 'keydown') {
    if (e.key === 'ArrowRight') player.dx = player.speed;
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
    if (e.key === 'ArrowUp' && !player.isJumping) {
      player.dy = -10;
      player.isJumping = true;
    }
  } else if (e.type === 'keyup') {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') player.dx = 0;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  drawPlatforms();
  drawPlayer();
  updatePlayer();
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);

gameLoop();
