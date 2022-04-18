let curLocalDate = new Date();
let oldSecond = curLocalDate.getSeconds();

const lessenSecond = 2;

const area = {
    canvas : document.createElement("canvas"),
    milliseconds : 20,
    keySpaceUp : true,
    keyUpArrowUp : true,
    grid: {
        isGridEnabled: true,
        columns: 20,
        rows: 20,
        columnWidth: DEFAULT_COLUMN_SIZE.WIDTH,
        columnHeight: DEFAULT_COLUMN_SIZE.HEIGHT,
        lineWidth: 2,
        lineColor: "#253034",
        backColor: "#26393d",
        gridPositions: [],
    },
    generateGrid: function() {
        let columnPositions = [];
        let indexComponent = 0;

        for (let idxRow = 0; idxRow < this.grid.rows; idxRow++) {
            columnPositions = [];
            for (let idxColumn = 0; idxColumn < this.grid.columns; idxColumn++) {
                columnPositions.push(0);
                listComponents.push(
                    new component(
                        indexComponent,
                        this.grid.columnWidth,
                        this.grid.columnHeight, 
                        this.grid.lineWidth, 
                        this.grid.lineColor, 
                        this.grid.backColor, 
                        setColumnPosition(idxColumn, this.grid.columnWidth), 
                        setRowPosition(idxRow, this.grid.columnHeight), 
                        false,
                        "", 
                    )
                );  
            }
            //this.grid.gridPositions.push(columnPositions);
        }
    },
    start: function() {
        this.canvas.width = this.grid.columns * this.grid.columnWidth;
        this.canvas.height = this.grid.rows * this.grid.columnHeight;

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        this.interval = setInterval(updateArea, this.milliseconds);

        if (this.grid.isGridEnabled) {
            this.generateGrid();
        }
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const updateArea = () => {
    area.clear();

    curLocalDate = new Date();

    if (oldSecond === (curLocalDate.getSeconds() - lessenSecond)) {
    }

    for(let indexComp = 0; indexComp < listComponents.length; indexComp++) {
        listComponents[indexComp].update();
    }
};

const setColumnPosition = (index, width) => index * width;
const setRowPosition = (index, height) => index * height;
