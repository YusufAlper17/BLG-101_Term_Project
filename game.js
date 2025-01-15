const predictionInput = document.getElementById("prediction-input");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.querySelector(".lives");

let score = 0; 
let lives = 3; 
const correctWord = ["C", "L", "O", "U", "D"]; 
let foundLetters = []; 

submitButton.addEventListener("click", () => {
    const userGuess = predictionInput.value.trim().toUpperCase(); 
    
    if (!userGuess) {
        alert("Please make a guess!");
        return;
    }
    
    if (lives == 0 ) {
        alert("You lost the game. Please click the 'Reset the Game' button to start a new game.")
        return
    }

    if (userGuess === "CLOUD") {
        correctWord.forEach(letter => {
            document.querySelector(`img[alt="${letter}"]`).style.backgroundColor = "transparent";
        });
        
        setTimeout(function() {
            alert("You won the game!");
            submitButton.disabled = true;
            submitButton.onclick = function() {
                alert("Please click the reset button");
            };
            resetButton.style.display = "block";
        }, 500);
        return;
    }

    if (userGuess.length === 1) {
        if (correctWord.includes(userGuess)) {
            if (!foundLetters.includes(userGuess)) {
                foundLetters.push(userGuess);
                document.querySelector(`img[alt="${userGuess}"]`).style.backgroundColor = "transparent";
                score += 20;
                scoreDisplay.textContent = score;

                if (score == 100) {
                    setTimeout(function() {
                        alert("You won the game!");
                        submitButton.disabled = true;
                        submitButton.onclick = function() {
                            alert("Please click the reset button");
                        };
                        resetButton.style.display = "block";
                    }, 500);
                }
            }
        } else {
            lives = lives - 1;
            updateLives();
            
            if (lives === 0) {
                livesDisplay.classList.add('shake-animation');
                setTimeout(function() {
                    alert("You lost the game!");
                    resetButton.style.display = "block";
                }, 600);
            }
        }
    } else {
        lives = 0;
        updateLives();
        alert("Wrong Guess! You Lost the Game");
        resetButton.style.display = "block";
    }

    predictionInput.value = "";
});

resetButton.addEventListener("click", () => {
    score = 0;
    lives = 3;
    foundLetters = [];
    
    scoreDisplay.textContent = "0";
    updateLives();
    predictionInput.value = "";
    
    submitButton.disabled = false;
    submitButton.onclick = null;
    
    livesDisplay.classList.remove('shake-animation');
    
    correctWord.forEach(letter => {
        document.querySelector(`img[alt="${letter}"]`).style.backgroundColor = "black";
    });
    
    resetButton.style.display = "none";
});

function updateLives() {
    let hearts = "<i class='fas fa-heart' style='color: red;'></i>&nbsp;".repeat(lives);
    livesDisplay.innerHTML = `Lives: ${hearts}`;
}


