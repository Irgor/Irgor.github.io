var marioS;
var marioW;
var marioJ;

g = 1;

move = 3;
jump = 20;

jumpMove = 0.5;
jumping = false;

floor = window.innerHeight - (window.innerHeight / 100 * 9);
wall = window.innerWidth;

char = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
};

window.onload = function () {
    this.marioS = document.getElementById('marioS');
    this.marioW = document.getElementById('marioW');
    this.marioJ = document.getElementById('marioJ')

    setInterval(game, 12);
}

function game() {
    char.x += char.vx;

    if (char.x <= 0) {
        char.vx = 0;
        char.x = 0;
    }

    if(char.x + 50 >= wall){
        char.vx = 0;
        char.x = wall - 50;
    }

    marioS.style.left = char.x + 'px';
    marioW.style.left = char.x + 'px';
    marioJ.style.left = char.x + 'px';

    char.vy += g;
    char.y += char.vy;

    if (char.y + 80 >= floor) {

        char.vy = 0;
        char.y = floor - 80;

        if (jumping) {
            if (char.vx > 1 || char.vx < -1) {
                moveChar();
            } else {
                stopChar();
            }
            jumping = false;
        }

    }

    marioS.style.top = char.y + 'px';
    marioW.style.top = char.y + 'px';
    marioJ.style.top = char.y + 'px';
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        char.vx = move;
        orR();
        moveChar();
    }

    if (e.key == 'ArrowLeft') {
        char.vx = -move;
        orL();
        moveChar();
    }

    if (e.key == 'ArrowUp') {
        if (char.y == floor - 80) {
            jumpMario();
            char.vy = -jump;

            if (char.vx > 0) {
                char.vx += char.vx * jumpMove;
            } else {
                char.vx -= char.vx * -jumpMove;
            }
        }
    }

})

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowRight') {
        char.vx = 0;
        stopChar();
    }

    if (e.key == 'ArrowLeft') {
        char.vx = 0;
        stopChar();
    }
});

function moveChar() {
    marioS.style.display = 'none';
    marioJ.style.display = 'none';
    marioW.style.display = 'block';
}

function stopChar() {
    marioS.style.display = 'block';
    marioW.style.display = 'none';
    marioJ.style.display = 'none';
}

function jumpMario() {
    jumping = true;
    marioS.style.display = 'none';
    marioW.style.display = 'none';
    marioJ.style.display = 'block';
}

function orL() {
    marioS.style.transform = 'rotateY(180deg)';
    marioW.style.transform = 'rotateY(180deg)';
    marioJ.style.transform = 'rotateY(180deg)';
}

function orR() {
    marioS.style.transform = 'rotateY(0deg)';
    marioW.style.transform = 'rotateY(0deg)';
    marioJ.style.transform = 'rotateY(0deg)';
}
