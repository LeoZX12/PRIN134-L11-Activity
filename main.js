let score = 0;
let target = document.getElementById('target');
let scoreBoard = document.getElementById('scoreBoard');
let gameArea = document.getElementById('gameArea');
let bonus = 1;

target.style.top = `${Math.random() * (gameArea.offsetHeight - target.offsetHeight)}px`;
target.style.left = `${Math.random() * (gameArea.offsetWidth - target.offsetWidth)}px`;

target.addEventListener('click', () => {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
  target.style.top = `${Math.random() * (gameArea.offsetHeight - target.offsetHeight)}px`;
  target.style.left = `${Math.random() * (gameArea.offsetWidth - target.offsetWidth)}px`;
});



target.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    score += 1;
    scoreBoard.textContent = `Score: ${score}`;
    target.style.top = `${Math.random() * (gameArea.offsetHeight - target.offsetHeight)}px`;
    target.style.left = `${Math.random() * (gameArea.offsetWidth - target.offsetWidth)}px`;
  });

let aiTargetX = target.offsetLeft;
let aiTargetY = target.offsetTop;
let aiSpeed = 2;

function aiMove() {

  let distanceX = aiTargetX - target.offsetLeft;
  let distanceY = aiTargetY - target.offsetTop;

  aiTargetX -= distanceX / random;
  aiTargetY -= distanceY / random;

  target.style.top = `${aiTargetY}px`;
  target.style.left = `${aiTargetX}px`;

  requestAnimationFrame(aiMove);
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'd') {
    e.preventDefault();
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    target.style.top = `${Math.random() * (gameArea.offsetHeight - target.offsetHeight)}px`;
    target.style.left = `${Math.random() * (gameArea.offsetWidth - target.offsetWidth)}px`;
    aiTargetX = target.offsetLeft;
    aiTargetY = target.offsetTop;
  }
});


aiMove();

