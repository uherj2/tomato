const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('start');
const skipButton = document.getElementById('skip');
const ringSound = new Audio('/audio/timerRing.mp3');

const body = document.body

class Timer {
    ticker;
    isRunning;
    time;

    //for Pomdodoro Timer
    step;
    cycle;

    constructor(initialTime){
        this.time = initialTime;
        this.isRunning = false;       
        this.step = 0;
        this.cycle = 0;
    }

    updateTime(seconds){
        this.time = seconds;
    }

    formatTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    updateStartButton(){
        if(this.isRunning) {
            playButton.classList.add('on'); 
            playButton.textContent = "Pause";
            skipButton.style.pointerEvents = "auto"
            skipButton.style.opacity = "1";
        } else {
            playButton.classList.remove('on');
            playButton.textContent = "Start";
            skipButton.style.pointerEvents = "none"
            skipButton.style.opacity = "0";
        }
    }

    startTimer(){
        if(!this.isRunning){
            this.isRunning = true;
            this.ticker = setInterval(() => {
                this.time--;
                counterSpan.textContent = this.formatTime(this.time);
                if (this.time <= 0) {
                    this.stopTimer();
                }
            }, 1000)
        } else {
            this.pauseTimer();
        }
        this.updateStartButton();
    }

    pauseTimer(){
        this.isRunning = false;
        clearInterval(this.ticker);
        this.updateStartButton();
    }

    stopTimer(){
        if(this.isRunning) {
            ringSound.play();
        }
        this.isRunning = false;
        clearInterval(this.ticker);
        this.switchTimer(); // Pomodoro Method
        counterSpan.textContent = this.formatTime(this.time);
        this.updateStartButton();
    }
}

class PomodoroTimer extends Timer {
    static POMODOROTIME = 1500; 
    static SHORTBREAKTIME = 300;
    static LONGBREAKTIME = 3; //should be 900

    static POMODORO = 0;
    static SHORTBREAK = 1;
    static LONGBREAK = 2;

    constructor(initialtime){
        super(initialtime)
        this.step = PomodoroTimer.POMODORO;
        this.cycle = 0;
    }

    setpomodoro(){
        this.step = PomodoroTimer.POMODORO;
        this.updateTime(PomodoroTimer.POMODOROTIME);
        counterSpan.textContent = this.formatTime(PomodoroTimer.POMODOROTIME);
        body.style.backgroundColor = '#BA4A4A';
    }

    setShortBreak(){
        this.step = PomodoroTimer.SHORTBREAK;
        this.cycle++;
        this.updateTime(PomodoroTimer.SHORTBREAKTIME);
        counterSpan.textContent = this.formatTime(PomodoroTimer.SHORTBREAKTIME);
        body.style.backgroundColor = '#4C9196';
    }

    setLongBreak(){
        this.step = PomodoroTimer.LONGBREAK;
        this.cycle = 0;
        this.updateTime(PomodoroTimer.LONGBREAKTIME); 
        counterSpan.textContent = this.formatTime(PomodoroTimer.LONGBREAKTIME);
        body.style.backgroundColor = '#397097ff';
    }

    switchTimer() {
        if(this.step == PomodoroTimer.POMODORO) {
            if(this.cycle < 4) {
                this.setShortBreak();
            } else {
                this.setLongBreak();
            }
        } else {
            this.setpomodoro();
        }
    }
} 

export var timer = new PomodoroTimer(1500); 


