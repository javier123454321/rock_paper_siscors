function Game(selector) {
    const application = document.querySelector(selector)
    
    this.score

    this.init = function() {
        application.querySelectorAll('.playerOption').forEach(option => {
            option.addEventListener('click', onPlayerSelect.bind(this))
        })
        this.score = new ScoreKeeper(10)
        this.resetGame()
    }
    
    this.resetGame = function(){
        application.querySelector('.gameArea > .gameArea_userFeedback').innerText = 'Select Rock, Paper, or Scissor to get started'
    }

    this.showSelections = function() {
        this.showComputerSelection()
        this.showPlayerSelection()
    }

    this.showComputerSelection = function() {
        application.querySelector('#computer-selection').innerHTML = `
        <div>
            <h3>Player 2 Chose ${this.computerSelection}</h3>
            <img src="/assets/img/${this.computerSelection}.png">
        </div>
        `
    }
    this.showPlayerSelection = function() {
        application.querySelector('#player-selection').innerHTML =  `
        <div>
            <h3>Player 1 Chose ${this.playerSelection}</h3>
            <img src="/assets/img/${this.playerSelection}.png">
        </div>
        `
    }
    function onPlayerSelect(el) {
        const { target } = el
        this.playerSelection = target.dataset.value || target.parentElement.dataset.value
        this.computerSelection = getComputerSelection()
        this.showSelections()
        const winner = getWinner([this.playerSelection, this.computerSelection])
        this.handleRoundWinner(winner)
    }

    this.handleRoundWinner = function(winner) {
        this.score.addWinner(winner)
        console.log(this.score.getWinner() || 'no winner yet')
        this.showRoundWinner(winner)
    },
    this.showRoundWinner = function(winner) {
        // needs to have a closure
        const resultsText = (winner !== 'tie') ? winner + " has won" : "There was a tie"
        application.querySelector('.gameArea > .gameArea_userFeedback').innerText = resultsText
    }
}

function ScoreKeeper(rounds) {
    this.gamesPlayed = 0
    this.winners = []
    this.maxRounds = rounds
}

ScoreKeeper.prototype = {
    addWinner(winner) {
        this.winners.push(winner)
        this.gamesPlayed ++
    },
    currentRound() {
        return this.gamesPlayed;
    },
    getWinner() {
        const winnerKey = this.getScore()
        const winsToFinish = Math.round(this.maxRounds / 2)
        console.log({winnerKey});
        if(this.gamesPlayed >= winsToFinish + (winnerKey['tie'] || 0)) {

            const [player1Won, player2Won] = [
                winnerKey['player 1'] >= winsToFinish,
                winnerKey['player 2'] >= winsToFinish
            ]
            if(player1Won)       return 'player 1'
            else if (player2Won) return 'player 2'
            return
        }
    },
    getScore() {
        console.log(this)
        return this.winners.reduce((object, key) => {
            object[key] = ++object[key] || 1;
            return object;
          }, {});
    }
}

function getWinner(selection) {
    const [playerA, playerB] = selection

    const playerAWon = (playerA === 'rock'      && playerB === 'scissor'    ||
                        playerA === 'scissor'   && playerB === 'paper'      ||
                        playerA === 'paper'     && playerB === 'rock')

    const playerBWon = (playerB === 'rock'      && playerA === 'scissor'    ||
                        playerB === 'scissor'   && playerA === 'paper'      ||
                        playerB === 'paper'     && playerA === 'rock')

    return  (playerAWon ? 'player 1' : (playerBWon ? 'player 2' : 'tie'))
}

function getComputerSelection() {
    return ['rock', 'paper', 'scissor'][Math.round(Math.random()*2)]
}



const app = new Game('#app')
app.init()
const app2 = new Game('#app2')
app2.init()