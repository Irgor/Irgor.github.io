// @ts-nocheck

/**
 * @typedef {Object} Piece
 * @property {number} quantity
 * @property {string} content
 * @property {string} whitePiece
 * @property {string} blackPiece
 */

/** @type {Record<string, Piece>} */
const pieces = {
  'major_general': {
    quantity: 4,
    content: '小',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">小</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">小</text></svg>'
  },
  'lieutenant_general': {
    quantity: 4,
    content: '中',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">中</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">中</text></svg>'
  },
  'general': {
    quantity: 6,
    content: '大',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">大</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">大</text></svg>'
  },
  'archer': {
    quantity: 2,
    content: '弓',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">弓</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">弓</text></svg>'
  },
  'knight': {
    quantity: 2,
    content: '馬',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">馬</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">馬</text></svg>'
  },
  'musketeer': {
    quantity: 1,
    content: '筒',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">筒</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">筒</text></svg>'
  },
  'captain': {
    quantity: 1,
    content: '謀',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="black">謀</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="white">謀</text></svg>'
  },
  'samurai': {
    quantity: 2,
    content: '侍',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">侍</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">侍</text></svg>'
  },
  'fortress': {
    quantity: 2,
    content: '砦',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="18" fill="black">砦</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="18" fill="white">砦</text></svg>'
  },
  'cannon': {
    quantity: 2,
    content: '砲',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">砲</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">砲</text></svg>'
  },
  'spy': {
    quantity: 2,
    content: '忍',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">忍</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">忍</text></svg>'
  },
  'pawn': {
    quantity: 9,
    content: '兵',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="black">兵</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="white">兵</text></svg>'
  },
  'marshal': {
    quantity: 1,
    content: '帥',
    whitePiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="white" stroke="black" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="22" fill="black">帥</text></svg>',
    blackPiece: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="22" fill="white">帥</text></svg>'
  }
};

const getPiece = (index) => {
  const piecesNames = Object.keys(pieces);

  const curPiece = pieces[piecesNames[index]]

  return curPiece;
}

const getPieceSVG = (index, color) => {
  const svgString = getPiece(index)[color];
  let svg = parser.parseFromString(svgString, "image/svg+xml").documentElement;

  const names = Object.keys(pieces);

  svg.setAttribute('name', names[index]);

  return svg;
}

const parser = new DOMParser();

const phases = ['Draft', 'Play'];

const state = {
  turn: 'whitePiece',
  phase: 'Draft',
  selectedPiece: 'none',
  start: false,
  round: 0,
  whitePiece: 0,
  blackPiece: 0,
  whitePieceAvailable: {},
  blackPieceAvailable: {},
  outWhitePiece: [],
  outBlackPiece: [],
  whitePieceReady: false,
  blackPieceReady: false,
}

/**
 * @param {HTMLDivElement} square
 */
const addPiece = (square) => {
  if (square.children.length >= 3 || state.selectedPiece == 'none') {
    return;
  }

  const svg = getPieceSVG(state.selectedPiece, state.turn);

  svg.onclick = () => { addPiece(svg.parentElement) };

  square.appendChild(svg);

  state[state.turn + 'Available'][state.selectedPiece].quantity -= 1;

  document.querySelector('.selected-piece').classList.remove('selected-piece')

  state[state.turn] += 1;

  switchTurn();
  fillUpAvailablePieces(false);
}

const pieceRules = (phase) => {
  const phaseRules = { 'Draft': draftRules, 'Play': playRules }[phase]();
}

const draftRules = () => {
  const totalLines = Array.from(Array(9).keys()).map(x => x + 1);
  let availableLinesAmount = 3;

  const availableToPlaceLines = state.turn == 'whitePiece' ? totalLines.slice(0, availableLinesAmount) : totalLines.slice(-availableLinesAmount);

  for (let line of totalLines) {
    const lineId = 'line-' + line;
    let squareFn;

    if (availableToPlaceLines.includes(line)) {
      squareFn = (square) => {
        square.classList.add('square-available');
      }
    } else {
      squareFn = (square) => {
        square.classList.add('square-unavailable');
      }
    }

    goThroughLine(lineId, squareFn);
  }

}

const playRules = () => {
  alert('play');
}

const getZeroQuantityIndexes = (color, out) => {
  const zeroQuantityIndexes = [];

  for (const index in color) {
    if (out.includes(+index)) continue;

    if (color[index].quantity === 0) {
      zeroQuantityIndexes.push(Number(index));
    }
  }

  return zeroQuantityIndexes;
}

const blockUnavailablePieces = () => {
  const whiteZero = getZeroQuantityIndexes(state.whitePieceAvailable, state.outWhitePiece);
  const blackZero = getZeroQuantityIndexes(state.blackPieceAvailable, state.outBlackPiece);

  state.outWhitePiece = Array.from(new Set([...state.outWhitePiece, ...whiteZero]));
  state.outBlackPiece = Array.from(new Set([...state.outBlackPiece, ...blackZero]))
}

