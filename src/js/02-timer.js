import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        Notiflix.Notify.warning('Please choose a date in the future');
        document.querySelector('button[data-start]').disabled = true;
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  };
  
  flatpickr("#datetime-picker", options);
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  let countdownInterval;
  document.querySelector('button[data-start]').addEventListener('click', () => {
    const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
    const currentDate = new Date();
  
    if (selectedDate > currentDate) {
      countdownInterval = setInterval(() => {
        const timeDifference = selectedDate - new Date();
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  
        if (timeDifference <= 0) {
          clearInterval(countdownInterval);
          Notiflix.Notify.success('Countdown completed!');
        }
      }, 1000);
    }
  });