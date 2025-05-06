const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const targetCountInput = document.getElementById('targetCount');
const setTargetsBtn = document.getElementById('setTargetsBtn');

let score = 0;
let targets = [];
function getValidTargetCount() {
  let count = parseInt(targetCountInput.value, 10);
  if (isNaN(count) || count < 1) count = 1;
  if (count > 5) count = 5;
  return count;
}

function getRandomPosition() {
  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  return { x, y };
}

function clearTargets() {
  targets.forEach(t => gameArea.removeChild(t));
  targets = [];
}

function createTargets(count) {
  clearTargets();
  for (let i = 0; i < count; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = (i + 1).toString();
    gameArea.appendChild(target);

    const pos = getRandomPosition();
    target.style.left = `${pos.x}px`;
    target.style.top = `${pos.y}px`;

  
    if (i !== 0) {
      target.style.pointerEvents = 'none';

    }

    target.addEventListener('click', () => {
      if (target.style.pointerEvents === 'none') return;
      gameArea.removeChild(target);
      targets = targets.filter(t => t !== target);

      const nextTarget = targets.find(t => parseInt(t.textContent, 10) === parseInt(target.textContent, 10) + 1);
      if (nextTarget) {
        nextTarget.style.pointerEvents = 'auto';
        nextTarget.style.opacity = '1';
      }
      if (targets.length === 0) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        createTargets(getValidTargetCount());
      }
    });

    target.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (target.style.pointerEvents === 'none') return;
      gameArea.removeChild(target);
      targets = targets.filter(t => t !== target);
      const nextTarget = targets.find(t => parseInt(t.textContent, 10) === parseInt(target.textContent, 10) + 1);
      if (nextTarget) {
        nextTarget.style.pointerEvents = 'auto';
        nextTarget.style.opacity = '1';
      }
      if (targets.length === 0) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        createTargets(getValidTargetCount());
      }
    });

    targets.push(target);
  }
}

setTargetsBtn.addEventListener('click', () => {
  const count = getValidTargetCount();
  createTargets(count);
  score = 0;
  scoreBoard.textContent = `Score: ${score}`;
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    clearTargets();
    createTargets(getValidTargetCount());
  }
});

createTargets(1);