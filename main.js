const beginBtn = document.querySelector('#begin-button');
const shape = document.querySelector('#shape');
const previousClickTime = document.querySelector('#previous-click-time');
const clickTime = document.querySelector('#click-time');
const playAgainBtn = document.querySelector('.play-again')


//Add event listener for begin btn, play again btn and shape btn
beginBtn.addEventListener('click', startGame);
shape.addEventListener('click', game);
playAgainBtn.addEventListener('click', playAgain)

let start = new Date().getTime();
let count = 0;
let times = [];
let totalTime = 0;
let meanTime = 0;

//Removes intro screen and switches to game screen & begins keeping time
function startGame() {
    start = new Date().getTime()

    document.querySelector('.intro-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block' ;
    clear();
    game();
    
}

function playAgain() {
    start = new Date().getTime();

    document.querySelector('#game-end-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block'; 
    
    clear();
    game();
    
}

//Makes sure all times are cleared when starting game
function clear() {
    previousClickTime.innerHTML = '';
    clickTime.innerHTML = '';
    times = [];
    totalTime = 0;
    count = 0;
}

//contains all functions for game to work
function game() {

    //Changes the color shape with rgb random #'s
    function changeColor() {
        
        let x = randInt(0, 255);
        let y = randInt(0, 255);
        let z = randInt(0, 255);
        let color = `rgb(${x}, ${y}, ${z})`;
    
        shape.style.backgroundColor = color;
    }

    //Randomly positions shape around the screen and randomly changes from square to circle
    function moveShape() {
    
        let top = randInt(1, 600);
        let left = randInt(1, 95);
    
        if(randInt(0, 1) > 0.5) {
            shape.style.borderRadius = '50%';
        } else {
            shape.style.borderRadius = '0';
        }
        shape.style.top = top + 'px';
        shape.style.left = left + 'vw';
    }

    //Displays previous time taken and current time taken to click shape
    function displayTime() {
        let end = new Date().getTime();
        let timeTaken = (end - start) / 1000;
       
        

        if(clickTime.innerHTML === '') {
            clickTime.innerHTML = `${timeTaken}`;
        } else if(clickTime.innerHTML !== '') {
            previousClickTime.innerHTML = `${clickTime.innerHTML}`;
            clickTime.innerHTML = `${timeTaken}s`;
        } else return

        

        function averageTime() {
            
            if(timeTaken === 0.001 || timeTaken === 0) {
                clickTime.innerHTML = '';
            } else {
                times.push(timeTaken);
            }
            
            if (count === 10) {
                for(time of times) {
                    totalTime += time;
                }
                meanTime = (totalTime / 10).toFixed(3);

                document.querySelector('#average-time').innerHTML = `Your average time was ${meanTime}s`;
                document.querySelector('.game-container').style.display = 'none';
                document.querySelector('#game-end-container').style.display = 'block';
            }
            
        }

        averageTime()
        console.log(times)
    console.log(count)
    console.log(totalTime)
        count +=1
        }
        
     moveShape()
     changeColor()
     displayTime()
     start = new Date().getTime()
}

//Function to get a random number min + max inclusive
function randInt(min, max){
    
    return Math.floor(Math.random() * (max - min + 1) + min);
}


