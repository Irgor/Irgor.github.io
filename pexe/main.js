var mouse;
var dotts = 0;
var isMobile
var timeToHall = 0;
var daysToHall = 0;
var offset = 0;
window.onload = function () {
    mouse = document.getElementById('mouse');
    isMobile = detectMob();

    dots();
    countDown();
    setInterval(() => { countDown() }, 500);

    offset = 1 - daysToHall / 55;
    document.getElementById('mouse').style.boxShadow = `0px 0px 200px 100px rgba(245, 144, 111, ${offset})`
}

window.onmousemove = function (e) {
    if (mouse) {
        mouse.style.left = e.pageX + 'px';
        mouse.style.top = e.pageY + 'px';
    }
}

window.onmousedown = function () {
    if (!isMobile) {
        document.getElementById('mouse').style.boxShadow = `0px 0px 500px 250px rgba(245, 144, 111, ${offset})`
    }
}

window.onmouseup = function () {
    if (!isMobile) {
        document.getElementById('mouse').style.boxShadow = `0px 0px 200px 100px rgba(245, 144, 111, ${offset})`
    }
}

function dots() {
    for (let i = 0; i < 350; i++) {
        var main = document.getElementById('main')
        const dot = document.createElement('div');
        dot.classList.add('dot')

        dot.style.left = Math.floor(Math.random() * screen.width - 30) + 'px';
        dot.style.top = Math.floor(Math.random() * screen.height - 30) + 'px';

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

function countDown() {
    const clock = document.getElementById('clock');
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const hall = new Date(`10-31-${year} 00:00`);

    timeToHall = hall.getTime() - nowDate.getTime()
    const days = Math.floor(timeToHall / (1000 * 3600 * 24));
    const hours = Math.floor((timeToHall / (1000 * 3600)) % 24);
    const minutes = Math.floor((timeToHall / (1000 * 60)) % 60);
    const seconds = Math.floor((timeToHall / (1000)) % 60);

    daysToHall = days;

    clock.innerHTML = `${addZeroIfNeeded(days)}:${addZeroIfNeeded(hours)}:${addZeroIfNeeded(minutes)}:${addZeroIfNeeded(seconds)}`
}

function addZeroIfNeeded(number) {
    const string = number.toString();

    if (string.length < 2) {
        return '0' + string
    }

    return string;
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