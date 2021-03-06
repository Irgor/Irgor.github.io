var canvas, ctx, pts;
var points = 0;
var squarePts = 1;
var fps = 200;
var hF = 800, wF = 800;

var x = 0, y = 0;

var s = 80;
var gap = 20;
var lg = 8;

var neverClicked = true;
var isLastClickIn = false;
var lastClickIn = { i: 0, j: 0 };

var map = Array.from(Array(lg).keys());

const ale = new Image();
ale.src = './assets/ale.png';

const bong = new Image();
bong.src = './assets/bong.png';

const chin = new Image();
chin.src = './assets/chin.png';

const gh = new Image();
gh.src = './assets/gh.png';

const gus = new Image();
gus.src = './assets/gus.png';

const igao = new Image();
igao.src = './assets/igao.png';

const joel = new Image();
joel.src = './assets/joel.png';

const lou = new Image();
lou.src = './assets/lou.png';

const mari = new Image();
mari.src = './assets/mari.png';

const nic = new Image();
nic.src = './assets/nic.png';

const riq = new Image();
riq.src = './assets/riq.png';

const wil = new Image();
wil.src = './assets/wil.png';

const squareType = [ale, gus, igao, lou, mari, riq, wil];

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    pts = document.getElementById('points');

    createMap();
    setInterval(game, fps);

    document.addEventListener('click', function (e) {
        if (neverClicked) {
            neverClicked = false;
        }

        let elemLeft = canvas.offsetLeft + canvas.clientLeft
        let elemTop = canvas.offsetTop + canvas.clientTop;
        let x = e.pageX - elemLeft, y = e.pageY - elemTop;

        const checkCick = (i, j) => {
            let ex = map[i][j].x;
            let ey = map[i][j].y;

            if (y > ey && y < ey + s && x > ex && x < ex + s) {
                if (isLastClickIn) {
                    if (map[i - 1] && map[i - 1][j].clickIn == true) {
                        swap({ i: i - 1, j: j, image: map[i - 1][j].image, eix: 'Y' }, { i, j });
                    }

                    if (map[i + 1] && map[i + 1][j].clickIn == true) {
                        swap({ i: i + 1, j: j, image: map[i + 1][j].image, eix: 'Y' }, { i, j });
                    }

                    if (map[i][j + 1] && map[i][j + 1].clickIn == true) {
                        swap({ i: i, j: j + 1, image: map[i][j + 1].image, eix: 'X' }, { i, j });
                    }

                    if (map[i][j - 1] && map[i][j - 1].clickIn == true) {
                        swap({ i: i, j: j - 1, image: map[i][j - 1].image, eix: 'X' }, { i, j });
                    }

                } else {
                    isLastClickIn = true;
                    map[i][j].clickIn = true;
                    lastClickIn.i = i;
                    lastClickIn.j = j;

                    if (map[i][j].image == bong) {
                        killBomb(i, j);
                        map[i][j].clickIn = false;
                        isLastClickIn = false;
                    }

                    if (map[i][j].image == chin) {
                        killRow(i);
                        killColumn(j);

                        map[i][j].clickIn = false;
                        isLastClickIn = false;
                    }
                }
            }
        }

        doAllSquares(checkCick);

    }, false);

}

async function swap(origin, target, canBack = true) {
    isLastClickIn = false;
    const originImage = map[origin.i][origin.j].image;
    const targetImage = map[target.i][target.j].image;

    map[origin.i][origin.j].clickIn = false;

    map[origin.i][origin.j].image = targetImage;
    map[target.i][target.j].image = originImage;

    const hasMatch = detectMoveMatchs();

    if(!hasMatch && originImage != joel && origin != gh && canBack) {
        await setTimeout(() => {
            swap(target, origin, false);
            return;
        }, 200);
    }

    if (originImage == joel) {
        if (origin.eix == 'X') {
            killRow(target.i);
        }
        if (origin.eix == 'Y') {
            killColumn(target.j);
        }
    }

    if (origin.image == gh) {
        map[target.i][target.j].image = null;
        killAllSame(targetImage);
    }
}

function killAllSame(target) {
    let count = 0
    const killAll = (i, j) => {
        if (map[i][j].image == target) {
            map[i][j].image = null;
            count++;
        }
    }

    doAllSquares(killAll);

    points += count * squarePts;
}

function killColumn(row) {
    for (let i = 0; i < lg; i++) {
        map[i][row].image = null;
    }
}

function killRow(column) {
    for (let j = 0; j < lg; j++) {
        map[column][j].image = null;
    }
}

