const board = document.getElementById('board')
function initializeBoard() {
    for (let i = 0 ; i < 7 ; i++) {
        for (let j = 0 ; j < 6 ; j++) {
            const div = document.createElement('div')
            board.appendChild(div)
        }
    }
}

initializeBoard()