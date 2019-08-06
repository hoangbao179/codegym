class Snake {
    x = "null";
    y = "null";
    sections = [];
    init(){
        this.sections = [];
        this.direction = "";
        this.x = (Math.floor(Math.random() * 25 ) * size);     
        this.y = (Math.floor(Math.random() * 15 ) * size);
        this.sections.push(this.x +  " , " + this.y);
    }
    
    move(){
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

    draw(){
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

    drawSections(sections){
        ctx.fillStyle = 'black';
        ctx.strokeStyle= "white"
        ctx.beginPath();
        ctx.fillRect(parseInt(sections[0]), parseInt(sections[1]), size, size);
        ctx.strokeRect(parseInt(sections[0]), parseInt(sections[1]), size, size);
        ctx.closePath();
        ctx.fill();
    }

    checkCollision(){
        if (this.isCollision(this.x, this.y)){
            game.stop();
        }
    }

    isCollision(x, y){
        if (x > canvas.width - size || y > canvas.height - size 
        || x < 0 || y < 0 ||snake.sections.indexOf( x + ',' + y) >= 0)  {
            return true;
        }
    }

    checkGrowth(){
        if (snake.x == food.x && snake.y == food.y){   
        game.score++;
            if (game.score % 2 == 0 && game.fps < 30){
                game.fps++;
            }
            food.create();
            food.draw(ctx);
        }
        else{
            snake.sections.shift();
        }
    }
}