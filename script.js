document.addEventListener("DOMContentLoaded", () => {
        const squares = document.querySelectorAll(".grid div")
        const scoreDisplay = document.querySelector("span")
        const startBtn = document.querySelector(".start")

        const width = 10
        let currentIndex = 0
        let appleIndex = 0
        let currentSnake = [2,1,0]
        let direction = 1
        let score = 0
        let speed = 0.9
        let intervalTime = 0
        let interval = 0

        function startGame(){
                currentSnake.forEach(index => squares[index].classList.remove("snake"))
                squares[appleIndex].classList.remove("apple")

                clearInterval(interval)
                score = 0
                randomApple()
                direction = 1
                scoreDisplay.innerText = score
                intervalTime = 1000
                currentSnake = [2,1,0]
                currentIndex = 0
                currentSnake.forEach(index => squares[index].classList.add("snake"))
                interval = setInterval(moveOutcomes, intervalTime)
        }

        function randomApple(){
                do {
                        appleIndex = Math.floor(Math.random() * squares.length)
                } while (squares[appleIndex].classList.contains("snake"));

                squares[appleIndex].classList.add("apple")
        }

        function moveOutcomes(){
                // deal with the snake hitting the border or itself
                if (
                        (currentSnake[0] + width >= (width * width) && direction ===  width) || // if snake hits bottom edge
                        (currentSnake[0] % width === width -1 && direction === 1) || //snake hits right edge
                        (currentSnake[0] % width === 0 && direction === -1) || //snake hits left edge
                        (currentSnake[0] - width < 0 && direction === -width) || //snake hits upper edge
                        squares[currentSnake[0] + direction].classList.contains("snake")
                // if snake hits itself
                ) {
                        return clearInterval(interval)//clear the interval if the above happens
                }

                const tail = currentSnake.pop() // pop last item and display it
                squares[tail].classList.remove("snake")// remove class of snake from the Tail
                currentSnake.unshift(currentSnake[0] + direction)//give direction to the head of the array

                // deal with the snake eating an apple
                if (squares[currentSnake[0]].classList.contains("apple")) {
                        squares[currentSnake[0]].classList.remove("apple")
                        squares[tail].classList.add("snake")
                        currentSnake.push(tail)
                        randomApple() // generate a new random apple on the canvas
                        score++ // increment player score
                        scoreDisplay.textContent = score // display score
                        intervalTime *= speed // increase the speed
                        interval = setInterval(moveOutcomes, intervalTime)
                }
                squares[currentSnake[0]].classList.add("snake")
        }

        // function for moving the snake in different directions
        function control(e){
                squares[currentIndex].classList.remove("snake")

                if(e.keyCode === 39){
                        direction = 1 // direction for movement if right arrow key is pressed
                } else if(e.keyCode === 38){
                        direction = -width
                } else if(e.keyCode === 37){
                        direction = -1
                } else if(e.keyCode === 40){
                        direction = +width
                }
        }

        document.addEventListener("keyup", control)
        startBtn.addEventListener("click", startGame)
})