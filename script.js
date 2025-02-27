const letters = document.querySelector("#letters");
const clock = document.querySelector("#clock");
const startTime = document.querySelector("#start"); 
const endTime = document.querySelector("#end"); 
const loadingBar = document.querySelector("#loading-bar"); 
const loadingValue = document.querySelector("#loading-value"); 

clock.innerHTML = updateTime();
updateProgressBar();

startTime.addEventListener("change",()=>{
    updateProgressBar();
});

endTime.addEventListener("change",()=>{
    updateProgressBar();
});

setInterval(()=>{
    clock.innerHTML = updateTime();
    updateProgressBar();
},1000);



setTimeout(() => {
    startLetterCycle();
    setInterval(randomLetters, 30 * 60 * 1000);
}, getTimeUntilNextHalfHour());


function randomLetters(){
    let vowels = "AEIOU";
    let consonants = "BCDFGHJKLMNPRSTWZ";

    const vowelsRandomCount = 2;
    const consonantsRandomCount = 6;

    let randomLettersArray = "";

    for(let i = 0; i<vowelsRandomCount; i++){
        randomLettersArray+=vowels[Math.floor(Math.random()*vowels.length)];
    }

    for(let i = 0; i<consonantsRandomCount; i++){
        randomLettersArray+=consonants[Math.floor(Math.random()*consonants.length)];
    }
    letters.innerHTML = randomLettersArray;

    setTimeout(() => { letters.innerHTML = ""; }, 3 * 60 * 1000);
}

function updateProgressBar(){
    const now = new Date();
    let startHour = new Date();
    let endHour = new Date();
    startHour.setHours(parseInt(startTime.value[0]+startTime.value[1]),parseInt(startTime.value[3]+startTime.value[4]),0);
    endHour.setHours(parseInt(endTime.value[0]+endTime.value[1]),parseInt(endTime.value[3]+endTime.value[4]),0);

    let timeInMinutes = (endHour-startHour)/60000;
    let currentMinutes = (now-startHour)/60000;
    let percent = Math.max(Math.min((100*(currentMinutes/timeInMinutes)).toFixed(2),100),0);

    loadingBar.style.width = percent+'%';
    loadingValue.innerHTML = percent+'%';
}

function updateTime(){
    const now = new Date();
    let time = now.getHours() + ":";
    if(now.getMinutes()<10){
        time += "0" + now.getMinutes();
    }else{
        time+=now.getMinutes();
    }
    return time;
}

function getTimeUntilNextHalfHour() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const nextHalfHour = minutes < 30 ? 30 : 60;
    const delay = ((nextHalfHour - minutes) * 60 - seconds) * 1000 - milliseconds;
    return delay > 0 ? delay : 0;
}

function startLetterCycle() {
    randomLetters();
    setInterval(randomLetters, 30 * 60 * 1000);
    
}
