
const counterSpan = document.getElementById('counter');
const playButton = document.getElementById('play');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function timer(){
    console.log(`Current Date: ${Date.now()}`);
    for(var i = 20; i >= 0; i--){
        console.log(i);
        counterSpan.textContent = i;
        await delay(1000);
    }

}

var playing = false;

playButton.addEventListener('click', () => {
  if(playing){

  } else {
    timer();
  }
});


