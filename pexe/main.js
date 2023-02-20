var px;
var dotts = 0;
var isMobile
window.onload = function () {
    px = document.getElementById('px');
    dots();
    isMobile = detectMob();
}

window.onmousemove = function (e) {
    if (px) {
        px.style.left = e.pageX + 'px';
        px.style.top = e.pageY + 'px';
    }
}

window.onmousedown = function () {
    document.getElementById('px').style.boxShadow = '0px 0px 500px 250px #ffff001f'
}

window.onmouseup = function () {
    document.getElementById('px').style.boxShadow = '0px 0px 200px 100px #ffff001f'
}

function dots() {
    for (let i = 0; i < 350; i++) {
        var main = document.getElementById('main')
        const dot = document.createElement('div');
        dot.classList.add('dot')

        dot.style.left = Math.floor(Math.random() * document.documentElement.scrollWidth - 25) + 'px';
        dot.style.top = Math.floor(Math.random() * document.documentElement.scrollHeight - 25) + 'px';

        const height = Math.floor(Math.random() * 16) + 1;
        dot.style.height = height + 'px'
        dot.style.width = dot.style.height

        const alpha = Math.floor(Math.random() * 15) + 1;
        dot.style.backgroundColor = `rgba(255, 255, 255, 0.${alpha})`

        dot.style.animationDuration = Math.floor(Math.random() * 15) + 8 + 's';
        dot.style.animationName = 'move' + (Math.floor(Math.random() * 4) + 1);


        main.appendChild(dot);
        dotts++;
    }

    console.log(dotts + ' dots');
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}