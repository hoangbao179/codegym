
    let canvas = document.getElementById("myCanVas");
    let ctx = canvas.getContext("2d");
    let size = 30;

    
    class Game {
        score = 0;
        fps = 10; 
        over = false;
        start(){
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.over = false;
            snake.init();
            food.create();
            game.score = 0;
            game.fps = 10; 
            
        }
        stop() {
            this.over = true;
            this.message = "GAME - OVER";
        }
        drawScore(){
            ctx.fillStyle = '#999';
            ctx.font ="40px Georgia";
            ctx.textAlign = 'top';
            ctx.fillText(" Điểm "+ game.score, 20, 40);
        }    
        drawMessage() {
            if (this.message === "GAME - OVER") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00F";
            ctx.strokeStyle = "#FFF";
            ctx.font = "50px Georgia";
            ctx.textAlign = "center";
            ctx.fillText(game.message, canvas.width/2, canvas.height/2);
            ctx.strokeText(game.message, canvas.width/2, canvas.height/2);
            }
            
        }
    }
            
    class Snake {
        x = "null";
        y = "null";
        sections = [];

        init(){
            this.sections = [];
            this.direction = "";
            this.x = 300;    
            this.y = 300;
            this.sections.push(this.x +  " , " + this.y)
        }
        
        move() {
            switch (this.direction) {
                case "UP":
                    this.y = this.y - size;
                    break;
                case "DOWN":
                    this.y = this.y + size;
                    break;
                case "LEFT":
                    this.x = this.x - size;
                    break;
                case "RIGHT":
                    this.x = this.x + size;
                    break;
            }
            this.checkGrowth();
            this.checkCollision();
            this.sections.push(this.x + "," + this.y);
        }
    
        draw () {
            for (let i = 0; i < this.sections.length; i++) {
                this.drawSections(this.sections[i].split(",")); 
                ctx.fillStyle = 'red';
                ctx.strokeStyle= "0000ff"
                ctx.beginPath();
                ctx.fillRect(this.x,this.y, size, size);
                ctx.strokeRect(this.x,this.y, size, size);
                ctx.closePath();
                ctx.fill();
            }
        }
    
        drawSections(sections) {
            ctx.fillStyle = 'black';
            ctx.strokeStyle= "white"
            ctx.beginPath();
            ctx.fillRect(parseInt(sections[0]), parseInt(sections[1]), size, size);
            ctx.strokeRect(parseInt(sections[0]), parseInt(sections[1]), size, size);
            ctx.closePath();
            ctx.fill();
        }
    
        checkCollision() {
            if (this.isCollision(this.x, this.y)) {
                game.stop();
            }
        }
    
        isCollision(x, y) {
            if (x > canvas.width - size || y > canvas.height - size 
            || x < 0 || y < 0 ||snake.sections.indexOf(x+','+y) >= 0)  {
                return true;
            }
        }
        checkGrowth() {
            if (snake.x == food.x && snake.y == food.y){   
            game.score++;
                if (game.score % 3 == 0 && game.fps < 30) {
                    game.fps++;
                }
                food.create();
                food.draw(ctx);
            }
            else {
                snake.sections.shift();
            }
        }
    }
    
    class Food {
        
        create(){
            this.x = (Math.floor(Math.random() * 25 + 0) * size);     
            this.y = (Math.floor(Math.random() * 15 + 0) * size);
        }
        draw(ctx) {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "green";
            ctx.strokeStyle= "0000ff"
            ctx.beginPath();
            ctx.fillRect(this.x, this.y, size, size);
            ctx.strokeRect(this.x, this.y, size, size);
            ctx.closePath();
            ctx.fill(); 
        }
    }        
        
    document.addEventListener("keydown", press);
    function press(event) {
        console.log(event.keyCode)
        switch (event.keyCode) {
            case 37:{
                if(snake.direction === 'RIGHT') {
                    break;
                }
                snake.direction = "LEFT";
                    break;
            }
            case 38:{
                if(snake.direction === 'DOWN') {
                    break;
                }
                snake.direction = "UP";
                    break;
            }
            case 39:{
                if(snake.direction === 'LEFT') {
                    break;
                }
                snake.direction = "RIGHT";
                break;
            }
            case 40:{
                if(snake.direction === 'UP') {
                    break;
                }
                snake.direction = "DOWN";
                break;
            }
        }
    }

    let snake = new Snake();
    let food = new Food();
    let game = new Game();
    function newgame(){
        game.start();
        
    }

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
            }, 1000 / game.fps)
            
        }         
    }
    requestAnimationFrame(gameLoop);
    