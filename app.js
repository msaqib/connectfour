const board = document.getElementById('board')
const playerSpan = document.getElementById('player')
let squares = null

const columns = 7
const rows = 6

let turn = 0

const player = ['red', 'blue']

let countColumns = [0, 0, 0, 0, 0, 0, 0]

function initializeBoard() {
    for (let i = 0 ; i < 7 ; i++) {
        for (let j = 0 ; j < 6 ; j++) {
            const div = document.createElement('div')
            board.appendChild(div)
        }
    }
    squares = board.querySelectorAll(":scope > div")
    squares.forEach( (square, index) => {
        square.onclick = () => {
            turn = 1 - turn
            playerSpan.innerHTML = turn + 1
        }
    })
}

function getColumnTopIndex(divindex) {
    return divindex % columns 
}

initializeBoard()