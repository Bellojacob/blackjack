// Variables
// arrays
let playerName;
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
let randomCardArray = [];
let userCardsArray = []
let cpuCardsArray = []
let redIcons = [
    "images/club-red.svg",
    "images/heart-red.svg",
    "images/spade-red.svg",
    "images/diamond-red.svg"
];

let blackIcons = [
    "images/diamond-black.svg",
    "images/heart-black.svg",
    "images/spade-black.svg",
    "images/club-black.svg"
];

let redOrBlackArray = []
let shapeArray = []





function generateRedOrBlackArray(){
    for (let i = 0; i < 99; i++){
        let randomNum = Math.floor(Math.random() * 2);
        redOrBlackArray.push(randomNum)
        
    }
}

console.log("this is the red or black array " + redOrBlackArray)

let redOrBlack;
for (let i = 0; i <redOrBlackArray.length; i++){
    if (redOrBlackArray[i] == 1){
       redOrBlack = "red"
    } else {
        redOrBlack = "black"
    }
}

let chosenImg;
function getChosenImg(){
    for (let i = 0; i < 99; i++){
        let randomNum = Math.floor(Math.random() * 4);
        if (redOrBlack === "red") {
            if (randomNum === 0) {
                chosenImg = redIcons[0];
            } else if (randomNum === 1) {
                chosenImg = redIcons[1];
            } else if (randomNum === 2) {
                chosenImg = redIcons[2];
            } else if (randomNum === 3) {
                chosenImg = redIcons[3];
            }
        } else if (redOrBlack === "black") {
            if (randomNum === 0) {
                chosenImg = blackIcons[0];
            } else if (randomNum === 1) {
                chosenImg = blackIcons[1];
            } else if (randomNum === 2) {
                chosenImg = blackIcons[2];
            } else if (randomNum === 3) {
                chosenImg = blackIcons[3];
            }
        }
        generateRedOrBlackArray()
        return chosenImg;
    }
}







//Buttons
let hitBtn = document.querySelector("#hit");
let standBtn = document.querySelector("#stand");
let resetBtn = document.querySelector("#reset");
let addUserName = document.querySelector("#addName")

// iterators
let counter = 3;
let cpuCounter = 3;
// score trackers
let numericalUserTotal = 0;
let numericalCpuTotal = 0;

// Function calls
generateCards();
assignCards();

displayUserScore();
displayUserCard();
displayCpuCard();


// Event listeners
hitBtn.addEventListener("click", newCard);
standBtn.addEventListener("click", cpuTurn);
resetBtn.addEventListener("click", resetGame);
addUserName.addEventListener("click", takeUserName)


function takeUserName(){
    playerName = document.querySelector("#userName").value
    console.log("User's Name is " + playerName)
    console.log("The Add Name button was clicked") 
    displayScore()   
}


// generate a random card deck
function generateCards() {
    randomCardArray = []; // Clear the deck before generating new cards
    for (let i = 0; i < 52; i++) {
        let randomCard;
        do {
            randomCard = cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
            
        } while (randomCardArray.filter(card => card === randomCard).length >= 4);
        randomCardArray.push(randomCard);
    }
    console.log("Generating Cards...");
    console.log(randomCardArray);
    return randomCardArray;
}

// pull a random card from the deck
function getCard() {
    let card = randomCardArray[Math.floor(Math.random() * randomCardArray.length)];
    // remove that card from the deck
    randomCardArray.pop(card)
    // console.log(randomCardArray)
    return card;
}

// Assign initial (2) cards to CPU and User
function assignCards() {
    let cpuCard1 = getCard();
    let cpuCard2 = getCard();

    let userCard1 = getCard();
    let userCard2 = getCard();

    // Add the scores
    addScore(userCard1);
    addScore(userCard2);
    userCardsArray.push(userCard1)
    userCardsArray.push(userCard2)

    addCpuScore(cpuCard1);
    addCpuScore(cpuCard2);
    cpuCardsArray.push(cpuCard1)
    cpuCardsArray.push(cpuCard2)

    console.log(`Cpu assigned ${cpuCard1} and ${cpuCard2}. User assigned ${userCard1} and ${userCard2}`);
    console.log(`Cpu's card are ${cpuCardsArray}`)
    console.log(`User's card are ${userCardsArray}`)
    displayScore()
}

