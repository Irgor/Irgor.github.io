const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');

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
  return Math.random() * 400 + 50
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
    } else if (a.x >= 500) {
      a.x = 500;
      a.vx *= -1;
    }

    if (a.y <= 0) {
      a.y = 0;
      a.vy *= -1;
    } else if (a.y >= 500) {
      a.y = 500;
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

  ctx.clearRect(0, 0, 500, 500);
  draw(0, 0, 'black', 500);

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

  rulesGroup.forEach((ruleControl, key) => {
    const from = getGroupByKey(ruleControl.from);
    const to = getGroupByKey(ruleControl.to);
    let value = ruleControl.value
    if (ruleControl.att) {
      value = value * -1;
    }

    rule(from, to, value);
  })

  ctx.clearRect(0, 0, 500, 500);
  draw(0, 0, 'black', 500);

  for (i = 0; i < particles.length; i++) {
    const particle = particles[i];
    drawParticle(particle);
  }

  requestAnimationFrame(update);
}

update();

function simulate() {
  const inputs = document.querySelectorAll('input[type=range]');
  rulesGroup.clear();
  for (let input of inputs) {
    const id = input.id.split('-');

    const newRule = {
      from: id[0],
      to: id[1],
      value: input.value / 100,
      att: false
    }

    rulesGroup.set(input.id, newRule);
  }

  const atts = document.querySelectorAll('input[type=checkbox]');
  for (let att of atts) {
    if (att.id.includes('enable')) {
      continue;
    }

    const id = att.id.split('-att')[0];
    const getRule = rulesGroup.get(id);
    getRule.att = att.checked;
    rulesGroup.set(id, getRule);
  }

  restartCanvas();
}

function reset() {
  document.querySelectorAll('input').forEach((input => {
    if(input.type != 'file') {
      input.type == 'checkbox' ? input.checked = false : input.value = 0
    }
  }))
  document.querySelectorAll("input[id^='amount']").forEach((input) => input.value = 400);
  document.querySelectorAll('output').forEach((output) => output.innerHTML = '0');
  rulesGroup.clear();
  restartCanvas();
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
        range.value = json[key].value * 100 + '';
        range.nextElementSibling.innerHTML = json[key].value * 100 + '';

        const att = document.getElementById(key + '-att');
        att.checked = json[key].att;
      }

    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  reader.readAsText(file); // read file as text
});


