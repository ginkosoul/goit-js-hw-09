// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";

const SECOND = 1000;
const MINUTE = 60*SECOND;

let timerId = null;
let timerCorrectionId;
let selectedDate = null;
let currentTime = null;

const refs = {
    datetimePicker: document.getElementById('datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer:{
        days: document.querySelector('span[data-days]'),
        hours: document.querySelector('span[data-hours]'),
        minutes: document.querySelector('span[data-minutes]'),
        seconds: document.querySelector('span[data-seconds]'),
    }
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = options.defaultDate.getTime() < selectedDates[0].getTime() 
        ? selectedDates[0].getTime()
        : null
        if (selectedDate){
            refs.startBtn.disabled = false;
        } else {
            Notify.failure('Select date in the future')
        }
        // console.log(selectedDate);
    },
};

flatpickr(refs.datetimePicker, options);  

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click',onClick)


function onClick(){
    currentTime = new Date().getTime();
    if (selectedDate - currentTime > SECOND) {
        // console.log(convertMs(selectedDate - currentTime));
        // updateTimerField(convertMs(selectedDate - currentTime));
        refs.startBtn.disabled = true;
        Notify.info('Countdow started');
        timerId = setInterval(()=>{
            currentTime += SECOND;
            if (selectedDate - currentTime > 0){
                updateTimerField(convertMs(selectedDate - currentTime));
            } else {
                refs.startBtn.disabled = false;
                clearInterval(timerId);
                clearInterval(timerCorrectionId);
                Notify.success("Countdown finished");
            }
        }, SECOND);
        timerCorrectionId = setInterval(() => {
            const newCurrentTime = new Date().getTime();
            if (Math.abs(newCurrentTime - currentTime) > SECOND){
                console.log("Time Correction Applied:", newCurrentTime - currentTime);
                currentTime = newCurrentTime;
            }
        }, MINUTE/10)
    } else {
        Notify.warning("Time had passed. Select another date in the future")
        refs.startBtn.disabled = false;
    }
}

function updateTimerField({days, hours, minutes, seconds}){

    refs.timer.days.textContent = addLeadingZero(days);
    refs.timer.hours.textContent = addLeadingZero(hours);
    refs.timer.minutes.textContent = addLeadingZero(minutes);
    refs.timer.seconds.textContent = addLeadingZero(seconds);
    // refs.timer.days = "new way";
    // console.log(refs.timer);
}

function addLeadingZero(value){
    return String(value).padStart(2,'0')
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
  
    return { days, hours, minutes, seconds };
  }