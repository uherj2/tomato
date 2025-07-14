const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('play');
const skipButton = document.getElementById('skipButton');
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
}

function pauseTimer(){
    isRunning = false;
    clearInterval(timer);
}

function stopTimer(){
    if(isRunning) {
        ringSound.play();
    }
    isRunning = false;
    clearInterval(timer);
    switchTimer();
    counterSpan.textContent = formatTime(time);
}

playButton.addEventListener('click', () => {
    startTimer();
    

});

skipButton.addEventListener('click', () =>  {
    stopTimer();
})

