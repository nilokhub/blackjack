let player = {
    name: "",
    chips: 250
}

let cards = []
let cardsCasino = []
let sum = 0
let sumCasino = 0
let hasBlackJack = false
let isAlive = false
let isAliveCasino = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let sumCasinoEl = document.getElementById("sum-casino-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let casinoEl = document.getElementById("casino-el")

playerEl.textContent = player.name + "$" + player.chips

function getRandomCard() {
    let randomCard = Math.floor( Math.random()*13 ) + 1
    if (randomCard > 10){
        return 10
    } else if (randomCard === 1){
    return 11
    } else {
        return randomCard
    }
}

function randomCardCasino() {
    let randomCard = Math.floor( Math.random()*13 ) + 1
    if (randomCard > 10){
        return 10
    } else if (randomCard === 1){
    return 11
    } else {
        return randomCard
    }
}

function startGame(){
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function startCasino(){
    isAliveCasino = true
    let casinoCard = getRandomCard()
    let casinoCardTwo = getRandomCard()
    cardsCasino = [casinoCard, casinoCardTwo]
    sumCasino = casinoCard + casinoCardTwo
    renderCasino()
}

function renderGame(){
    cardsEl.textContent = "Your hand: "
    for (let i = 0; i < cards.length; i++){
    cardsEl.textContent += cards[i] + "  "}
    
    sumEl.textContent = "Total: " + sum
    if (sum <= 20){
        message = "Do you want to draw a new card?"
    } else if (sum === 21){
        message = "You have Blackjack!"
        hasBlackJack = true
    } else {
        message = "Sorry, you're out."
        isAlive = false
    }
    messageEl.textContent = message
}

function renderCasino(){
    casinoEl.textContent = "Dealer's hand: "
    for (let i = 0; i < cardsCasino.length; i++){
    casinoEl.textContent += cardsCasino[i] + "  "}
    
    sumCasinoEl.textContent = "Total: " + sumCasino
    if (sumCasino > sum && sum <= 21 && sumCasino <= 21  ){
        message = "Dealer wins."
    } else if (sumCasino === 21 && sum === 21){
        message = "Dealer wins."
        hasBlackJack = true
    } else if (sumCasino > 21){
        isAliveCasino = false
        message = "Casino is out."
    }
    messageEl.textContent = message
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
    }
    hasBlackJack = false
}

function newCardCasino(){
    if (isAliveCasino === true && hasBlackJack === false && sumCasino < 22){
    let card = randomCardCasino()
    sumCasino += card
    cardsCasino.push(card)
    renderCasino()
    }
    hasBlackJack = false
}

function cashOut(){
    if (sumCasino < sum && sum < 22 && sumCasino < 22){
        player.chips += 50
    } else if (sum > sumCasino && isAlive === false){
        player.chips -= 50
    } else if (sumCasino > sum && isAliveCasino === false ){
        player.chips += 50    
    } else if (isAlive === false && isAliveCasino === true){
        player.chips += 50
    } else {
        player.chips -= 50
    }
    playerEl.textContent = player.name + player.chips
    namePlayer()
}

function namePlayer(){
    let nameInput = document.getElementById("name-input").value
    playerEl.textContent = nameInput + ": $" + player.chips
    
}