function game() {
    pts.innerHTML = points
    drawnBackground();
    drawnSquares();
    detectPowerUps();
    detectMatchs();

    generateNewSquare();
    fallSquares();
}

function generateNewSquare() {
    for (let i = 0; i < lg; i++) {
        if (!map[0][i].image) {
            map[0][i].image = squareType[Math.floor((Math.random() * squareType.length))];
        }
    }
}

function detectPowerUps() {
    const check = (i, j) => {
        const image = map[i][j].image;

        if (!map[i][j].image) {
            return;
        }

        // agua do bong
        if (!!map[i - 1] && !!map[i + 1] && map[i - 1][j].image == image && map[i + 1][j].image == image) {
            if (!!map[i - 1][j + 1] && !!map[i - 1][j + 2] && map[i - 1][j + 1].image == image && map[i - 1][j + 2].image == image) {
                map[i - 1][j].image = null;
                map[i + 1][j].image = null;
                map[i - 1][j + 1].image = null;
                map[i - 1][j + 2].image = null;
                map[i][j].image = bong;
            }
        }
        if (!!map[i - 1] && !!map[i + 1] && map[i - 1][j].image == image && map[i + 1][j].image == image) {
            if (!!map[i - 1][j - 1] && !!map[i - 1][j - 2] && map[i - 1][j - 1].image == image && map[i - 1][j - 2].image == image) {
                map[i - 1][j].image = null;
                map[i + 1][j].image = null;
                map[i - 1][j - 1].image = null;
                map[i - 1][j - 2].image = null;
                map[i][j].image = bong;
            }
        }
        if (!!map[i][j - 1] && !!map[i][j + 1] && map[i][j - 1].image == image && map[i][j + 1].image == image) {
            if (!!map[i + 1] && !!map[i + 2] && map[i + 1][j].image == image && map[i + 2][j].image == image) {
                map[i + 1][j].image = null;
                map[i + 2][j].image = null;
                map[i][j - 1].image = null;
                map[i][j + 1].image = null;
                map[i][j].image = bong;
            }
        }
        if (!!map[i - 2] && !!map[i - 1] && map[i - 2][j].image == image && map[i - 1][j].image == image) {
            if (!!map[i][j - 1] && !!map[i][j - 2] && map[i][j - 1].image == image && map[i][j - 2].image == image) {
                map[i - 2][j].image = null;
                map[i - 1][j].image = null;
                map[i][j - 1].image = null;
                map[i][j - 2].image = null;
                map[i][j].image = bong;
            }
        }
        if (!!map[i - 2] && !!map[i - 1] && map[i - 2][j].image == image && map[i - 1][j].image == image) {
            if (!!map[i][j + 1] && !!map[i][j + 2] && map[i][j + 1].image == image && map[i][j + 2].image == image) {
                map[i - 2][j].image = null;
                map[i - 1][j].image = null;
                map[i][j + 1].image = null;
                map[i][j + 2].image = null;
                map[i][j].image = bong;
            }
        }
        if (!!map[i - 1] && !!map[i - 2] && map[i - 1][j].image == image && map[i - 2][j].image == image) {
            if (!!map[i][j - 1] && !!map[i][j + 1] && map[i][j - 1].image == image && map[i][j + 1].image == image) {
                map[i - 1][j].image = null;
                map[i - 2][j].image = null;
                map[i][j - 1].image = null;
                map[i][j + 1].image = null;
                map[i][j].image = bong;
            }
        }

        //Brigadeiro
        if (!!map[i - 2] && !!map[i - 1] && !!map[i + 1] && !!map[i + 2] && map[i - 2][j].image == image && map[i - 1][j].image == image && map[i + 1][j].image == image && map[i + 2][j].image == image) {
            map[i - 2][j].image = null;
            map[i - 1][j].image = null;
            map[i + 2][j].image = null;
            map[i + 1][j].image = null;
            map[i][j].image = gh;
        }
        if (!!map[i][j - 2] && !!map[i][j - 1] && !!map[i][j + 1] && !!map[i][j + 2] && map[i][j - 2].image == image && map[i][j - 1].image == image && map[i][j + 1].image == image && map[i][j + 2].image == image) {
            map[i][j - 2].image = null;
            map[i][j - 1].image = null;
            map[i][j + 2].image = null;
            map[i][j + 1].image = null;
            map[i][j].image = gh;
        }

        // joel
        if (!!map[i][j - 1] && !!map[i][j - 2] && !!map[i][j + 1] && map[i][j - 1].image == image && map[i][j - 2].image == image && map[i][j + 1].image == image) {
            if (!!map[i][j - 1].image && !!map[i][j - 2].image && !!map[i][j + 1].image) {
                map[i][j - 1].image = null;
                map[i][j + 1].image = null;
                map[i][j].image = null;
                map[i][j - 2].image = joel;
            }
        }
        if (!!map[i - 1] && !!map[i - 2] && !!map[i + 1] && map[i - 1][j].image == image && map[i - 2][j].image == image && map[i + 1][j].image == image) {
            if (!!map[i - 1][j].image && !!map[i - 2][j].image && !!map[i + 1][j].image) {
                map[i - 1][j].image = null;
                map[i + 1][j].image = null;
                map[i][j].image = null;
                map[i - 2][j].image = joel;
            }
        }

        //xina
        if (!!map[i - 1] && !!map[i][j + 1] && !!map[i - 1][j + 1] && map[i - 1][j].image == image && map[i][j + 1].image == image && map[i - 1][j + 1].image == image) {
            map[i - 1][j].image = null;
            map[i - 1][j + 1].image = null;
            map[i][j + 1].image = null;
            map[i][j].image = chin;
        }
    }

    doAllSquares(check);
}

