const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const CHANGECOLOR_TIME = 1000;
let changeBackgroundId;

// console.log(startBtn);
// console.log(stopBtn);

startBtn.addEventListener('click',onStartBtnClick)



function onStartBtnClick(e){
    console.log(startBtn.disabled);
    startBtn.disabled = true;
    startBtn.removeEventListener('click',onStartBtnClick)

    stopBtn.addEventListener('click', onStopBtnClick)
    stopBtn.disabled = false;

    changeBackgroundId = setInterval(changeBackground,CHANGECOLOR_TIME);
}

function onStopBtnClick(e){

    stopBtn.disabled = true;
    stopBtn.removeEventListener('click', onStopBtnClick)

    startBtn.addEventListener('click',onStartBtnClick)
    startBtn.disabled = false;

    clearInterval(changeBackgroundId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function changeBackground(){
    body.style.backgroundColor = getRandomHexColor();
    // console.log(body.style.backgroundColor);
}