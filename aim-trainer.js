var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const start = document.getElementById("start")
const startContainer = document.getElementById("start-container")
const restart = document.getElementById("restart")
const squareContainer = document.getElementById("square-container")
const circle = document.getElementById("circle")
const hitCounter = document.getElementById("counter")
const selectTheme = document.getElementById("select-theme")
const html = document.querySelector("html")
const colorPicker = document.getElementById("color-picker")
const colorPickerSubmit = document.getElementById("color-picker-submit-container")
const heartContainer = document.getElementById("heart-container")
const easy = document.getElementById("easy")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")
const difficultyContainer = document.getElementById("difficulty")
const tip = document.getElementById("tip-container")
const gameOverScreen = document.getElementById("game-over-screen")
const gameOverText = document.getElementById("game-over")
// Audio
const clickBeep = document.getElementById("click-beep")
const lostLifeBeep = document.getElementById("lost-life-beep")
// Themes
const changeTheme = document.getElementById("change-theme")
const changeThemeContainer = document.getElementById("change-theme-container")
const purple = document.getElementById("purple")
const aqua = document.getElementById("aqua")
const sunset = document.getElementById("sunset")
// Variables / Booleans
let hitCount = 0
let isInGame = false
let hasClickedIngame = false
let themeIsSet
let hasChosenDifficulty = false
let easyChosen
let mediumChosen
let hardChosen

// Hide elements
circle.hidden = true
restart.hidden = true
hitCounter.hidden = true
start.hidden = true
heartContainer.style.display = "none"

// Theme selection
if(localStorage.getItem("purple") == "yes"){
    themeIsSet = true
    selectTheme.hidden = false
    setPurpleTheme()
} else if (localStorage.getItem("aqua") == "yes"){
    themeIsSet = true
    selectTheme.hidden = false
    setAquaTheme()
} else if (localStorage.getItem("sunset") == "yes"){
    themeIsSet = true
    selectTheme.hidden = false
    setSunsetTheme()
} else if (localStorage.getItem("sunset") || localStorage.getItem("aqua") || localStorage.getItem("purple") === null){
    themeIsSet = true
    selectTheme.hidden = false
    html.style.backgroundColor = searchStorage()
    html.style.color = "white"
    easy.hidden = true
    medium.hidden = true
    hard.hidden = true
    renderStart()
}

renderDifficultySelect()

easy.addEventListener('click', function(){
    easyChosen = true
    hasChosenDifficulty = true
    hideDifficultyMenu()
    renderStart()
})

medium.addEventListener('click', function(){
    mediumChosen = true
    hasChosenDifficulty = true
    heartContainer.innerHTML = `
        <img class="heart" id="heart1" width="24" alt="heart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/256px-A_perfect_SVG_heart.svg.png">
        <img class="heart" id="heart2" width="24" alt="heart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/256px-A_perfect_SVG_heart.svg.png">
        <img class="heart" id="heart3" width="24" alt="heart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/256px-A_perfect_SVG_heart.svg.png">`
    hideDifficultyMenu()
    renderStart()
})

hard.addEventListener('click', function(){
    circle.style.width = "7vw"
    circle.style.height = "7vw"
    hardChosen = true
    hasChosenDifficulty = true
    heartContainer.innerHTML = `<img class="heart" id="heart1" width="24" alt="heart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/256px-A_perfect_SVG_heart.svg.png">`
    hideDifficultyMenu()
    renderStart()
})

purple.addEventListener('click', function(){
    setPurpleTheme()
})

aqua.addEventListener('click', function(){
    setAquaTheme()
})

sunset.addEventListener('click', function(){
    setSunsetTheme()
})

