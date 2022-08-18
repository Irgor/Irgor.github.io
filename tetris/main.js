var canvas, ctx;

var side = 20;

map = [];
blocks = [];
stopedIds = [0];
actualBlock = 0;
moveVelocity = 500;
fastVelocity = 40;
var moveInterval;

keys = {};

colors = ['red', 'blue', '#e3c609', 'green'];

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    buildMap();
    callBlock();
    setInterval(game, 100)
    callMoveInterval();
}

function callMoveInterval() {
    moveInterval = setInterval(moves, moveVelocity);
}

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    moveBlock();
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    moveBlock();
});

function buildMap() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 20; i++) {
        map[i] = [];
        for (let j = 0; j < 10; j++) {
            map[i].push({ x, y, block: false, color: null, blockR: false, blockL: false });
            x += side;
        }
        x = 0;
        y += side;
    }
}

function game() {
    square(0, 0, 200, 400);
    drawMap();
}

function moves() {
    checkGrav();
}

function moveBlock() {
    if (keys.ArrowRight) {
        moveRigthPiece(1)
    }

    if (keys.ArrowLeft) {
        moveLeftPiece(-1)
    }

    if (keys.ArrowDown) {
        if (moveVelocity != fastVelocity) {
            newMoveInterval(fastVelocity)
        }
    } else {
        newMoveInterval(500);
    }
}

function newMoveInterval(velocity) {
    clearInterval(moveInterval);
    moveVelocity = velocity;
    callMoveInterval();
}

function moveRigthPiece(dir) {
    for (let i = map.length - 1; i != -1; i--) {
        for (let j = 9; j > -1; j--) {
            const celula = map[i][j];
            if (celula.id == actualBlock) {
                checkMoveRigthAllSame(actualBlock, i, j, dir);
                if (map[i][j + dir] && map[i][j + dir].id !== actualBlock && !map[i][j].blockR) {
                    let color = map[i][j].color;
                    let id = map[i][j].id;
                    map[i][j].color = null;
                    map[i][j].block = false;
                    map[i][j].id = null;
                    map[i][j + dir].block = true;
                    map[i][j + dir].color = color;
                    map[i][j + dir].id = id;
                }

            }
        }
    }
}

function blockRightId(id) {
    for (let linha of map) {
        for (let celula of linha) {
            if (celula.id == id) {
                celula.blockR = true;
            }
        }
    }
}

function checkMoveRigthAllSame(id, iabove, jabove, dir) {
    let firstRow = true;
    for (let i = iabove; i > -1; i--) {
        const jstart = firstRow ? jabove : 9;
        firstRow = false;
        for (let j = jstart; j > -1; j--) {
            if (map[i][j + dir] && map[i][j].id == id && map[i][j + dir].block && map[i][j + dir].id != id) {
                blockRightId(id);
            }
            if (!map[i][j + dir] && map[i][j].id == id) {
                blockRightId(id);
            }
        }
    }
}

function moveLeftPiece(dir) {
    for (let i = map.length - 1; i != -1; i--) {
        for (let j = 0; j < 10; j++) {
            const celula = map[i][j];
            if (celula.id == actualBlock) {
                checkMoveLeftAllSame(actualBlock, i, j, dir);
                if (map[i][j + dir] && map[i][j + dir].id !== actualBlock && !map[i][j].blockL) {
                    let color = map[i][j].color;
                    let id = map[i][j].id;
                    map[i][j].color = null;
                    map[i][j].block = false;
                    map[i][j].id = null;
                    map[i][j + dir].block = true;
                    map[i][j + dir].color = color;
                    map[i][j + dir].id = id;
                }

            }
        }
    }
}

function blockLeftId(id) {
    for (let linha of map) {
        for (let celula of linha) {
            if (celula.id == id) {
                celula.blockL = true;
            }
        }
    }
}

