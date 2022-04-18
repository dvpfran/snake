let snake = {
    direction: DIRECTION.BOTTOM,
    pieceWidth: DEFAULT_COLUMN_SIZE.WIDTH,
    pieceHeight: DEFAULT_COLUMN_SIZE.HEIGHT,
    pieces: [],
    spwanSnake: function() {
        this.pieces = [];
    },
    spwan: function() {
        let newPiece = new component(
            0,
            this.pieceWidth,
            this.pieceHeight,
            2,
            "#253034",
            "#41b73f",
            0,
            0,
            true
        );

        this.pieces.push(newPiece);
        listComponents.push(newPiece);
    },
    grow: function() {
        const lastPiece = this.pieces[this.pieces.length - 1];

        let column = 0;
        let row = 0;

        switch (this.direction) {
            case DIRECTION.LEFT:
                column = lastPiece.x + 1;
                row = lastPiece.y;
                break;
            
            case DIRECTION.TOP:
                column = lastPiece.x;
                row = lastPiece.y + 1;
                break;

            case DIRECTION.RIGHT:
                column = lastPiece.x - 1;
                row = lastPiece.y;
                break;

            case DIRECTION.BOTTOM:
                column = lastPiece.x;
                row = lastPiece.y - 1;
                break;
        }

        let newPiece = new component(
            0,
            this.pieceWidth,
            this.pieceHeight,
            2,
            "#253034",
            "#41b73f",
            column,
            row,
            true
        );

        this.pieces.push(newPiece);
        listComponents.push(newPiece);
    },
    collide: function(piece, direction) {
        let isCollide = false;

        const columnPosition = getColumnPosition(piece.x, piece.width)
        const rowPosition = getRowPosition(piece.y, piece.height);

        let nextColumn = 0;
        let nextRow = 0;

        // Check margins
        switch (direction) {
            case DIRECTION.LEFT:
                if (columnPosition === 0) {
                    isCollide = true;
                }
                else {
                    nextColumn--;
                }
                break;

            case DIRECTION.TOP:
                if (rowPosition === 0) {
                    isCollide = true;
                }
                else {
                    nextRow--;
                }
                break;

            case DIRECTION.RIGHT:
                if (columnPosition === area.grid.columns - 1) {
                    isCollide = true;
                }
                else {
                    nextColumn++;
                }
                break;

            case DIRECTION.BOTTOM:
                if (rowPosition === area.grid.rows - 1) {
                    isCollide = true;
                }
                else {
                    nextRow++;
                }
                break;
        }

        if (!isCollide) {
            // check if the actual piece will collide another piece.
            for (let idxPiece = 0; idxPiece < this.pieces.length; idxPiece++) {

            }

            // check if the snake will collide with food.
            for (let index = 0; index < listComponents.length; index++) {
                const component = listComponents[index];
                if (component.id === COMPONENT_ID.FOOD_COMPONENT) {
                    if (this.pieces[0].x === component.x && this.pieces[0].y === component.y) {
                        this.grow();
                        food.spwan();
                    }
                }
            }
        }

        return isCollide;
    },
    move: function() {
        const lastPieceIndex = 0;
        let previousX = this.pieces[lastPieceIndex].x;
        let previousY = this.pieces[lastPieceIndex].y;
        
        // Only change position of the first one.

        if (!this.collide(this.pieces[lastPieceIndex], this.direction)) {
            switch (this.direction) {
                case DIRECTION.LEFT:
                    this.pieces[lastPieceIndex].x -= this.pieceWidth;
                    break;
                
                case DIRECTION.TOP:
                    this.pieces[lastPieceIndex].y -= this.pieceHeight;
                    break;
                    
                case DIRECTION.RIGHT:
                    this.pieces[lastPieceIndex].x += this.pieceWidth;
                    break;
    
                case DIRECTION.BOTTOM:
                    this.pieces[lastPieceIndex].y += this.pieceHeight;
                    break;
            }
            
            // Starting at index 1 because index 0 is already defined.
            for (let index = 1; index < this.pieces.length; index++) {
                const x = this.pieces[index].x;
                const y = this.pieces[index].y;
    
                this.pieces[index].x = previousX;
                this.pieces[index].y = previousY;
    
                previousX = x;
                previousY = y;
            }
        }

    }
};

function getColumnPosition(x, width) {
    return x / width;
}

function getRowPosition(y, height) {
    return y / height;
}