colorPicker.addEventListener('change', function(){
    colorPickerSubmit.innerHTML = `<input type="submit" value="Submit" id="submit"></input>`
    tip.innerHTML = `
    <p id="tip1" style="margin: 15px 0px 0px 0px; font-size: 15px;">
    Tip: Avoid 
    </p>
    <p id="tip-red" style="color: red; display;  margin: 5px 0px; font-size: 20px">
    bright red
    </p> 
    <p id="tip1" style="margin-top: 0px; font-size: 15px;">
    because you may not be able to see your lives!
    </p>`
})

colorPickerSubmit.addEventListener('click', function(){
    themeIsSet = true
    changeToCustomColor()
    if(isInGame === false){
        renderStart()
    }
})

changeTheme.addEventListener('click', function(){
    renderChangeTheme()
})

start.addEventListener('click', function(){
    isInGame = true
    start.style.opacity = "0"
    startGame()
})

restart.addEventListener('click', function(){
    restartGame()
})

function startGame(){
    selectTheme.style.opacity = "0"
    isInGame = true
    circle.hidden = false
    restart.hidden = false
    hitCounter.hidden = false
    heartContainer.style.display = "block"
    setTimeout(function(){
        start.hidden = true
    }, 1000)
    
    if (easyChosen){
        circleListener(6)
    } else if (mediumChosen){
        circleListener(4)
    } else if (hardChosen){
        circleListener(2)
    }
    renderGame()
}

function circleListener(numOfLives){
    let i = numOfLives
    html.addEventListener('click', function(e){
        let heart = "heart" + i
        if (document.getElementById(heart)){
            if(!circle.contains(e.target) && !changeTheme.contains(e.target) && !hitCounter.contains(e.target) && !selectTheme.contains(e.target) && !colorPicker.contains(e.target) && !colorPickerSubmit.contains(e.target)){
                if(selectTheme.hidden === true){
                    if (i === 1){
                        console.log("out of lives")
                        gameOver()
                    }
                    console.log("circle missed")
                    console.log(i-1 + " lives left")
                    document.getElementById(heart).style.display = "none"
                    lostLifeBeep.play()
                    i--
                } 
            } else if (circle.contains(e.target)){
                console.log("circle clicked")
                clickBeep.play()
                renderGame()
            } 
        } else{
            i--
        }
    }, false)
}    

function gameOver(){
    console.log("game over function called")
    gameOverScreen.style.display = "flex"
    setTimeout(function(){
        gameOverScreen.style.opacity = "1"
    }, 1)
    circle.hidden = true
    restart.style.marginBottom = "10vh"
    restart.style.transform = "scale(1.3)"
    gameOverText.style.opacity = "1"
}

function renderChangeTheme(){
    selectTheme.hidden = false
    selectTheme.style.opacity = "1"
    // Change bg colour
    html.style.backgroundColor = "black"
    html.style.border = "none"
    // Hide elements
    start.hidden = true
    changeTheme.hidden = true
    hitCounter.hidden = true
    restart.hidden = true
    circle.hidden = true
    easy.hidden = true
    medium.hidden = true
    hard.hidden = true
    difficultyContainer.style.display = "none"
}

function renderStart(){
    if(hasChosenDifficulty === true){
        changeThemeContainer.hidden = false
        selectTheme.hidden = true
        startContainer.hidden = false
        start.style.opacity = "0"
        start.hidden = false
        setTimeout(function(){
            start.style.opacity = "1"
        }, 1000)
    } else {
        renderDifficultySelect();
    }
}

function renderDifficultySelect(){
    start.hidden = true
    hitCounter.hidden = true
    restart.hidden = true
    changeThemeContainer.hidden = false
    circle.hidden = true
    difficultyContainer.style.display = ""
    easy.hidden = false
    medium.hidden = false
    hard.hidden = false 
    selectTheme.hidden = true
    html.style.backgroundColor = searchStorage()
    html.style.color = "white"
}

function hideDifficultyMenu(){
    difficultyContainer.style.opacity = "0";
    setTimeout(function(){
        difficultyContainer.hidden = true
    }, 1000)
}