function checkMoveLeftAllSame(id, iabove, jabove, dir) {
    let firstRow = true;
    for (let i = iabove; i > -1; i--) {
        const jstart = firstRow ? jabove : 9;
        firstRow = false;
        for (let j = jstart; j < 10; j++) {
            if (map[i][j + dir] && map[i][j].id == id && map[i][j + dir].block && map[i][j + dir].id != id) {
                blockLeftId(id);
            }
            if (!map[i][j + dir] && map[i][j].id == id) {
                blockLeftId(id);
            }
        }
    }
}

function callBlock() {
    newMoveInterval(500);
    spawnBlock();
}

function spawnBlock() {
    const color = colors[Math.floor(Math.random() * colors.length)];

    const j = 4;
    const i = 0;

    const id = Math.max(...stopedIds) + 1;
    actualBlock = id;

    map[i][j].color = color;
    map[i][j].block = true;
    map[i][j].id = id;

    buildRandomBlock(i, j, color, id);
}

function buildRandomBlock(i, j, color, id) {
    const pecs = pecas(color);
    pecs[Math.floor(Math.random() * pecs.length)](i, j, id);
}

const pecas = (color) => [
    (i, j, id) => {
        createBlock(i + 1, j, color, id);
        createBlock(i, j + 1, color, id);
        createBlock(i, j + 2, color, id);
    },
    (i, j, id) => {
        createBlock(i + 1, j, color, id);
        createBlock(i + 2, j, color, id);
        createBlock(i + 2, j + 1, color, id);
    },
    (i, j, id) => {
        createBlock(i + 1, j, color, id);
        createBlock(i, j + 1, color, id);
        createBlock(i + 1, j + 1, color, id);
    },
    (i, j, id) => {
        createBlock(i + 1, j, color, id);
        createBlock(i + 2, j, color, id);
        createBlock(i + 3, j, color, id);
        createBlock(i + 4, j, color, id);
    },
    (i, j, id) => {
        createBlock(i + 1, j + 1, color, id);
        createBlock(i + 1, j - 1, color, id);
        createBlock(i + 1, j, color, id);
    }
];

function createBlock(i, j, color, id) {
    map[i][j].color = color;
    map[i][j].block = true;
    map[i][j].id = id;
}

function drawMap() {
    for (let [i, linha] of map.entries()) {
        for (let [j, celula] of linha.entries()) {
            if (celula.block) {
                drawBlock(celula.x, celula.y, celula.color)
            } else {
                stroke(celula.x, celula.y, side, side);
            }
        }
    }
}

function checkGrav() {
    for (let i = map.length - 1; i != -1; i--) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j].block) {
                const canMove = checkAllSame(map[i][j].id, i);
                if (map[i + 1] && !map[i + 1][j].block && !stopedIds.includes(map[i][j].id) && canMove) {
                    let color = map[i][j].color;
                    let id = map[i][j].id;
                    map[i][j].color = null;
                    map[i][j].block = false;
                    map[i][j].id = null;
                    map[i + 1][j].block = true;
                    map[i + 1][j].color = color;
                    map[i + 1][j].id = id;
                } else {
                    if (map[i][j].id && !stopedIds.includes(map[i][j].id)) {
                        stopedIds.push(map[i][j].id);
                        spawnBlock();
                    }
                }
            }
        }
    }
}

function checkAllSame(id, iabove) {
    let canMove = true;
    for (let i = iabove; i != -1; i--) {
        for (let j = 0; j < 10; j++) {
            if (map[i + 1] && map[i][j].id == id && map[i + 1][j].block && map[i + 1][j].id != id) {
                canMove = false;
            }
        }
    }
    return canMove;
}


function drawBlock(x, y, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, side, side);
    ctx.fillStyle = 'white';
    ctx.fillRect(x + 3, y + 3, 2, 2);
    ctx.fillRect(x + 3, y + 5, 2, 2);
    ctx.fillRect(x + 5, y + 3, 2, 2);
    stroke(x, y, side, side, 'black');
}

function stroke(x, y, w, h, c = 'white') {
    ctx.strokeStyle = c;
    ctx.strokeRect(x, y, w, h);
}

function square(x, y, w, h, c = 'black') {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}