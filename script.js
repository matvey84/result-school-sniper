const startBtn = document.querySelector("#start");
const screen = document.querySelectorAll(".screen");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screen[0].classList.add("up");
});

let time = 10;
document.querySelector(".time-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = e.target.getAttribute("data-time") * time;
    screen[1].classList.add("up");
    startGame();
  }
});


let stopInterval;
function startGame() {
  stopInterval = setInterval(startTimer, 1000);
  createCirle();
  setTime(time);
}

function startTimer() {
  if (time === 0) {
    finishGame();
    clearInterval(stopInterval);
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timer.innerHTML = `00:${value}`;
}
let score = 0;
let loose = 0;
let move = 0;
board.addEventListener('click', (e) => {
  if(e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createCirle();
  } else if (!e.target.classList.contains('circle')) {
    loose++
    document.querySelector('.circle').remove();
    createCirle();
  }
  move++
});


function finishGame() {
  timer.parentNode.remove();
  clearInterval();
  board.innerHTML = `
  <h1>Ходов: <span class="move">${move}</h1>
  <h1>Попал: <span class="primary">${score}</span></h1>
  <h1>Промах: <span class="loose"> ${loose}</span></h1>
  `;

  document.querySelector('#play-again').classList.toggle('play-again-hide');
  time = 10;
  document.querySelector('#play-again').addEventListener("click", (e) => {
    e.preventDefault();
    screen[1].classList.remove("up");
    e.target.classList.toggle('play-again-hide');
  }
  );
}


function createCirle() {

  const circle = document.createElement('div');
  let size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  let x = getRandomNumber(0, width - size );
  let y = getRandomNumber(0, height - size );
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;


  board.append(circle);
}

function getRandomNumber(max, min) {
  return Math.round(Math.random() * (max - min) + min)
}
