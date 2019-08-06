class Food {
    create(){
        this.x = (Math.floor(Math.random() * 25 ) * size);     
        this.y = (Math.floor(Math.random() * 15 ) * size);
        let arraySnake;
        for( let i = 0; i < snake.sections.length; i++){
            arraySnake = snake.sections[i].split(",");
            if( this.x == arraySnake[0] && this.y == arraySnake[1]){
                this.x = (Math.floor(Math.random() * 25 ) * size);     
                this.y = (Math.floor(Math.random() * 15 ) * size);
            }
        }
        console.log( this.x , this.y);
        console.log(  snake.sections[0] , snake.sections[1]);
    }
    
    draw(ctx) {
        ctx.fillStyle = "#585858";
        ctx.strokeStyle= "white"
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, size, size);
        ctx.strokeRect(this.x, this.y, size, size);
        ctx.closePath();
        ctx.fill(); 
    }
}         