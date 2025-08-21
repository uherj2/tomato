// create an async function to request a wake lock
async function wakeLock(){
    if ("wakeLock" in navigator) {
        isSupported = true;
        console.log("Screen Wake Lock API supported");
    } else {
        wakeButton.disabled = true;
        console.log("Wake lock is not supported by this browser.");
    }

    // Create a reference for the Wake Lock.
    let wakeLock = null;

    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock is active!");
    } catch (err) {
        // The Wake Lock request has failed - usually system related, such as battery.
        console.log(`${err.name}, ${err.message}`);
    }
}

wakeLock();