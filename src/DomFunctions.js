export default function Game(selector) {
    const application = document.querySelector(selector)

    this.init = function() {
        application.querySelectorAll('.playerOption').forEach(option => {
            console.log(option);
            option.addEventListener('click', onPlayerSelect)
        })
    }
    
    function onPlayerSelect(el) {
        const { target } = el
        const selection = target.dataset.value || target.parentElement.dataset.value
        const winner = handleSelection(selection)
        showWinner(winner)
    }
}

function showWinner(winner) {
    // doesn't have a closure
    application.querySelector('#winner').innerText = winner + " has won"
}

function handleSelection(selection) {
    return 'Computer'
}