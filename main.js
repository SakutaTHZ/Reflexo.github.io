//Codes added by KuroDaisuke
const playerData = [
    {Name:"Albedo",imagePath:"images/Albedo.jpg"},
    {Name:"Alhaithem",imagePath:"images/Alhaithem.jpg"},
    {Name:"Ayaka",imagePath:"images/Ayaka.jpg"},
    {Name:"Ayato",imagePath:"images/Ayato.jpg"},
    {Name:"Ganyu",imagePath:"images/Ganyu.jpg"},
    {Name:"Hu Tao",imagePath:"images/HuTao.jpg"},
    {Name:"Itto",imagePath:"images/Itto.jpg"},
    {Name:"Kazuha",imagePath:"images/Kazuha.jpg"},
    {Name:"Klee",imagePath:"images/Klee.jpg"},
    {Name:"Mona",imagePath:"images/Mona.jpg"},
    {Name:"Paimon",imagePath:"images/Paimon.jpg"},
    {Name:"Raiden",imagePath:"images/Raiden.jpg"},
    {Name:"Scara",imagePath:"images/Scara.jpg"},
    {Name:"Traveller",imagePath:"images/Traveller.jpg"},
    {Name:"Zhongli",imagePath:"images/Zhongli.png"},
]

const setPlayers = () =>{
    let player1Data = playerData[Math.floor(Math.random()* playerData.length)]
    document.querySelector('.player1').style.backgroundImage=`url(${player1Data.imagePath})`
    document.querySelector('.player1>.playerDetailBox>.name').innerHTML = player1Data.Name

    let player2Data = playerData[Math.floor(Math.random()* playerData.length)]
    document.querySelector('.player2').style.backgroundImage=`url(${player2Data.imagePath})`
    document.querySelector('.player2>.playerDetailBox>.name').innerHTML = player2Data.Name
}
setPlayers()

const controls = ["w","a","s","d","q","e"]
const timer = document.querySelector(".timeLeft")
const counterBox = document.querySelector(".counter") 
const totalTime = 3;

let current
let time = 0
let skip = false
let counter = 0

let playerHealth = 100;
let enemyHealth = 100;
let critChance = 30;

const random = () => controls[Math.floor(Math.random() * controls.length)]
const resetList = () => {
    document.querySelectorAll('.typeBox>p')[0].remove()
    let parent = document.querySelector('.typeBox')
    let child = document.createElement('p')
    child.innerText = `${random()}`
    parent.append(child)
}

const reset = (callback = ()=>{}) => {
    skip = false
    resetList()
    current = document.querySelectorAll('.typeBox>p')[0].innerHTML
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
    //console.log('Player Health - ' + playerHealth)
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
    console.log('Enemy Health - '+enemyHealth)
}

const endGame = () =>{
    document.querySelector(".gamescreen").innerHTML+=`
    <div class="Endscreen">
        <p class="EndText">Game Over. You Win !!</p>
        <div>
            <button onclick="location.reload()">Retry</button>
            <button>Main Menu</button>
        </div>
    </div>
    `
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

    if(playerHealth <= 0){
        playerHealth = 1
        endGame()
    }else if(enemyHealth <= 0){
        enemyHealth = 1
        endGame()
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