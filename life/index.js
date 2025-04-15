let animating = true;

const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');

let size = +document.getElementById('canvawidth').value
canvas.setAttribute('height', size + '');
canvas.setAttribute('width', size + '');

const rulesGroup = new Map();

const draw = (x, y, color, size) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size)
}

const drawParticle = (particle) => {
  draw(particle.x, particle.y, particle.color, 5);
}

let particles = [];

const genParticle = (x, y, color) => {
  return {
    x,
    y,
    color,
    vx: 0,
    vy: 0,
  }
}

const getRandomPos = () => {
  return Math.random() * (size - 100) + 50
}

const createGroup = (groupSize, color) => {
  const group = [];
  for (let i = 0; i < groupSize; i++) {
    const particle = genParticle(getRandomPos(), getRandomPos(), color);
    group.push(particle);
    particles.push(particle);
  }
  return group;
}

//rules
const rule = (group1, group2, attraction) => {
  for (let i = 0; i < group1.length; i++) {
    let a = group1[i];
    let forcex = 0;
    let forcey = 0;

    for (let j = 0; j < group2.length; j++) {
      let b = group2[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0 && d < 80) {
        let force = attraction / d;
        forcex += force * dx;
        forcey += force * dy;
      }
    }

    a.vx = (a.vx + forcex) * 0.5
    a.vy = (a.vy + forcey) * 0.5;
    a.x += a.vx;
    a.y += a.vy;

    if (a.x <= 0) {
      a.x = 0;
      a.vx *= -1;
    } else if ((a.x + 5) >= size) {
      a.x = size - 5;
      a.vx *= -1;
    }

    if (a.y <= 0) {
      a.y = 0;
      a.vy *= -1;
    } else if ((a.y + 5) >= size) {
      a.y = size - 5;
      a.vy *= -1;
    }
  }
};


// particles
blue = [];
red = [];
green = [];
pink = [];

const createAllGroups = () => {
  const { blueValue, redValue, greenValue, pinkValue } = getAllGroupsValues();

  blue = createGroup(blueValue, 'blue');
  red = createGroup(redValue, 'red');
  green = createGroup(greenValue, 'green');
  pink = createGroup(pinkValue, 'pink');
}

const getAllGroupsValues = () => {
  const blueValue = document.getElementById('amount-blue').value
  const redValue = document.getElementById('amount-red').value
  const greenValue = document.getElementById('amount-green').value
  const pinkValue = document.getElementById('amount-pink').value

  return { blueValue, redValue, greenValue, pinkValue };
}

createAllGroups();

const restartCanvas = () => {
  blue = [];
  red = [];
  green = [];
  pink = [];
  particles = [];

  ctx.clearRect(0, 0, size, size);
  draw(0, 0, 'black', size);

  createAllGroups();
}

const getGroupByKey = (key) => {
  return {
    'red': red,
    'blue': blue,
    'green': green,
    'pink': pink,
  }[key]
}

const update = () => {
  if (!animating) return;

  rulesGroup.forEach((ruleControl, key) => {
    const from = getGroupByKey(ruleControl.from);
    const to = getGroupByKey(ruleControl.to);
    let value = ruleControl.value;

    rule(from, to, value);
  });

  ctx.clearRect(0, 0, size, size);
  draw(0, 0, 'black', size);

  for (let i = 0; i < particles.length; i++) {
    drawParticle(particles[i]);
  }

  requestAnimationFrame(update);
};


update();

function simulate() {
  size = +document.getElementById('canvawidth').value
  canvas.setAttribute('height', size + '');
  canvas.setAttribute('width', size + '');

  const inputs = document.querySelectorAll('input[type=range]');
  rulesGroup.clear();
  for (let input of inputs) {
    const id = input.id.split('-');

    const newRule = {
      from: id[0],
      to: id[1],
      value: input.value / 100,
    }

    rulesGroup.set(input.id, newRule);
  }


  restartCanvas();
}

function reset() {
  document.querySelectorAll('input').forEach((input => {
    if (input.type == 'range') {
      input.value = 0
    }
  }))
  document.querySelectorAll("input[id^='amount']").forEach((input) => input.value = 400);
  document.querySelectorAll('output').forEach((output) => output.innerHTML = '0');
  rulesGroup.clear();
  restartCanvas();
}

function random() {
  document.querySelectorAll('input').forEach((input => {
    if (input.type == 'range') {
      input.value = Math.floor(Math.random() * 201) - 100;
      input.nextElementSibling.innerHTML = input.value;
    }

    if (input.type == 'number' && input.id != 'canvawidth') {
      input.value = Math.floor(Math.random() * 301) + 300;
    }
  }))
}

function exp() {
  simulate();

  const rules = Object.fromEntries(rulesGroup);
  const groupQuantity = getAllGroupsValues();
  const exportData = { ...rules, groupQuantity };
  downloadJSON(exportData);
}

function downloadJSON(obj, filename = 'export.json') {
  const jsonStr = JSON.stringify(obj, null, 2); // Pretty print with 2-space indent
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url); // Clean up
}

document.getElementById('jsonFileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const json = JSON.parse(e.target.result);

      const keys = Object.keys(json);
      for (let key of keys) {
        if (key == 'groupQuantity') {
          document.getElementById('amount-red').value = json[key].redValue
          document.getElementById('amount-blue').value = json[key].blueValue
          document.getElementById('amount-green').value = json[key].greenValue
          document.getElementById('amount-pink').value = json[key].pinkValue
          continue;
        }

        const range = document.getElementById(key);
        range.value = Math.floor(json[key].value * 100) + '';
        range.nextElementSibling.innerHTML = Math.floor(json[key].value * 100) + '';
      }

    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  reader.readAsText(file);
});

function promptGif() {
  const dur = prompt('Gif duration (in seconds)');
  exportGIF(dur * 1000);
}

function exportGIF(duration = 10000, frameDelay = 50) {
  animating = false; 

  document.getElementById('exporting').classList.remove('none');
  document.getElementById('controls').classList.add('none');
  document.title = 'exporting...';

  simulate(); 

  let frames = duration / frameDelay;

  const gif = new GIF({
    workers: 2,
    quality: 1,
    width: canvas.width,
    height: canvas.height,
    workerScript: 'libs/gif.worker.js' 
  });

  let currentFrame = 0;

  function captureNextFrame() {

    rulesGroup.forEach((ruleControl) => {
      const from = getGroupByKey(ruleControl.from);
      const to = getGroupByKey(ruleControl.to);
      let value = ruleControl.value;
      rule(from, to, value);
    });

    ctx.clearRect(0, 0, size, size);
    draw(0, 0, 'black', size);
    for (let i = 0; i < particles.length; i++) {
      drawParticle(particles[i]);
    }

    gif.addFrame(ctx, { copy: true, delay: frameDelay });
    currentFrame++;

    if (currentFrame < frames) {
      setTimeout(captureNextFrame, frameDelay); // sem travar a UI
    } else {
      gif.on('finished', function (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'simulation.gif';
        a.click();
        animating = true; // Volta a simular normalmente
        document.getElementById('exporting').classList.add('none');
        document.getElementById('controls').classList.remove('none');
        document.title = 'life sim';
        update(); // Retoma animação
      });
      gif.render();
    }
  }

  captureNextFrame();
}
