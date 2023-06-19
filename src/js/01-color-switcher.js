function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = 0;

function colors() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  if (timerId === 0) {
    timerId = setInterval(colors, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

// function handlerStartBtn(elem) {}

stopBtn.addEventListener('click', handlerStopBtn => {
  clearInterval(timerId);
  timerId = 0;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// function handlerStopBtn() {}
