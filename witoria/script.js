function inicia() {
    console.log('eu te amo');

    let audio = new Audio('audio.mp3#t=00:01:00')
    audio.volume = 1;
    audio.play();
    audio.loop = true;

    let main = document.getElementById('main');
    main.style.display = 'none';

    let msg = document.getElementById('msg');
    msg.style.display = 'block';

    setInterval(() => {
        moveMsg()
    }, 1000);
}

function moveMsg() {
    console.log('eu te amo');
    let msg = document.getElementById('msg');
    msg.style.top = Math.random() * 400 + 'px';
    msg.style.left = Math.random() * 180 + 'px';
    msg.style.transform = `rotateZ(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`


}