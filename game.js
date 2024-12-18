
const predictionInput = document.getElementById("prediction-input");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.querySelector(".lives");


let score = 0; 
let lives = 3; 
const correctWord = ["C", "L", "O", "U", "D"]; 
let revealedLetters = []; 


submitButton.addEventListener("click", () => {
    const userGuess = predictionInput.value.trim().toUpperCase(); 
    if (lives == 0 ) {
        alert("You lost the game. Please click the 'Reset the Game' button to start a new game.")
        return
    }

    
    if (userGuess.length !== 1 && userGuess !== "CLOUD") {
        lives = 0
        updateLives()
        alert("Wrong Guess! You Lost the Game");
        predictionInput.value = ""; 
        resetButton.style.display = "block"; 

        return;
    }

  
    if (userGuess === "CLOUD") {
        correctWord.forEach(letter => {
            document.querySelector(`img[alt="${letter}"]`).style.backgroundColor = "transparent";
        });
       
       alert("You won the game!");
      
       resetButton.style.display = "block"; 
        
         return;


    
    }

    
    if (userGuess.length === 1) {
        if (correctWord.includes(userGuess)) {
           
            if (!revealedLetters.includes(userGuess)) {
                revealedLetters.push(userGuess); 
                document.querySelector(`img[alt="${userGuess}"]`).style.backgroundColor = "transparent"; // Arka planı kaldır
                score += 20; 
                scoreDisplay.textContent = score; 

               
                if (score == 100) {
                    alert("You won the game!");
                    resetButton.style.display = "block"; 
                }
            }
        } else {
           
            lives = lives - 1;
            updateLives(); 
            if (lives === 0) {
                alert("You lost the game!");
                resetButton.style.display = "block"; 
            }
        }
    }

    predictionInput.value = ""; 
    resetButton.style.display = "block"; 
});


resetButton.addEventListener("click", () => {
    score = 0; 
    lives = 3; 
    revealedLetters = []; 
    scoreDisplay.textContent = "0"; 
    updateLives(); 
    predictionInput.value = ""; 

    
    correctWord.forEach(letter => {
        document.querySelector(`img[alt="${letter}"]`).style.backgroundColor = "black";
    });

    resetButton.style.display = "none"; 
});



function updateLives() {
    livesDisplay.innerHTML = `Lives: ${"<i class='fas fa-heart' style='color: red;'></i>&nbsp;".repeat(lives)}`;
}


