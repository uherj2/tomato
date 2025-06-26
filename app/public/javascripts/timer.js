const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('play');

let timer
let time = 1500; //25 minutes
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
    isRunning = false;
    clearInterval(timer);
    time = 20; 
    counterSpan.textContent = formatTime(time);
}

playButton.addEventListener('click', () => {
    startTimer();
});

