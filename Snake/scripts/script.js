document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    let blocksize = 20;
    let rightLimit = c.clientWidth-blocksize;
    let bottomLimit = c.clientHeight-blocksize;

    
    let tail = [];
    let headX = c.clientWidth/2;
    let headY = c.clientHeight/2;
    let movement = 20;
    let tailLength = 3;
    let tailCollision = false;
    let i = 0;

    let appleX;
    let appleY;
    let appleCollision = false;
    
    let moveUp = false;
    let moveDown = false;
    let moveLeft = false;
    let moveRight = true;
    
    
    
    
    
    function draw() {
        ctx.clearRect(0, 0, 400, 400)
        drawHead();
        drawApple();
        
        if (i<= tailLength){
            tail[i] = {tailpartX: headX, tailpartY: headY};
            i++;
            if (i > tailLength) {i=0;}
            
        }
        
        
        drawTail();
        
        console.clear();
        console.log("moveUp: " + moveUp +
        "\nmoveDown: " + moveDown +
        "\nmoveRight: " + moveRight +
        "\nmoveLeft: " + moveLeft);
        console.log(headX + " " + headY);
        console.log(tail);
                
        if(headX <= rightLimit && headY <= bottomLimit && headX >= 0 && headY >= 0){
                if (moveUp == true) {
                    headY -= movement;
                }
                else if (moveDown == true) {
                    headY += movement;
                }
                else if (moveRight == true) {
                    headX += movement;
                }
                else if (moveLeft == true) {
                    headX -= movement;
                }
            }
            else 
            {
                gameOver();
            }
        }
        
        function drawHead() {
            for (let index = 0; index < tail.length; index++) {
                if(headX == tail[index].tailpartX && headY == tail[index].tailpartY){
                    gameOver();
                }
                
            }

            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "green";
            ctx.rect(headX, headY, blocksize, blocksize);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        };
        
        function drawTail() {
            tail.forEach(e => {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.fillStyle = "green";
                ctx.rect(e.tailpartX, e.tailpartY, blocksize, blocksize);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });
        };

        function appleLocation(){
            do {
                appleCollision = false;

                let unroundedX = Math.floor(Math.random() * (401-blocksize));
                let unroundedY = Math.floor(Math.random() * (401-blocksize));
                appleX = Math.round(unroundedX / 20) * 20;
                appleY = Math.round(unroundedY / 20) * 20;

                tail.forEach(e => {
                    if(appleX == e.tailpartX && appleY == e.tailpartY)
                    {
                        appleCollision = true;
                    }
                });
                
                if (appleX == headX && appleY == headY) {appleCollision = true}
                
            } while (appleCollision == true)
        }

        function drawApple() {
            if(appleX == null || appleY == null){
                appleLocation();
                drawApple();
            }
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "red";
            ctx.rect(appleX, appleY, blocksize, blocksize);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            if(headX == appleX && headY == appleY){
                appleLocation();
                tailLength++;
            }
        }

        function gameOver() {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
        
        document.addEventListener("keydown", keyDownHandler);
        
        function keyDownHandler(e) {
            if
            ((e.key == "up" || e.key == "ArrowUp") && (moveDown != true && moveUp != true))
            {
                moveDown = false; 
                moveLeft = false; 
                moveRight = false;
                moveUp = true;
            }
            else if
            ((e.key == "down" || e.key == "ArrowDown") && (moveDown != true && moveUp != true))
            {
                moveUp = false; 
                moveLeft = false; 
                moveRight = false;
                moveDown = true;
            }
            else if
            ((e.key == "right" || e.key == "ArrowRight") && (moveLeft != true && moveRight != true))
            {
                moveUp = false; 
                moveLeft = false; 
                moveDown = false;
                moveRight = true;
            }
            else if
            ((e.key == "left" || e.key == "ArrowLeft") && (moveLeft != true && moveRight != true))
            {
                moveUp = false; 
                moveRight = false; 
                moveDown = false;
                moveLeft = true;
            }
        }
        
        setInterval(draw, 100);
    };