const switchTurn = () => {
  state.turn = state.turn == 'whitePiece' ? 'blackPiece' : 'whitePiece';

  if (state.blackPieceReady) {
    state.turn = 'whitePiece'
  }

  if (state.whitePieceReady) {
    state.turn = 'blackPiece'
  }

  if ((state.blackPieceReady || state.whitePieceReady) && !state.start) {
    state.start = true;
    state.turn = 'whitePiece';
  }

  state.selectedPiece = 'none';

  const curTurn = document.getElementById('cur-turn');

  curTurn.innerHTML = state.turn == 'whitePiece' ? 'White' : 'Black';

  const convToBlock = state.turn == 'whitePiece' ? 'black-conv' : 'white-conv';
  const convToUnblock = state.turn == 'whitePiece' ? 'white-conv' : 'black-conv';

  document.getElementById(convToBlock).classList.add('blocked');
  document.getElementById(convToUnblock).classList.remove('blocked');

  document.querySelectorAll('div.square-available').forEach(div => div.classList.remove('square-available'));
  document.querySelectorAll('div.square-unavailable').forEach(div => div.classList.remove('square-unavailable'));

  state.round += 1;
  blockUnavailablePieces();
}
switchTurn()

const goThroughLine = (lineId, squareFn) => {
  const lineSquares = document.querySelectorAll('#' + lineId + ' div.square');
  for (let square of lineSquares) {
    squareFn(square);
  }
}

const formatDisplayName = (key) => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const fillUpAvailablePieces = (initial = true) => {
  const whiteConv = document.getElementById('white-conv');
  const blackConv = document.getElementById('black-conv');

  Array.from(whiteConv?.children).forEach(child => child.remove());
  Array.from(blackConv?.children).forEach(child => child.remove());

  const showTip = (svg) => {
    const pieceName = svg.getAttribute('name');

    const div = document.createElement('div');
    div.classList.add('tip')

    div.innerHTML = formatDisplayName(pieceName);

    svg.parentElement.appendChild(div);
  }

  const removeTip = (svg) => {
    svg.parentElement.querySelectorAll('.tip').forEach((tip) => tip.remove())
  }

  const getQuantity = (initial, index, color) => {
    if (!initial) {
      return state[color + 'Available'][index].quantity;
    }

    const piece = getPiece(index);
    state[color + 'Available'][index] = {};
    state[color + 'Available'][index].quantity = piece.quantity;

    return piece.quantity;
  }

  const svgAction = (index, color, conv) => {
    const piece = getPiece(index);

    const holder = document.createElement('div');
    holder.classList.add('piece-holder');

    const svg = getPieceSVG(index, color);

    svg.onclick = () => { selectPiece(index, color, svg) };
    svg.onmouseenter = () => { showTip(svg) }
    svg.onmouseleave = () => { removeTip(svg) }

    holder.appendChild(svg);

    const spanQuantity = document.createElement('span');
    spanQuantity.innerHTML = getQuantity(initial, index, color);
    spanQuantity.classList.add('quantity');
    holder.appendChild(spanQuantity);
    holder.id = index + '-piece';

    const outPieces = state['out' + formatDisplayName(color)];

    if (outPieces.includes(+index)) {
      holder.classList.add('piece-block');
    }

    if ((state.round == 1 || state.round == 2) && +index != 12) {
      holder.classList.add('piece-block');
    }


    conv.appendChild(holder);
  }

  const piecesName = Object.keys(pieces);
  for (let [index, value] of piecesName.entries()) {
    svgAction(index, 'whitePiece', whiteConv);
    svgAction(index, 'blackPiece', blackConv);
  }

  document.getElementById('white-on-field').innerHTML = state.whitePiece;
  document.getElementById('black-on-field').innerHTML = state.blackPiece;

  state.whitePiece > 1 ? document.getElementById('white-ready').classList.remove('disabled') : 0;
  state.blackPiece > 1 ? document.getElementById('black-ready').classList.remove('disabled') : 0;
}
fillUpAvailablePieces();


let squares = new Map();
let lines = new Map();
const getAllSquares = () => {
  /** @type {NodeListOf<HTMLDivElement>} */
  let domSquares = document.querySelectorAll('div.square');

  domSquares.forEach((square, index) => {
    const id = 'square-' + (index + 1);
    square.setAttribute('id', id);

    square.onclick = (e) => { addPiece(e.target) };

    squares.set(id, square);
  })

  let domLines = document.querySelectorAll('div.line')

  domLines.forEach((line, index) => {
    const id = 'line-' + (index + 1);
    line.setAttribute('id', id);

    line.onclick = (e) => { addPiece(e.target) };

    lines.set(id, line);
  })
}
getAllSquares();

const selectPiece = (piece, turn, el) => {
  state.selectedPiece = piece;
  state.turn = turn

  pieceRules(state.phase);

  document.querySelector('.selected-piece')?.classList.remove('selected-piece')
  el.classList.add('selected-piece');
}

const watchReadyButtons = () => {
  document.getElementById('white-ready').addEventListener('click', (e) => {
    state.whitePieceReady = true;
    switchTurn();
  })

  document.getElementById('black-ready').addEventListener('click', (e) => {
    state.blackPieceReady = true;
    switchTurn();
  })
}
watchReadyButtons();