class Game {
    score = 0;
    fps = 8; 
    over = false;
    start(){
        imagePlay.style.display = "none";
        imageEnd.style.display = "none";
        imageBackground.style.display = "none";
        snake.init();
        food.create();
        game.score = 0;
        game.fps = 10;    
    }

    stop(){
        this.over = true;
        this.message = "GAME - OVER";
        imageEnd.style.display = "block";
    }

    drawScore(){
        ctx.fillStyle = "black";
        ctx.font ="20px Georgia";
        ctx.textAlign = 'top';
        ctx.fillText(game.score, 10, 30);
    } 

    drawMessage(){
        if (this.message === "GAME - OVER"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "0A5A39";
        ctx.strokeStyle = "black";
        ctx.font = "40px Georgia";
        ctx.textAlign = "center";
        ctx.fillText(game.message, canvas.width/2, canvas.height/2 - 20 );
        ctx.strokeText(game.message, canvas.width/2, canvas.height/2 - 20);
        ctx.fillText(" Score " + game.score, canvas.width/2 , canvas.height/2 + 50);
        ctx.strokeText(" Score " + game.score, canvas.width/2 , canvas.height/2 + 50);
        }
    }
    
}