function renderGame(){
    hitCounter.innerText = "Hits: " + hitCount
    hitCount += 1

    let randomPosX = Math.floor(Math.random() * 10)
    if (randomPosX == 1){
        circle.style.left = "10%"
    } else if (randomPosX == 2){
        circle.style.left = "20%"
    } else if (randomPosX == 3){
        circle.style.left = "30%"
    } else if (randomPosX == 4){
        circle.style.left = "40%"
    } else if (randomPosX == 5){
        circle.style.left = "50%"
    } else if (randomPosX == 6){
        circle.style.left = "60%"
    } else if (randomPosX == 7){
        circle.style.left = "70%"
    } else if (randomPosX == 8){
        circle.style.left = "80%"
    } else if (randomPosX == 9){
        circle.style.left = "90%"
    } else if (randomPosX == 10){
        circle.style.left = "0%"
    }

    let randomPosY = Math.floor(Math.random() * 8)
    if (randomPosY == 1){
        circle.style.top = "10%"
    } else if (randomPosY == 2){
        circle.style.top = "20%"
    } else if (randomPosY == 3){
        circle.style.top = "30%"
    } else if (randomPosY == 4){
        circle.style.top = "40%"
    } else if (randomPosY == 5){
        circle.style.top = "50%"
    } else if (randomPosY == 6){
        circle.style.top = "60%"
    } else if (randomPosY == 7){
        circle.style.top = "70%"
    } else if (randomPosY == 8){
        circle.style.top = "80%"
    }
    circle.style.transition = "all .1s"
}

function restartGame(){
    location.reload()
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function setPurpleTheme(){
    if (isInGame === true){
        changeTheme.hidden = false
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("purple", "yes")
        selectTheme.style.opacity = "0"
        renderStart()
        // Configure start
        start.style.borderColor = "white"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("white") }
        start.hidden = true
        // Configure restart
        restart.hidden = false
        restart.style.borderColor = "white"
        restart.onmouseenter = function(){ changeRestartBorderColor("red") }
        restart.onmouseleave = function(){ changeRestartBorderColor("white") }
        // Configure circle
        circle.style.backgroundColor = "white"
        circle.hidden = false
        // HTML colours
        html.style.backgroundColor = "#440044"
        html.style.color = "white"
        html.style.borderLeft = "3px solid rgb(169, 0, 202)"
        html.style.borderRight = "3px solid rgb(169, 0, 202)"
        // Hit counter
        hitCounter.hidden = false
    } else if(hasChosenDifficulty === true){
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("purple", "yes")
        // HTML colours
        html.style.backgroundColor = "#440044"
        html.style.color = "white"
        html.style.borderLeft = "3px solid rgb(169, 0, 202)"
        html.style.borderRight = "3px solid rgb(169, 0, 202)"
        // Configure start
        start.style.borderColor = "white"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("white") }
        renderStart()
    } else{
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("purple", "yes")
        selectTheme.style.opacity = "0"
        // HTML colours
        html.style.backgroundColor = "#440044"
        html.style.color = "white"
        html.style.borderLeft = "3px solid rgb(169, 0, 202)"
        html.style.borderRight = "3px solid rgb(169, 0, 202)"
        renderDifficultySelect()
    }
}

function setAquaTheme(){
    if (isInGame === true){
        changeTheme.hidden = false
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("aqua", "yes")
        selectTheme.style.opacity = "0"
        renderStart()
        // Confgiure start
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
        start.hidden = true
        // Configure restart
        restart.hidden = false
        restart.style.borderColor = "black"
        restart.onmouseenter = function(){ changeRestartBorderColor("red") }
        restart.onmouseleave = function(){ changeRestartBorderColor("black") }
        // Configure circle
        circle.style.backgroundColor = "black"
        circle.hidden = false
        // HTML colours
        html.style.backgroundColor = "#009c9c"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #00ffff"
        html.style.borderRight = "3px solid #00ffff"
        // Hit counter
        hitCounter.hidden = false
    } else if(hasChosenDifficulty === true){
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("aqua", "yes")
        // Circle
        circle.style.backgroundColor = "black"
        // HTML colours
        html.style.backgroundColor = "#009c9c"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #00ffff"
        html.style.borderRight = "3px solid #00ffff"
        // Configure start
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
        renderStart()
    } else{
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("aqua", "yes")
        selectTheme.style.opacity = "0"
        // HTML colours
        html.style.backgroundColor = "#009c9c"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #00ffff"
        html.style.borderRight = "3px solid #00ffff"
        renderDifficultySelect()
    }
}

