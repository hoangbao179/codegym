let canvas = document.getElementById("myCanVas");
    let ctx = canvas.getContext("2d");
    let size = 30;
    let imagePlay = document.getElementById("playgame");
    let imageEnd = document.getElementById("play");
    let imageBackground = document.getElementById("background");
    let snake = new Snake();
    let food = new Food();
    let game = new Game();

    function gameLoop() {
        if (game.over == false) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.drawScore();
            food.draw(ctx);
            snake.move();
            snake.draw();
            game.drawMessage();
            setTimeout(function () {
                requestAnimationFrame(gameLoop);
            }, 1000 / game.fps);
            
        }         
    }
    requestAnimationFrame(gameLoop);
    