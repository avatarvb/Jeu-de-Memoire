const cards = document.querySelectorAll(".card")
let scoreOutput = document.getElementById('score')
let timer = document.getElementById("timer")


// data to store player, score, c time
let player;
let score = 0
let c = 0
let t

let hasFlippedCard = false
let lockGame = false
let firstCard, secondCard
let rounds = 5


// get Player name
document.addEventListener("DOMContentLoaded", getPlayerName());

function flipCard() {
    if (lockGame) return
    if (this === firstCard) return

    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true
        firstCard = this
        return
    }
    // second click
    secondCard = this

    checkCard()
}

// match cards selected
function checkCard() {
    let isMutch = firstCard.dataset.info === secondCard.dataset.info
    // isMutch ? disableCards() : unflipCards()
    if (isMutch) {
        score += 30
        disableCards()
        samScore()
        rounds = rounds - 1
    } else {
        score = Math.max(0, score - 10)
        unflipCards()
        samScore()
    }
}
// disable Cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetGame()
}

// unFlipCard
function unflipCards() {
    lockGame = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetGame()
    }, 1000)
}

// reset Game
function resetGame() {
    [hasFlippedCard, lockGame] = [false, false]
    [firstCard, secondCard] = [null, null]
}

// execute this func onload page
(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()


function samScore(value) {
    scoreOutput.textContent = score
    if (rounds == 0) {
        swal("Good job!", "Your Score " + score + " in " + c + " sec ", "success");
        // store the game
        store()
    }
}

function timedCount() {
    timer.textContent = c;
    c = c + 1;
    t = setTimeout(function () {
        timedCount()
    }, 1000);
}

//get Player name

function getPlayerName() {
    swal("You Name :", {
            content: "input",
        })
        .then((value) => {
            // swal(`You typed: ${value}`);
            // save input in the var player
            player = value
            timedCount()
        })
}

// save inlocalstorage
function store() {
    let Player = {
        name: player,
        score: score,
        sec: c,
        date: new Date()
    }
    let MyObj_serialized = JSON.stringify(Player)
    localStorage.setItem(MyObj_serialized)
}

cards.forEach(card => card.addEventListener('click', flipCard));