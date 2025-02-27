let letters = document.querySelector("#letters");
let clock = document.querySelector("#clock");

clock.innerHTML = updateTime();

setInterval(()=>{
    clock.innerHTML = updateTime();
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
