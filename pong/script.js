var canvas;
var ctx;

var pointsToWin = 10;

var musicStarted = false;

var gameInterval;
var enemyMoveInterval;

var vw = window.innerWidth - 600;
var vh = window.innerHeight - 200;

var myPoints = 0;
var enemyPoints = 0;

var myPointsDiv;
var enemyPointsDiv;

var dif = 60;
var hitboxBonus = 20;

charh = 120;
charw = 24;
charmove = 10;
char = {
    x: vw / 8,
    y: (vh / 2 - (charh / 2)),
    w: charw,
    h: charh,
    vy: 0
}

enemyh = 120;
enemyw = 24;
enemymove = 20;
enemy = {
    x: vw - (vw / 8),
    y: (vh / 2 - (enemyh / 2)),
    w: enemyw,
    h: enemyh,
    vy: 0
}

ballh = 24;
ballw = 24;
ballmove = 10;
ball = {
    x: (vw / 2) - (ballw / 2),
    y: (vh / 2) - (ballh / 2),
    w: ballw,
    h: ballh,
    vy: 0,
    vx: 0
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', vw);
    canvas.setAttribute('height', vh);
    ctx = canvas.getContext('2d');

    myPointsDiv = document.getElementById("playerP");
    enemyPointsDiv = document.getElementById("enemyP");

    game(false);
}

function start() {
    myPoints = 0;
    enemyPoints = 0;

    resetPositions();

    randomStartBall();

    document.getElementById('message').style.display = 'none';
    document.getElementById('play').style.display = 'none';

    gameInterval = setInterval(game, 30);
    enemyMoveInterval = setInterval(enemyMove, dif);

    if(!musicStarted){
        let ost = new Audio('ost.mp3');
        ost.volume = 0.1;
        ost.loop = true;
        ost.play();
    }
}

function resetPositions() {
    char.y = (vh / 2 - (charh / 2));
    enemy.y = (vh / 2 - (enemyh / 2));
}

function randomStartBall() {
    let randX = (Math.random() * (ballmove * 2)) - ballmove;
    let randY = (Math.random() * (ballmove * 2)) - ballmove;

    let vx = randX > 0 ? ballmove : -ballmove;
    let vy = randY > 0 ? ballmove / 2 : -ballmove / 2;

    ball.vx = vx;
    ball.vy = vy;
}

async function game(ball = true) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, vw, vh);


    ctx.fillStyle = 'white';
    drawnChar();
    drawnEnemy();
    if (ball) {
        drawnBall();
    }
    await checkWinner();
}

function drawnChar() {
    char.y += char.vy;

    if (char.y + charh >= vh) {
        char.y = vh - charh;
    }

    if (char.y <= 0) {
        char.y = 0;
    }

    ctx.fillRect(char.x, char.y, char.w, char.h);
}

function drawnBall() {
    checkBallPlayerColision();
    checkBallEnemyColision();

    let wall = new Audio('wall.mp3');
    wall.volume = 0.5;

    if (ball.y + ballh >= vh) {
        ball.vy = -ballmove / 2;
        wall.play();
    }

    if (ball.y <= 0) {
        ball.vy = +ballmove / 2;
        wall.play();
    }

    ball.y += ball.vy;
    ball.x += ball.vx;

    ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
}

function checkBallPlayerColision() {
    let isXallign = ball.x - ball.x % 10 == Math.floor(char.x + char.w) - Math.floor(char.x + char.w) % 10;

    let isYallign = ball.y > char.y - hitboxBonus && ball.y + ball.h < char.y + (char.h + hitboxBonus);

    let colid = isXallign && isYallign;
    if (colid) {
        ball.vx = -ball.vx;

        let b = new Audio('b.mp3');
        b.volume = 0.5;
        b.play();
    }
}

function checkBallEnemyColision() {
    let isXallign = Math.floor(ball.x + ball.w) - Math.floor(ball.x + ball.w) % 10 == Math.floor(enemy.x) - Math.floor(enemy.x) % 10;

    let isYallign = ball.y > enemy.y - hitboxBonus && ball.y + ball.h < enemy.y + (enemy.h + hitboxBonus);

    let colid = isXallign && isYallign;
    if (colid) {
        ball.vx = ball.vx * -1;

        let b = new Audio('b.mp3');
        b.volume = 0.5;
        b.play();
    }
}

function drawnEnemy() {
    enemy.y += enemy.vy;

    if (enemy.y + enemyh >= vh) {
        enemy.y = vh - enemyh;
    }

    if (enemy.y <= 0) {
        enemy.y = 0;
    }

    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
}

function enemyMove() {
    let moveR = Math.floor((Math.random() * 100)) + 1;

    if (moveR % 2 == 0) {
        let isBallUpperEnemy = ball.y + (ball.h / 2) > enemy.y + (enemy.h / 2);
        if (isBallUpperEnemy) {
            enemy.y += enemymove;
        } else {
            enemy.y -= enemymove;
        }
    }
}

async function checkWinner() {
    let hasWinner = false;

    if (ball.x <= 0) {
        enemyPoints++;
        hasWinner = true;
    }
    if (ball.x + ball.w >= vw) {
        myPoints++;
        hasWinner = true;
    }

    myPointsDiv.innerHTML = myPoints;
    enemyPointsDiv.innerHTML = enemyPoints;

    if (hasWinner) {
        resetPositions();
        ball.x = (vw / 2) - (ballw / 2);
        ball.y = (vh / 2) - (ballh / 2);

        let score = new Audio('win.mp3');
        score.volume = 0.1;
        score.play();


        clearInterval(gameInterval);

        let message = document.getElementById('message');
        if (myPoints == pointsToWin) {
            document.getElementById('play').style.display = 'block';
            message.innerHTML = 'You Win';
            message.style.display = 'block';
        } else if (enemyPoints == pointsToWin) {
            document.getElementById('play').style.display = 'block';
            message.innerHTML = 'You Lose';
            message.style.display = 'block';
        } else {
            setTimeout(() => {
                gameInterval = setInterval(game, 30)
            }, 1200);
        }

    }
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        char.vy = -charmove;
    }

    if (e.key == 'ArrowDown') {
        char.vy = +charmove;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowUp') {
        char.vy = 0;
    }

    if (e.key == 'ArrowDown') {
        char.vy = 0;
    }
})