// method to handle score calculation for the user
function addScore(card) {
    // if the new card passed in is K,Q, or J, then add 10 to the user's score
    if (card == "K" || card == "Q" || card == "J") {
        numericalUserTotal = numericalUserTotal + 10;
    // if the card is A, then check if it should be a 1 or 11, then add that to the user's score
    } else if (card == "A") {
        if (numericalUserTotal + 11 > 21) {
            numericalUserTotal = numericalUserTotal + 1;
        } else {
            numericalUserTotal = numericalUserTotal + 11;
        }
        // if it is not a K,Q,J,or, A, then it has to be a number, so just add that to the score
    } else {
        numericalUserTotal = numericalUserTotal + Number(card);
    }

    // each time a score is added, check if the score is greater than 21,
    // if so then hide the playing buttons, and allow the user to reset the game
    if (numericalUserTotal > 21) {
        userBust();
    }

    // return the score to the variable
    return numericalUserTotal;
}

// Add the score for the CPU
function addCpuScore(cpuCard) {
    // same functionality as for the user, all scores added to numericalCpuTotal
    if (cpuCard == "K" || cpuCard == "Q" || cpuCard == "J") {
        numericalCpuTotal = numericalCpuTotal + 10;
    } else if (cpuCard == "A") {
        if (numericalCpuTotal + 11 > 21) {
            numericalCpuTotal = numericalCpuTotal + 1;
        } else {
            numericalCpuTotal = numericalCpuTotal + 11;
        }
    } else {
        numericalCpuTotal = numericalCpuTotal + Number(cpuCard);
    }

    if (numericalCpuTotal > 21) {
        document.querySelector(".result").innerText = "CPU Bust!";
        showResetBtn();
    }

    // return the cpu score to the variable
    return numericalCpuTotal;
}

// Display the user score
function displayUserScore() {
        if (playerName == undefined || playerName == ""){
            document.querySelector(".userTotal").innerText = `User's Total: ${numericalUserTotal}`;
        } else {
            document.querySelector(".userTotal").innerText = `${playerName}'s Total: ${numericalUserTotal}`;
        }
        
    }



// Display the CPU score
function displayCpuScore() {
    // display the cpu score
    document.querySelector(".cpuTotal").innerText = "CPU Total: " + numericalCpuTotal;
}

// function to call both score displays
function displayScore(){
    displayCpuScore()
    displayUserScore()
}





function displayUserCard() {
    for (let i = 0; i < userCardsArray.length; i++) {
        let currentCardElement = document.querySelector(`#userCard${i + 1}`);
        currentCardElement.innerText = userCardsArray[i];
        console.log(`Added value ${userCardsArray[i]} to card ${i + 1}`);
        currentCardElement.style.display = "block";

        // Set redOrBlack based on the redOrBlackArray value
        if (redOrBlackArray[i] === 0) {
            redOrBlack = "red";
        } else {
            redOrBlack = "black";
        }

        let imgElement = document.createElement("img");
        imgElement.src = getChosenImg();
        imgElement.classList.add("card-icon");
        currentCardElement.appendChild(imgElement);

        // Set the color of the card text
        currentCardElement.style.color = redOrBlack;
    }
}


        // if (randomNum % 2 == 0){
        //     currentCardElement.style.color = "red";
        //     let imgElement = document.createElement("img");
        //     imgElement.src = redIcons[Math.floor(Math.random()*redIcons.length)]
        //     imgElement.classList.add("card-icon");
        //     currentCardElement.appendChild(imgElement)
        // } else {
        //     currentCardElement.style.color = "black";
        //     let imgElement = document.createElement("img");
        //     imgElement.src = blackIcons[Math.floor(Math.random()*blackIcons.length)]
        //     imgElement.classList.add("card-icon");
        //     currentCardElement.appendChild(imgElement)
        // }



