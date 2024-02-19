import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
const daysCounter = document.querySelector("span[data-days]");
const hoursCounter = document.querySelector("span[data-hours]");
const minutesCounter = document.querySelector("span[data-minutes]");
const secondsCounter = document.querySelector("span[data-seconds]");

let userSelectedDate = null;
let timerInterval;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = Date.now();

    if (selectedDate <= currentDate)
        {
        iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position:"topRight",
});
          startButton.disabled = true;
        }
    
    else
        {
        startButton.disabled = false;
        inputDate.disabled = true;
        userSelectedDate = selectedDate;
        }
    },
};

const fp = flatpickr(inputDate, options); 


function handleStart() {

    if (!userSelectedDate) {
        iziToast.error({
        title: 'Error',
        message: 'Please choose a date first',
});
    return;
    }

    inputDate.disabled = true;
    startButton.disabled = true;

    const endTime = userSelectedDate.getTime();

    timerInterval = setInterval(() =>
    {
        const currentTime = Date.now();
        const delta = endTime - currentTime;

    if (delta <= 0)
        {
        clearInterval(timerInterval)
        displayTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        inputDate.disabled = false;
        startButton.disabled = false;   
        }
    else
        {
        const timeValues = convertMs(delta);
        displayTime(timeValues);
        }   
    },  1000)
}


function displayTime({ days, hours, minutes, seconds }) {
  daysCounter.textContent = addLeadingZero(days);
  hoursCounter.textContent = addLeadingZero(hours);
  minutesCounter.textContent = addLeadingZero(minutes);
  secondsCounter.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener("click", handleStart);


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

  return { days, hours, minutes, seconds };
}
