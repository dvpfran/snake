let food = {
    pieceWidth: DEFAULT_COLUMN_SIZE.WIDTH,
    pieceHeight: DEFAULT_COLUMN_SIZE.HEIGHT,
    piece: undefined,
    spwan: function() {
        let column = generateNumber(0, area.grid.columns - 1);
        let row = generateNumber(0, area.grid.rows - 1);

        let columnEmpty = false;
        let rowEmpty = false;

        while (!columnEmpty) {
            column = generateNumber(0, area.grid.columns - 1) * this.pieceWidth;
            columnEmpty = isColumnPositionEmpty(column);
        }

        while (!rowEmpty) {
            row = generateNumber(0, area.grid.rows - 1) * this.pieceHeight;
            rowEmpty = isRowPositionEmpty(row);
        }

        if (this.piece) {
            this.piece.x = column;
            this.piece.y = row;
        }
        else {
            this.piece = new component(
                COMPONENT_ID.FOOD_COMPONENT,
                this.pieceWidth,
                this.pieceHeight,
                2,
                "#253034",
                "red",
                column,
                row,
                true
            );
            listComponents.push(this.piece);
        }
    }
};

const generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isColumnPositionEmpty = (position) => {
    for (let index = 0; index < listComponents.length; index++) {
        if (listComponents[index].canCollide) {
            if (listComponents[index].x == position) {
                return false;
            }
        }
    }
    return true;
};

const isRowPositionEmpty = (position) => {
    for (let index = 0; index < listComponents.length; index++) {
        if (listComponents[index].canCollide) {
            if (listComponents[index].y == position) {
                return false;
            }
        }
    }
    return true;
};