function setSunsetTheme(){
    if (isInGame === true){
        changeTheme.hidden = false
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("sunset", "yes")
        selectTheme.style.opacity = "0"
        renderStart()
        // Configure start
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
        start.hidden = true
        // Configure restart
        restart.hidden = false
        restart.style.borderColor = "black"
        restart.onmouseenter = function(){ changeRestartBorderColor("red") }
        restart.onmouseleave = function(){ changeRestartBorderColor("black") }
        // Configure circle
        circle.style.backgroundColor = "black"
        circle.hidden = false
        // HTML colours
        html.style.backgroundColor = "#851f00"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #ff3c00"
        html.style.borderRight = "3px solid #ff3c00"
        // Hit counter
        hitCounter.hidden = false
    } else if(hasChosenDifficulty === true){
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("sunset", "yes")
        // HTML colours
        html.style.backgroundColor = "#851f00"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #ff3c00"
        html.style.borderRight = "3px solid #ff3c00"
        // Configure start
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
        renderStart()
    } else{
        // Reassign storage
        localStorage.clear()
        localStorage.setItem("sunset", "yes")
        // HTML colours
        html.style.backgroundColor = "#851f00"
        html.style.color = "black"
        html.style.borderLeft = "3px solid #ff3c00"
        html.style.borderRight = "3px solid #ff3c00"
        renderDifficultySelect()
    }
}

function changeStartBorderColor(color){
    start.style.borderColor = color   
}

function changeRestartBorderColor(color){
    restart.style.borderColor = color   
}

function searchStorage(){
    for(var i =0; i < localStorage.length; i++){
        let key = localStorage.getItem(localStorage.key(i));
        console.log("Current custom theme color: " + key)
        return key;
    }      
}

function changeToCustomColor(){
    if (isInGame === true){
        //Reassign custom colours & set as theme
        localStorage.clear()
        let customThemeValue = colorPicker.value 
        localStorage.setItem("Custom value", customThemeValue)
        // HTML colours
        html.style.backgroundColor = searchStorage()
        html.style.color = "white"
        // Hide select menu
        selectTheme.style.opacity = "0"
        selectTheme.hidden = true
        // Configure circle
        circle.hidden = false
        circle.style.backgroundColor = "black"
        // Configure start button
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
        start.hidden = true
        // Configure restart button
        restart.hidden = false
        restart.style.borderColor = "white"
        restart.onmouseenter = function(){ changeRestartBorderColor("red") }
        restart.onmouseleave = function(){ changeRestartBorderColor("black") }
        // Change circle colour
        circle.style.backgroundColor = "black" 
        // Hit counter
        hitCounter.hidden = false
        // Hearts
        heartContainer.hidden = false
    } else{
        // Re-assign custom colours & set as theme
        localStorage.clear()
        let customThemeValue = colorPicker.value 
        localStorage.setItem("Custom value", customThemeValue)
        // HTML colours
        html.style.backgroundColor = searchStorage()
        html.style.color = "white"
        selectTheme.style.opacity = "0" // Remove select menu
        // Configure start button
        start.style.borderColor = "black"
        start.onmouseenter = function(){ changeStartBorderColor("#00db00") }
        start.onmouseleave = function(){ changeStartBorderColor("black") }
    }
}
