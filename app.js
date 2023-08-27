const board = document.getElementById('board')
const playerSpan = document.getElementById('player')
const resultSpan = document.getElementById('result')
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
            const column = getColumnTopIndex(index)
            if (countColumns[column] < rows) {
                // We may place a disk here
                countColumns[column] = countColumns[column] + 1
                const index = column + (rows - countColumns[column])*columns
                squares[column + (rows - countColumns[column])*columns].classList.add(player[turn])
                if (isWin(column, index)) {
                    resultSpan.innerHTML = 'Player ' + (turn + 1) + ' wins'
                    squares.forEach( (square, index) => square.onclick = null)
                }
                turn = 1 - turn
                playerSpan.innerHTML = turn + 1
            }
            else {
                // We can't place a disk in this column
                playerSpan.innerHTML = "This column is full"
            }
        }
    })
}

function isWin(column, index) {
    if (countColumns[column] < 4) {
        return false
    }
    for (let i = index ; i < index + 4 * columns ; i = i + columns) {
        if (!squares[i].classList.contains(player[turn])) {
            return false
        }
    }
    return true
}

function getColumnTopIndex(divindex) {
    return divindex % columns 
}

initializeBoard()