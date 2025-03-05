
let theThumbnails = document.querySelectorAll('#buttonHolder img'),
    gameBoard = document.querySelector('.puzzle-board'),
    pzlPiecesContainer = document.querySelector('.puzzle-pieces'),
    dropZones = document.querySelectorAll('.drop-zone');


function changeImageSet() {
    console.log('Changing puzzle set...');

    
    gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

    
    resetPuzzlePieces(this.dataset.bgref);
}


function resetPuzzlePieces(imageSet) {
    pzlPiecesContainer.innerHTML = ''; 

    
    dropZones.forEach(zone => zone.innerHTML = '');

    let pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    pieceNames.forEach(piece => {
        let img = document.createElement('img');
        img.id = piece;
        img.src = `images/${piece}${imageSet}.jpg`;
        img.classList.add('puzzle-image');
        img.alt = `${piece} puzzle piece`;
        img.draggable = true;

        
        img.addEventListener('dragstart', allowDrag);
        img.addEventListener('dragend', allowDragEnd);

        
        pzlPiecesContainer.appendChild(img);
    });

    console.log('Puzzle pieces reset.');
}


function allowDrag(event) {
    console.log('Started dragging an image');
    event.dataTransfer.setData('draggedEl', this.id);

    
    setTimeout(() => {
        this.classList.add('hidden'); 
    }, 0);
}


function allowDragEnd(event) {
    console.log('Drag ended');
    this.classList.remove('hidden'); 
}


function allowDragOver(event) {
    event.preventDefault();
}


function allowDrop(event) {
    event.preventDefault();

    let droppedElId = event.dataTransfer.getData('draggedEl');
    let droppedEl = document.querySelector(`#${droppedElId}`);

    
    if (this.children.length === 0) {
        this.appendChild(droppedEl);
    } else {
        console.log("Drop zone already occupied!");
    }
}


theThumbnails.forEach(thumbnail => thumbnail.addEventListener('click', changeImageSet));
dropZones.forEach(zone => {
    zone.addEventListener('dragover', allowDragOver);
    zone.addEventListener('drop', allowDrop);
});


resetPuzzlePieces(0);
