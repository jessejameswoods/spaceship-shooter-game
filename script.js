const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player spaceship
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
};

// Bullets
const bullets = [];
const bulletSpeed = 8;

// Enemy spaceships
const enemies = [];
const enemySpeed = 2;

// Keyboard input
const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

function spawnEnemy() {
    const enemyWidth = 20;
    const enemyHeight = 20;
    const x = Math.random() * (canvas.width - enemyWidth);
    enemies.push({ x, y: -enemyHeight, width: enemyWidth, height: enemyHeight });
}

function spawnBullet() {
    const bulletWidth = 5;
    const bulletHeight = 15;
    const x = player.x + player.width / 2 - bulletWidth / 2;
    bullets.push({ x, y: player.y - bulletHeight, width: bulletWidth, height: bulletHeight });
}

function updateGame() {
  // Move player spaceship
if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
}
if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
}
if (keys["Space"]) {
    spawnBullet();
}

// Move bullets
for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= bulletSpeed;
    if (bullets[i].y < 0) {
        bullets.splice(i, 1);
        i--;
    }
}

// Move enemies
for (let i = 0; i < enemies.length; i++) {
    enemies[i].y += enemySpeed;
    if (enemies[i].y > canvas.height) {
        enemies.splice(i, 1);
        i--;
    }
}

// Spawn enemies
if (Math.random() < 0.01) {
    spawnEnemy();
}

// Collision detection
for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
        if (
            bullets[j].x < enemies[i].x + enemies[i].width &&
            bullets[j].x + bullets[j].width > enemies[i].x &&
            bullets[j].y < enemies[i].y + enemies[i].height &&
            bullets[j].y + bullets[j].height > enemies[i].y
        ) {
            enemies.splice(i, 1);
            i--;
            bullets.splice(j, 1);
            j--;
            break;
        }
    }
}

// Draw the game
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw player spaceship
ctx.fillStyle = "white";
ctx.fillRect(player.x, player.y, player.width, player.height);

// Draw bullets
ctx.fillStyle = "red";
for (const bullet of bullets) {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}

// Draw enemies
ctx.fillStyle = "green";
for (const enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

requestAnimationFrame(updateGame);
}

// Start the game loop
updateGame();
