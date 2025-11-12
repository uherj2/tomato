const wakeButton = document.getElementById('wake')
const wakeIcon = document.getElementById('wakeIcon')
let wakeIsPressed = false;
let wakeLock = null;

async function requestWakeLock(){
    if ("wakeLock" in navigator) {
        isSupported = true;
        console.log("Screen Wake Lock API supported");
    } else {
        wakeButton.disabled = true;
        console.log("Wake lock is not supported by this browser.");
    }
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock is active");

        wakeLock.addEventListener("release", () => {
            console.log("Wake Lock has been released");
        });
    } catch (err) {
        console.log(`${err.name}, ${err.message}`);
    }
}

function toggleWakeIcon() {
    wakeIcon.classList.toggle('bi-brightness-high-fill');
    wakeIcon.classList.toggle('bi-brightness-high')
}


wakeButton.addEventListener('click', () => {
    if(wakeIsPressed){
        wakeIsPressed = false
        toggleWakeIcon();
        wakeButton.classList.remove('on');
        wakeLock.release().then(() => {
            wakeLock = null;
        })
    } else {
        wakeIsPressed = true
        requestWakeLock();
        toggleWakeIcon();
        wakeButton.classList.add('on'); 
    }
});

