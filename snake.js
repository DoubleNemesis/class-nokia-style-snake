        const squares = [];
        const boxOutline = document.getElementById('box-outline')
        let currentSnake = [2,1,0]
        let currentApple = 0
        let direction = 1
        const width = 10;
        let intervalTime = 500;
        let speed =1;
        let timerId = 0;
        let score = 0;
        let scoreDisplay = document.getElementById('score')
        let head = 0;
        let tail = 2;
        let headClass = 'head-right'
        let tailClass = 'tail-right'
        let tailThang = 0;


        function createGrid(){
            for (let i=0; i<100; i++){
            let newSquare = document.createElement('div')
            newSquare.classList.add('square')
            squares.push(newSquare)
            boxOutline.appendChild(newSquare)
        }
        }
        createGrid()

            function start(){
                intervalTime = 500;
                direction = 1
                score=0
                head=0
                scoreDisplay.textContent=0;
                currentSnake.forEach(element => squares[element].classList.remove('snakeStyle'));
                currentSnake.forEach(element => squares[element].classList.remove(headClass));
                currentSnake.forEach(element => squares[element].classList.remove(tailClass));
                currentSnake = [2,1,0]
                currentSnake.forEach(element => squares[element].classList.add('snakeStyle'));
                squares[currentSnake[head]].classList.add('head-right')
                if(squares[currentApple].classList.contains('apple')){
                    squares[currentApple].classList.remove('apple')   
                }
                createApple()
                timerId = setInterval(moveSnake, intervalTime)
            }       
//create the snake
            currentSnake.forEach(element => squares[element].classList.add('snakeStyle'));
            squares[currentSnake[head]].classList.add('head-right')
            squares[currentSnake[tail]].classList.add(tailClass)
            head = currentSnake.pop();
         
            function moveSnake(){

               tailThang = currentSnake.slice(currentSnake.length-3)[0] - currentSnake.slice(currentSnake.length-2)[0]

                setSnakeHead()
                if( 
                (currentSnake[0] - width <0 && direction === -width) || //top
                (currentSnake[0] + width > width*width && direction === width) || //bottom
                (currentSnake[0] % width === 0 && direction === -1) || //left
                (currentSnake[0] % width === width-1 && direction === 1) || //right
                squares[currentSnake[0] + direction].classList.contains('snakeStyle')
                ){
                        return clearInterval(timerId)
                    }
                    squares[currentSnake[currentSnake.length-1]].classList.remove('tail-right','tail-left','tail-down','tail-up')
                // apple eaten!
                if (squares[currentSnake[0]+direction].classList.contains('apple')){
                    squares[currentSnake[0]+direction].classList.remove('apple')
                    createApple()
                    intervalTime = intervalTime*0.95;
                    clearInterval(timerId)
                    timerId = setInterval(moveSnake, intervalTime)
                    score++
                    scoreDisplay.textContent=score;
                    currentSnake.push(3)

                }
                squares[currentSnake[currentSnake.length-1]].classList.remove('snakeStyle')
                currentSnake.pop();
                currentSnake.unshift(currentSnake[0]+direction)
                currentSnake.forEach(element => squares[element].classList.add('snakeStyle'))
                squares[currentSnake[head]].classList.add(headClass)
                squares[currentSnake[head]-direction].classList.remove('head-right', 'head-left', 'head-down', 'head-up')
                newTail = currentSnake.slice(currentSnake.length-1)[0]
                setSnakeTail()
                squares[currentSnake[currentSnake.length-1]].classList.add(tailClass)
                }
            document.getElementById('btn').addEventListener('click', start)
            
            document.addEventListener('keydown', setDirection)
            function setDirection(e){
                if (e.keyCode === 39){
                    direction = 1;
                }
                if (e.keyCode === 37){
                    direction = -1;
                }
                if (e.keyCode === 38){
                    direction = -width;
                }
                if (e.keyCode === 40){
                    direction = +width;
                }
            }

            function createApple(){
                let randomNumber = Math.floor(Math.random()*100)
 
                if (squares[randomNumber].classList.contains('snakeStyle') || squares[randomNumber].classList.contains('apple')){
                    console.log('not here')
                    createApple()
                }
                else if (currentApple === randomNumber) {
                    console.log('duplicate')
                    createApple()
                }
                else {
                    squares[randomNumber].classList.add('apple')
                    console.log(randomNumber)
                    currentApple = randomNumber;
                }
            }
            function setSnakeHead(){
                headClass = direction === 1 ? 'head-right' : direction === -1 ? 'head-left' : direction === 10 ? 'head-down' : 'head-up';  
            }
            function setSnakeTail(){
                tailClass = tailThang === 1 ? 'tail-right' : 
                tailThang === -1 ? 'tail-left' : 
                tailThang === 10 ? 'tail-down' : 
                tailThang === -10 ? 'tail-up' : tailClass;
            }