document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];

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
    squares[squareIdBeingDragged].style.backgroundColor = colourBeingReplaced
}

})