function detectMoveMatchs() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const resp = check(i, j, true);
            if (resp) {
                return true;
            }
        }
    }
}

function check(i, j, returnOnFirst = false) {
    const image = map[i][j].image;
    let exploded = false;

    if (!!map[i - 1] && !!map[i + 1] && map[i - 1][j].image == image && map[i + 1][j].image == image) {
        if (returnOnFirst) {
            return true;
        }
        map[i - 1][j].image = null;
        map[i][j].image = null;
        map[i + 1][j].image = null;
        exploded = true;
    }

    if (!!map[i][j - 1] && !!map[i][j + 1] && map[i][j - 1].image == image && map[i][j + 1].image == image) {
        if (returnOnFirst) {
            return true;
        }
        map[i][j - 1].image = null;
        map[i][j].image = null;
        map[i][j + 1].image = null;
        exploded = true;
    }

    if (exploded) {
        if (!neverClicked) {
            points += (squarePts * 3);
        }
    }
}

function detectMatchs() {
    doAllSquares(check);
}

function killBomb(i, j) {
    map[i][j - 1].image = null;
    map[i][j].image = null;
    map[i][j + 1].image = null;

    if (!!map[i + 1]) {
        map[i + 1][j].image = null;

        if (!!map[i + 1][j - 1]) {
            map[i + 1][j - 1].image = null
        }

        if (!!map[i + 1][j + 1]) {
            map[i + 1][j + 1].image = null
        }
    }

    if (!!map[i - 1]) {
        map[i - 1][j].image = null;

        if (!!map[i - 1][j - 1]) {
            map[i - 1][j - 1].image = null
        }

        if (!!map[i - 1][j + 1]) {
            map[i - 1][j + 1].image = null
        }
    }

    points += (squarePts * 9);
}

function fallSquares() {
    const fall = (i, j) => {
        if (!!map[i][j].image && map[i + 1] && !map[i + 1][j].image) {
            map[i + 1][j].image = map[i][j].image
            map[i][j].image = null;
        }
    }

    doAllSquares(fall);
}


function doAllSquares(fn) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            fn(i, j);
        }
    }
}


function drawnRect(x, y, w, h, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function createMap() {
    for (let i = 0; i < map.length; i++) {
        map[i] = [];
        for (let j = 0; j < lg; j++) {
            map[i].push({ x: 0, y: 0, image: null });
        }
    }
    makeSquares();
}

function makeSquares() {
    for (let i = 0; i < map.length; i++) {
        y += (gap / 2);
        for (let j = 0; j < map[i].length; j++) {
            x += (gap / 2);
            map[i][j].x = x;
            map[i][j].y = y;

            map[i][j].image = squareType[Math.floor((Math.random() * squareType.length))];
            map[i][j].clickIn = false;
            map[i][j].clickOut = false;

            x += s + (gap / 2);
        }
        x = 0;
        y += s + (gap / 2);
    }
}

function drawnBackground() {
    drawnRect(0, 0, hF, wF);
}

function drawnSquares() {
    const drawn = (i, j) => {
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'white';
        let ax = map[i][j].x;
        let ay = map[i][j].y;
        if (map[i][j].clickIn) {
            ctx.strokeStyle = 'yellow';
        }
        ctx.strokeRect(ax, ay, s, s);
        if (map[i][j].image) {
            ctx.drawImage(map[i][j].image, ax, ay, s, s);
        }
    }
    doAllSquares(drawn);
}