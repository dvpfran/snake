function startGame() {
    area.start();
    snake.growSnake();

    setInterval(() => {
        snake.move();
    }, 500);

    addEventHandlers();
}

const addEventHandlers = () => {
    window.addEventListener("keydown", function(e) {         
        const key = e.key.toLocaleLowerCase();
        if (key === 'd' || key === 'arrowright') {
            oldSecond = curLocalDate.getSeconds();
            snake.direction = DIRECTION.RIGHT;
        } 
        
        if (key === 'a' || key === 'arrowleft') {
            oldSecond = curLocalDate.getSeconds();
            snake.direction = DIRECTION.LEFT;
        }

        if (key === 'w' || key === 'arrowup') {
            if (this.keyArrowUp) {
                this.keyArrowUp = false;
                snake.direction = DIRECTION.TOP;
            }               
        }
        
        if (key === 's' || key === 'arrowdown') {
            snake.direction = DIRECTION.BOTTOM;
        }
    });

    window.addEventListener("keyup", function(e) {
        const key = e.key.toLocaleLowerCase();
        if (key === 'd' || key === 'arrowright' ||
            key === 'a' || key === 'arrowleft' ||
            key === 'w' || key === 'arrowup') {
        }

        if (key === 'w' || key === 'arrowup') {
            this.keyArrowUp = true;
        }
    });
};