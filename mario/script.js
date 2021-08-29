var gameInterval;
var bInterval;

var st;

var pause = true;

var marioS;
var marioW;
var marioJ;

g = 1;

move = 4;
jump = 22;

jumpMove = 0.6;
jumping = false;

floor = window.innerHeight - (window.innerHeight / 100 * 9);
wall = window.innerWidth;

char = {
    x: wall / 2 - 50,
    y: floor - 80,
    vx: 0,
    vy: 0
};


bulletImg = 'https://66.media.tumblr.com/65886392680e19404e112c42855074fc/tumblr_mqatw123nu1rfjowdo1_500.gif';
bRate = 1000;
bSpeed = 5;
bSize = '60'
bHeight = '40';
bW = +bSize;
bH = +bHeight;
lastB = 0;
bullets = []


function start() {
    pause = false;

    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    this.marioS = document.getElementById('marioS');
    this.marioW = document.getElementById('marioW');
    this.marioJ = document.getElementById('marioJ')

    st = new Audio('ost.mp3');
    st.loop = true;
    st.volume = 0.12;
    st.play();

    gameInterval = setInterval(game, 12);
    bInterval = setInterval(makeBullet, bRate);
}

function game() {
    if (char.vx > move + (move * jumpMove)) {
        char.vx = move + (move * jumpMove);
    }
    if (char.vx < -move - (move * jumpMove)) {
        char.vx = -move - (move * jumpMove)
    }

    char.x += char.vx;

    if (char.x <= 0) {
        char.vx = 0;
        char.x = 0;
    }

    if (char.x + 50 >= wall) {
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

    for (let b of bullets) {
        if (b.id > lastB) {
            b.x += b.vx;
            renderBullet(b);
        }
    }
}


function makeBullet() {
    const div = document.getElementById('b-container');

    let bullet = {
        id: bullets.length + 1,
        x: wall + 100,
        y: (Math.random() * (floor - 50)) + 50,
        vx: -bSpeed,
        vy: 0,
    }

    const bImage = document.createElement('img');
    bImage.setAttribute('id', 'b' + bullet.id);
    bImage.setAttribute('src', bulletImg)
    bImage.setAttribute('width', bSize)
    bImage.setAttribute('height', bHeight)
    bImage.style.position = 'absolute';

    div.appendChild(bImage);

    bullets.push(bullet)

    setTimeout(() => {
        let bShot = new Audio('bullet.mp3');
        bShot.volume = 0.4;
        bShot.play();
    }, 100);

}

function renderBullet({ id, x, y }) {
    if (x < -50) {
        killBullet(id);
        return;
    }

    const b = document.getElementById('b' + id);
    b.style.left = x + 'px';
    b.style.top = y + 'px';
    checkColision(x, y)
}

function killBullet(id) {
    const b = document.getElementById('b' + id);
    b.parentNode.removeChild(b);
    lastB = id;
}

function checkColision(x, y) {
    let hitBox = 5;

    let nX = x + hitBox;
    let nY = y + hitBox;

    let bWH = bW - hitBox;
    let bHH = bH - hitBox;

    let colideXE = nX >= char.x && nX <= char.x + 50;
    let colideXD = nX + bWH >= char.x && nX + bWH <= char.x + 50;

    let colideYE = nY >= char.y && nY <= char.y + 80;
    let colideYD = nY + bHH >= char.y && nY + bHH <= char.y + 80;

    let colideX = colideXD || colideXE;
    let colideY = colideYD || colideYE;

    if (colideX && colideY) {
        pause = true;

        clearInterval(gameInterval);
        clearInterval(bInterval);

        st.pause();
        st.currentTime = 0;

        setTimeout(() => {
            let go = new Audio('go.mp3');
            go.volume = 0.2;
            go.play();
        }, 200);
    }
}


window.addEventListener('keydown', (e) => {
    if (!pause) {
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
    }
})

window.addEventListener('keyup', (e) => {
    if (!pause) {
        if (e.key == 'ArrowRight') {
            char.vx = 0;
            stopChar();
        }

        if (e.key == 'ArrowLeft') {
            char.vx = 0;
            stopChar();
        }
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

    let jSound = new Audio('j.mp3');
    jSound.play();

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
