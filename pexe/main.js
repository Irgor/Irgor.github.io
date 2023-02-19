var px;
var dotts = 0;
window.onload = function () {
    px = document.getElementById('px');
    dots({ ctrlKey: false });
}

window.onmousemove = function (e) {
    if (px) {
        px.style.left = e.pageX + 'px';
        px.style.top = e.pageY + 'px';
    }
}

document.onmousedown = dots;

function dots(e) {
    if (!e.ctrlKey) {
        for (let i = 0; i < 100; i++) {
            var main = document.getElementById('main')
            const dot = document.createElement('div');
            dot.classList.add('dot')
            dot.style.left = Math.floor(Math.random() * document.documentElement.scrollWidth) + 'px';
            dot.style.top = Math.floor(Math.random() * document.documentElement.scrollHeight) + 'px';
            dot.style.animationDuration = Math.floor(Math.random() * 15) + 5 + 's';
            main.appendChild(dot);
            dotts++;
        }
    }

    if (e.ctrlKey && dotts > 0) {
        for (let i = 0; i < 100; i++) {
            const dot = document.getElementsByClassName('dot')[0];
            dot.remove();
            dotts--;
        }
    }

    console.log(dotts + ' dots');
}