let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let activeGame = false
let message = ""
let sumEl = document.getElementById("sum")
let messageEl = document.getElementById("message")
let cardsEl = document.getElementById("cards")
let drawEl = document.getElementById("draw")
let stickEl = document.getElementById("stick")
let resetEl = document.getElementById("reset")
let startEl = document.getElementById("start")
let dealerCardsEl = document.getElementById("dealer-cards")
let dealerCardsMsgEl = document.getElementById("dealer-cards-msg")
let dealerSumEl = document.getElementById("dealer-sum")

function startGame(){
    isAlive = true
    startEl.hidden = true
    drawEl.hidden = false
    stickEl.hidden = false
    resetEl.hidden = false
    let firstCard = getInitialCard()
    let secondCard = getInitialCard()
    let dealerCard1 = getInitialCard()
    let dealerCard2 = getInitialCard()
    dealerSum = dealerCard1 + dealerCard2
    dealerCards = [dealerCard1, dealerCard2]
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + "  "
    }
    sumEl.textContent = "Sum: " + sum 
    if (sum < 21){
        message = "You're still in the game.. [Draw / Stick]"
    } else if (sum === 21 && dealerSum != 21){
        showDealerCards()
        message = "You win!"
        hasBlackJack = true
    } else if (sum < 21 && dealerSum === 21){
        showDealerCards()
        message = "You lose, dealer wins!"
        isAlive = false
    } else if (sum > 21){
        showDealerCards()
        message = "You lose!"
        isAlive = false
    } else if (dealerSum > 21 && sum < 21){
        showDealerCards()
        message = "Dealer loses, you win!"
        hasBlackJack = true
    } else{
        message = "Tie!"
        isAlive = false
    }
    messageEl.textContent = message
}

function getInitialCard(){
    let randomNumber = Math.floor(Math.random() * 11) + 1
    if (randomNumber === 1){
        return 11
    } else{
        return randomNumber
    }
}

function draw(){
    if (isAlive == true && hasBlackJack == false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        if (isAlive == true){
            let dealerCard = getRandomCard()
            dealerSum += dealerCard
            dealerCards.push(dealerCard)
        }
        renderGame()
    }
} 

function stick(){
    if (isAlive == true && hasBlackJack == false){
        showDealerCards()
        if (sum > dealerSum && sum < 21){
            message = "You win!"
            hasBlackJack = true
        } else if (sum < dealerSum && dealerSum < 21){
            message = "You lose!"
            drawEl.hidden = true
            stickEl.hidden = true
            isAlive = false
        } else if (dealerSum === 21 && sum != 21){
            message = "You lose, dealer wins!"
            isAlive = false
        } else if (sum < 21 && dealerSum > 21){
            message = "You win!"
            hasBlackJack = true
        } else{
            message = "Tie!"
            isAlive = false
        }
        isAlive = false
    }
    messageEl.textContent = message
}

function restart(){
    location.reload()
}

function showDealerCards(){
    dealerCardsMsgEl.textContent = "Dealer's cards: "
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum 
    for(let i = 0; i < dealerCards.length; i++){
        dealerCardsEl.textContent += dealerCards[i] + "  "
    }
}

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber === 1){
        return 11
    } else if (randomNumber > 10){
        return 10
    } else{
        return randomNumber
    }
}  
