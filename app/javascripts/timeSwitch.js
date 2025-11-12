const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');
const body = document.body

var POMODOROTIME = 1500; 
var SHORTBREAKTIME = 300;
var LONGBREAKTIME = 900; //should be 900

var POMODORO = 0;
var SHORTBREAK = 1;
var LONGBREAK = 2;

var step = 0;
var cycle = 0;

function setpomodoro(){
    step = POMODORO;
    time = POMODOROTIME;
    counterSpan.textContent = formatTime(time);
    body.style.backgroundColor = 'rgb(186, 73, 73)';
}

function setShortBreak(){
    step = SHORTBREAK;
    cycle++;
    time = SHORTBREAKTIME
    counterSpan.textContent = formatTime(time);
    body.style.backgroundColor = 'rgb(76,145,150)';
}

function setLongBreak(){
    step = LONGBREAK;
    cycle = 0;
    time = LONGBREAKTIME; 
    counterSpan.textContent = formatTime(time);
    body.style.backgroundColor = 'rgb(57,112,151)';
}

function switchTimer() {
    if(step == POMODORO) {
        if(cycle < 4) {
            setShortBreak();
        } else {
            setLongBreak();
        }
    } else {
        setpomodoro();
    }
}

pomodoroButton.addEventListener('click', () => {
    setpomodoro();
    pauseTimer();
})

shortBreakButton.addEventListener('click', () => {
    setShortBreak();
    pauseTimer();
});

longBreakButton.addEventListener('click', () => {
    setLongBreak();
    pauseTimer();
});

