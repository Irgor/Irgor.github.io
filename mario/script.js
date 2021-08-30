var gameInterval;
var bInterval;

var st;

var pause = true;

var marioS;
var marioW;
var marioJ;

var menu;
var menuR;

g = 1;

var points = 0;
var pDiv;

platW = 400;
plats = []

move = 5;
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

baseChar = {
    x: wall / 2 - 50,
    y: floor - 80,
    vx: 0,
    vy: 0
};

bulletImg = 'https://66.media.tumblr.com/65886392680e19404e112c42855074fc/tumblr_mqatw123nu1rfjowdo1_500.gif';
bRate = 500;
bSpeed = 5.5;
bSize = '60'
bHeight = '40';
bW = +bSize;
bH = +bHeight;
lastB = 0;
bullets = []


function restart() {
    location.reload();
}

function start() {
    pause = false;

    char.x = wall / 2 - 50;
    char.y = floor - 80;
    char.vx = 0;
    char.vy = 0;

    for (let bu of bullets) {
        const b = document.getElementById('b' + bu.id);
        if (b) {
            b.parentNode.removeChild(b);
        }
    }

    bullets = [];

    generatePlats();

    menu = document.getElementById('menu');
    menu.style.display = 'none';

    menuR = document.getElementById('menuR');

    pDiv = document.getElementById('points');

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


function generatePlats() {
    let plat1 = {
        x: platW / 2,
        y: floor - 150,
        id: 'p1'
    };

    const img1 = document.getElementById(plat1.id);
    img1.style.left = plat1.x + 'px';
    img1.style.top = plat1.y + 'px';
    img1.style.display = 'block';

    plats.push(plat1);


    let plat2 = {
        x: wall - platW - (platW / 2),
        y: floor - 150,
        id: 'p2'
    };

    const img2 = document.getElementById(plat2.id);
    img2.style.left = plat2.x + 'px';
    img2.style.top = plat2.y + 'px';
    img2.style.display = 'block';

    plats.push(plat2);


    let plat3 = {
        x: (wall / 2) - (platW / 2),
        y: floor - 350,
        id: 'p3'
    };

    const img3 = document.getElementById(plat3.id);
    img3.style.left = plat3.x + 'px';
    img3.style.top = plat3.y + 'px';
    img3.style.display = 'block';

    plats.push(plat3);
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

    if (char.vx == 0) {
        stopChar();
    }

    if (char.vx > 0) {
        orR();
        moveChar();
    }

    if (char.vx < 0) {
        orL();
        moveChar();
    }

    if (jumping) {
        jumpMario();
    }

    char.vy += g;
    char.y += char.vy;

    for (let plat of plats) {
        let isXAlign = char.x >= plat.x - 50 && char.x <= plat.x + platW;

        let isYAlign = char.y + 85 >= plat.y - 10 && char.y + 85 <= plat.y + 10;

        if (isXAlign && isYAlign) {
            char.y = plat.y - 85;
            char.vy = 0;

            if (jumping) {
                if (char.vx > 1 || char.vx < -1) {
                    moveChar();
                } else {
                    stopChar();
                }
                jumping = false;
            }
        }
    }

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

    bSpeed += 0.0025;
    bW += 0.005;
    bH += 0.005;
    bSize = bW.toString();
    bHeight = bH.toString();

    console.log(bSize, bHeight);

    if (points == 100) {
        st.pause();
        st.currentTime = 0;

        clearInterval(gameInterval);
        clearInterval(bInterval)

        let swin = new Audio('win.mp3');
        swin.volume = 0.6;
        swin.play();

        let menuW = document.getElementById('menuW');
        menuW.style.display = 'flex';

    }

}


function makeBullet() {
    const div = document.getElementById('b-container');

    const upperGap = 100;

    let bullet = {
        id: bullets.length + 1,
        x: wall + 100,
        y: (Math.random() * (floor - upperGap)) + upperGap,
        vx: -bSpeed,
        vy: 0,
    }

    const bImage = document.createElement('img');
    bImage.setAttribute('id', 'b' + bullet.id);
    bImage.setAttribute('src', bulletImg)
    bImage.setAttribute('width', bSize)
    bImage.setAttribute('height', bHeight)
    bImage.style.position = 'absolute';
    bImage.style.zIndex = '2';

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

    points++;
    pDiv.innerHTML = points;
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

        if (jumping) {
            jumpMario();
        } else {
            stopChar();
        }

        setTimeout(() => {
            let go = new Audio('go.mp3');
            go.volume = 0.2;
            go.play();
        }, 200);

        setTimeout(() => {
            menuR.style.display = 'flex';
        }, 250);

    }
}


window.addEventListener('keydown', (e) => {
    if (!pause) {
        if (e.key == 'ArrowRight') {
            char.vx = move;
        }

        if (e.key == 'ArrowLeft') {
            char.vx = -move;
        }

        if (e.key == 'ArrowUp') {
            if (char.vy == 0) {
                let jSound = new Audio('j.mp3');
                jSound.play();

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
            while (char.vx > 0) {
                char.vx -= move / 4;
            }
        }

        if (e.key == 'ArrowLeft') {
            while (char.vx < 0) {
                char.vx += move / 4;
            }
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
