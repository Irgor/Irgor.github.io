var px;
var dotts = 0;
var isMobile
window.onload = function () {
    px = document.getElementById('px');
    dots({ ctrlKey: false });
    isMobile = detectMob();
}

window.onmousemove = function (e) {
    if (px) {
        px.style.left = e.pageX + 'px';
        px.style.top = e.pageY + 'px';
    }
}

document.onmousedown = dots;

function dots(e) {
    if (!e.ctrlKey && !isMobile) {
        for (let i = 0; i < 200; i++) {
            var main = document.getElementById('main')
            const dot = document.createElement('div');
            dot.classList.add('dot')
            dot.style.left = Math.floor(Math.random() * document.documentElement.scrollWidth - 25) + 'px';
            dot.style.top = Math.floor(Math.random() * document.documentElement.scrollHeight - 25) + 'px';
            dot.style.animationDuration = Math.floor(Math.random() * 15) + 5 + 's';
            main.appendChild(dot);
            dotts++;
        }
    }

    if (e.ctrlKey && dotts > 0 && !isMobile) {
        for (let i = 0; i < 200; i++) {
            const dot = document.getElementsByClassName('dot')[0];
            dot.remove();
            dotts--;
        }
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