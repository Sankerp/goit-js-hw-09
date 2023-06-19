import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let timeLeft;
let dayChoise;
let countDown;
let setZero;

const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr(elements.inputDate, options);

elements.btnStart.addEventListener('click', handlerClick);

function handlerClick() {
  const countdownId = setInterval(() => {
    elements.btnStart.disabled = true;
    dayChoise = new Date(elements.inputDate.value).getTime();
    timeLeft = dayChoise - Date.now();
    console.log(timeLeft);
    if (timeLeft > 0) {
      elements.inputDate.disabled = true;
      convertMs(timeLeft);
    } else {
      clearInterval(countdownId);
      elements.inputDate.disabled = false;
      Notiflix.Report.success('Success', '"Time is END."', 'Okay');
      // alert('Time is END');
    }
  });
}

function timerUpdate({ days, hours, minutes, seconds }) {
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}

elements.inputDate.addEventListener('input', handlerInput);

function handlerInput() {
  countDown = new Date(elements.inputDate.value).getTime();
  console.log(countDown);
  console.log(Date.now());
  if (countDown < Date.now()) {
    Notiflix.Report.failure(
      'Error',
      '"Please choose a date in the future."',
      'Okay'
    );
    // alert('Please choose a date in the future');
    return;
  }
  elements.btnStart.disabled = false;
}
function addLeadingZero(zero) {
  return String(zero).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return timerUpdate({ days, hours, minutes, seconds });
}
