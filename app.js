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
                else if (isTie()) {
                    resultSpan.innerHTML = 'It is a tie!'
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

function isTie() {
    if (countColumns.reduce( (acc, value) => acc + value) === columns * rows) {
        return true
    }
    return false
}

function isWin(column, index) {
    if (isWinVertical(column, index)) {
        return true
    }
    else if (isWinHorizontal(column, index)) {
        return true
    }
    else if (isWinDiagonal1(column, index)) {
        return true
    }
    else if (isWinDiagonal2(column, index)) {
        return true
    }
    return false
}

function isWinVertical(column, index) {
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

function isWinHorizontal(column, index) {
    stepsRight = 0
    while (((index + stepsRight + 1) % columns !== 0) && (stepsRight < 4) && (squares[index + stepsRight + 1].classList.contains(player[turn])) ) {
        stepsRight += 1
    }
    // There are steps similar disks to the right
    // If there are three similar disks to the right, the player won
    if (stepsRight === 3) {
        return true
    }
    // Otherwise, we need to see if there are 4 - 1 - stepsRight disks to the left
    stepsLeft = 0
    while ((index - stepsLeft - 1 > -1) && (index - stepsLeft - 1 % columns !== columns - 1) && (stepsLeft < 3 - stepsRight) && (squares[index - stepsLeft - 1].classList.contains(player[turn]))) {
        stepsLeft += 1
    }
    if (stepsLeft + stepsRight + 1 === 4) {
        return true
    }
    return false
}

function isWinDiagonal1(column, index) {
    // check for win on right slanting diagonal
    stepsRight = 0
    while ( (index - ( stepsRight + 1 ) * (columns - 1)  > 0) && (stepsRight < 4) && (squares[index - ( stepsRight + 1 ) * (columns - 1)].classList.contains(player[turn])) ) {
        stepsRight += 1
    }
    if (stepsRight === 3) {
        return true
    }
    stepsLeft = 0
    while ( (index + (stepsLeft + 1) * (columns - 1) < columns * rows) && ( stepsLeft + stepsRight < 3) && (squares[index + (stepsLeft + 1) * (columns - 1)].classList.contains(player[turn])) ) {
        stepsLeft += 1
    }
    if (stepsLeft + stepsRight === 3) {
        return true
    }
    return false
}

function isWinDiagonal2(column, index) {
    // check for win on left slanting diagonal
    stepsLeft = 0
    while ( (index - ( stepsLeft + 1 ) * (columns + 1)  > 0) && (stepsLeft < 4) && (squares[index - ( stepsLeft + 1 ) * (columns + 1)].classList.contains(player[turn])) ) {
        stepsLeft += 1
    }
    if (stepsLeft === 3) {
        return true
    }
    stepsRight = 0
    while ( (index + (stepsRight + 1) * (columns + 1) < columns * rows) && ( stepsLeft + stepsRight < 3) && (squares[index + (stepsRight + 1) * (columns + 1)].classList.contains(player[turn])) ) {
        stepsRight += 1
    }
    if (stepsLeft + stepsRight === 3) {
        return true
    }
    return false
}

function getColumnTopIndex(divindex) {
    return divindex % columns 
}

initializeBoard()