let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSec % 60).padStart(2, '0');
  const millis = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${hrs}:${mins}:${secs}.${millis}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10); // faster update
    running = true;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  running = false;
  elapsed = 0;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
};

lapBtn.onclick = () => {
  if (running) {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    const li = document.createElement('li');
    li.textContent = formatTime(diff);
    laps.appendChild(li);
  }
};
