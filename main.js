//Codes added by KuroDaisuke

const controls = ["w","a","s","d"]
const timer = document.querySelector(".timeLeft")
const counterBox = document.querySelector(".counter") 
const totalTime = 3;
let current = controls[Math.floor(Math.random() * controls.length)]
let time = 0
let skip = false
let counter = 0

const reset = (callback=()=>{}) => {
    skip = false
    current = controls[Math.floor(Math.random() * controls.length)]
    time = 0
    callback()
}

const twoDigit = (num) => {
    return (num).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
}

const start = () => {
    if(skip) {
        reset(() => {
            console.log(current)
            console.log(current)
            counter++
            counterBox.innerHTML = twoDigit(counter)
        })
    }else if(time > totalTime) {
        reset(() => {
            console.log(current)
            counter = 0
            counterBox.innerHTML = twoDigit(counter)
        })
    }else {
        timer.style.width = `${Math.floor(100-((time/totalTime)*100))}%`
        time += 0.01;
    }
    requestAnimationFrame(start);
}
start()

window.addEventListener("keyup", (e) => {
    if(e.key !== current) {
        time = 0
        counter = twoDigit(counter)
    }else skip=true
})