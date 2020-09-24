document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    const candyColours = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]

    function createBoard() {
        for (let i = 0; i < Math.pow(width, 2); i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColour = Math.floor(Math.random() * candyColours.length)
            square.style.backgroundColor = candyColours[randomColour]
            grid.appendChild(square)
            squares.push(square)
        }
    }
createBoard()

let colourBeingDragged, colourBeingReplaced, squareIdBeingDragged, squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', dragOver));
squares.forEach(square => square.addEventListener('dragenter', dragEnter));
squares.forEach(square => square.addEventListener('dragleave', dragLeave));
squares.forEach(square => square.addEventListener('drop', dragDrop));

function dragStart() {
    colourBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
    console.log(this.id, 'dragstart');
}

function dragEnd() {
    console.log(this.id, 'dragend');
let validMoves = [
    squareIdBeingDragged - 1, 
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width,
];
let validMove = validMoves.includes(squareIdBeingReplaced);

if (squareIdBeingReplaced && validMove) {
    squareIdBeingReplaced = null;
} else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingReplaced].style.backgroundColor = colourBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundColor = colourBeingDragged;
} else {
    squares[squareIdBeingDragged].style.backgroundColor = colourBeingDragged;
}
}

function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, 'dragenter');
}

function dragLeave() {
    console.log(this.id, 'dragleave');
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover');
}

function dragDrop() {
    console.log(this.id, 'drop');
    colourBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColour = colourBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colourBeingReplaced
}

function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const nonValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}
checkRowForThree();

function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}

checkColumnForThree();

function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i+1, i+2, i+3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const nonValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}
checkRowForFour();

function checkColumnForFour() {
    for (i = 0; i < 47; i++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}

checkColumnForFour();

window.setInterval(function() {
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)

})