function hideUserCard() {
    for (let i = 2; i < userCardsArray.length; i++){
        // console.log(`I am not insane and this card value is ${userCardsArray[i]}`)
        let card = document.querySelector(`#userCard${i + 1}`);
        card.innerText = "0";
        card.style.display = "none";
        
    }
}

function hideCpuCard() {
    for (let i = 2; i < cpuCardsArray.length; i++){
        // console.log(`I am not insane and this card value is ${userCardsArray[i]}`)
        let card = document.querySelector(`#cpuCard${i + 1}`);
        // card.innerText = "0";
        card.style.display = "none";
        
    }
}

function displayCpuCard(){
    for (let i = 0; i < cpuCardsArray.length; i++) {
        let currentCardElement = document.querySelector(`#cpuCard${i + 1}`);
        currentCardElement.innerText = cpuCardsArray[i];
        console.log(`Added value ${cpuCardsArray[i]} to card ${i + 1}`);
        currentCardElement.style.display = "block";
        
                // Set redOrBlack based on the redOrBlackArray value
                if (redOrBlackArray[i] === 0) {
                    redOrBlack = "red";
                } else {
                    redOrBlack = "black";
                }
        
                let imgElement = document.createElement("img");
                imgElement.src = getChosenImg();
                imgElement.classList.add("card-icon");
                currentCardElement.appendChild(imgElement);
        
                // Set the color of the card text
                currentCardElement.style.color = redOrBlack;
        }
    }


// Draw a new card for the user
function newCard(){
    let newUserCard = getCard()
    addScore(newUserCard);
    console.log(`new user card = ${newUserCard}`)
    userCardsArray.push(newUserCard);
    console.log(`New user array = ${userCardsArray}`)
    displayUserCard()
    displayScore()

}

// Draw a new card for the CPU
function newCpuCard(){
    let newCpuCard = getCard()
    addCpuScore(newCpuCard);
    console.log(`new cpu card = ${newCpuCard}`)
    cpuCardsArray.push(newCpuCard);
    console.log(`New user array = ${cpuCardsArray}`)
    displayCpuCard()
    displayScore()

}


function userBust(){
    document.querySelector(".result").innerText = "User Bust!";
    showResetBtn()
}



// when the standBtn is pressed, then it is the cpu's turn
function cpuTurn(){
    console.log("Computer Playing...");

    // the cpu will keep drawing cards as long as it is under 21 and less than the user's score
    while (numericalCpuTotal < numericalUserTotal && numericalCpuTotal < 21) {
        newCpuCard();
    }

    // logic for if the cpu is wins,ties, or loses
    if (numericalCpuTotal > 21) {
        cpuBust()
    } else if (numericalCpuTotal == numericalUserTotal) {
        cpuTie()
    } else {
        cpuWin()
    }

    showResetBtn();
}

function cpuWin(){
    console.log("CPU Wins!");
    document.querySelector(".result").innerText = "CPU Wins!";
}

function cpuTie(){
    console.log("CPU ties!");
    document.querySelector(".result").innerText = "CPU Ties!";
}

function cpuBust(){
    console.log("CPU busts!");
    document.querySelector(".result").innerText = "CPU Bust!";
}

// show certain button functions
function showResetBtn(){
    hitBtn.style.display = "none";
    standBtn.style.display = "none";
    resetBtn.style.display = "block";
}

function showPlayBtns(){
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    resetBtn.style.display = "none";
}

function hideCpuSecondCard(){
    let currentCardElement = document.querySelector(`#cpuCard2`);
    currentCardElement.style.display = "none"
}

// now reset game
function resetGame(){
    console.log("Resetting the game...")
    // set result to none
    document.querySelector(".result").innerText = "";

    // empty both arrays
    // userCardsArray = []
    // cpuCardsArray = []
    console.log(`User array = ${userCardsArray} \nCpu array = ${cpuCardsArray}`)
    hideUserCard()
    hideCpuCard()
    
    
    // set scores to 0
    numericalUserTotal = 0;
    numericalCpuTotal = 0;
    displayScore()

    // empty both arrays
    userCardsArray = []
    cpuCardsArray = []
    generateCards();
    assignCards();
    displayUserCard()
    displayCpuCard()
    showPlayBtns()
}