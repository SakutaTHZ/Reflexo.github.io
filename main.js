//Codes added by KuroDaisuke

const controls = ["w","a","s","d","q","e"]
const timer = document.querySelector(".timeLeft")
const counterBox = document.querySelector(".counter") 
const totalTime = 3;
let todo = []
let current
let time = 0
let skip = false
let counter = 0

let playerHealth = 100;
let enemyHealth = 100;
let critChance = 30;

const random = () => controls[Math.floor(Math.random() * controls.length)]
const resetList = () => {
    // document.querySelector(".typeBox").innerHTML = todo.map((e) => `<span>${e}</span>`).join(" ")
    document.querySelectorAll('.typeBox>p')[0].remove()
    let parent = document.querySelector('.typeBox')
    let child = document.createElement('p')
    child.innerText = `${random()}`
    parent.append(child)
}

const reset = (callback = ()=>{}) => {
    skip = false
    // todo.shift()
    // todo.push(random())
    resetList()
    current = document.querySelectorAll('.typeBox>p')[0].innerHTML
    console.log(current)
    time = 0
    callback()
}

const twoDigit = (num) => {
    return (num).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
}

const setTodo = () => {
    //todo = [random(),random(),random(),random(),random(),random(),random()]
    for (let index = 0; index < 7; index++) {
        document.querySelector(".typeBox").innerHTML = document.querySelector(".typeBox").innerHTML +`<p>${random()}</p>`
    }
    current = document.querySelectorAll('.typeBox>p')[0].innerHTML
    console.log(current)
}

const healthReset = (player) => {
    let healthbar = document.querySelector(`.player${player}`).querySelector(".health")
    healthbar.style.width = `${player == 1 ? playerHealth : enemyHealth}%`
}

const hitAnimation = (player) => {
    let Player = document.querySelector(`.player${player}`)
    Player.classList.add("hit")
    setTimeout(() => {
        Player.classList.remove("hit")
    }, 500)
}

const enemyHit = () => {
    let randomness = Math.floor(Math.random() * 2)
    if(randomness < 1) {
        playerHealth -= 1;
        hitAnimation(1)
    }

    healthReset(1)
    setTimeout(() => enemyHit(),1000)
}
enemyHit()

const playerHit = () => {
    let crit = Math.floor(Math.random() * 100) + 1;
    if(crit < critChance) {
        enemyHealth -= 5; 
        hitAnimation(2) 
    }else {
        enemyHealth -= 2;
        hitAnimation(2)
    }
    
}

const start = () => {
    // hitting
    if(skip) {
        reset(() => {
            playerHit()
            healthReset(2)
            counter++
            counterBox.innerHTML = twoDigit(counter)
        })
    }else if(time > totalTime) { // over time
        reset(() => {
            playerHealth -= 5;
            hitAnimation(1)
            counter = 0
            counterBox.innerHTML = twoDigit(counter)
        })
    }else {
        timer.style.width = `${Math.floor(100-((time/totalTime)*100))}%`
        time += 0.01;
    }
    requestAnimationFrame(start);
}

setTodo()
// resetList()
start()

window.addEventListener("keyup", (e) => {
    if(e.key !== current) {
        time = 0
        counter = twoDigit(counter)
        playerHealth-=1;
        healthReset(1)
    }else skip=true
})