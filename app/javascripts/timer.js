const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('start');
const skipButton = document.getElementById('skip');
const ringSound = new Audio('/audio/timerRing.mp3');


let timer
var time = 1500; //25 minutes
let isRunning = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
}

function startTimer(){
    if(!isRunning){
        isRunning = true;
        timer = setInterval(() => {
            time--;
            counterSpan.textContent = formatTime(time);
            if (time <= 0) {
                stopTimer();
            }
        }, 1000)
    } else {
        pauseTimer();
    }
    updateStartButton();
}

function pauseTimer(){
    isRunning = false;
    clearInterval(timer);
    updateStartButton();
}

function stopTimer(){
    console.log("is running " + isRunning)
    if(isRunning) {
        ringSound.play();
    }
    isRunning = false;
    clearInterval(timer);
    switchTimer();
    counterSpan.textContent = formatTime(time);
    updateStartButton();
}

let isStartButtonOn = false;

function updateStartButton(){
    if(isRunning) {
        isStartButtonOn = true;
        playButton.classList.add('on'); 
        playButton.textContent = "Pause";
        skipButton.style.pointerEvents = "auto"
        skipButton.style.opacity = "1";
     } else {
        isStartButtonOn = false;
        playButton.classList.remove('on');
        playButton.textContent = "Start";
        skipButton.style.pointerEvents = "none"
        skipButton.style.opacity = "0";
    }
}

playButton.addEventListener('click', () => {
    startTimer();
});

skipButton.addEventListener('click', () =>  {
    stopTimer();
});

