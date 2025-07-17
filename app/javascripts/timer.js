const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('play');
const ringSound = new Audio('/audio/timerRing.mp3');

const timeControlContainer = document.getElementById('timeControlContainer');
const skipButton = document.createElement('button');
const alignmentButton = document.createElement('button');
skipButton.textContent = '>';
alignmentButton.textContent = '>';
skipButton.classList.add('skipButton');
alignmentButton.classList.add('skipButton', 'alignmentButton');


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
        playButton.textContent = "Pause"  
        timeControlContainer.appendChild(skipButton);
        timeControlContainer.insertBefore(alignmentButton, playButton);
        
     } else {
        isStartButtonOn = false;
        playButton.classList.remove('on');
        playButton.textContent = "Start"
        skipButton.remove();
        alignmentButton.remove();
    }
}

playButton.addEventListener('click', () => {
    startTimer();
});

skipButton.addEventListener('click', () =>  {
    stopTimer();
});

