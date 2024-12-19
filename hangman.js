// Pages
const startPage = document.getElementById('main-menu');
const instructionsPage = document.getElementById('how-to-play');
const categorySelectionPage = document.getElementById('category-selection');
const gamePage = document.getElementById('game-page');
const overPage = document.getElementById('game-over');

// Buttons
const startGameBtn = document.getElementById('play-button');
const instructionsBtn = document.getElementById('how-to-play-button');
const backToStartBtn = document.getElementById('back-to-menu');
const backToStartFromCategoryBtn = document.getElementById('back-to-main');
const backToCategoryBtn = document.getElementById('pause');
const categoryButtons = document.querySelectorAll('.category-btn');

// Game Elements
const categoryTitle = document.getElementById('category-title');
const wordDisplay = document.getElementById('word-display');
const healthBar = document.getElementById('health-bar');
const alphabetContainer = document.getElementById('alphabet-container');


let currentWord = '';
let word = '';
let displayedWord = [];
let health = 6;


const categories = {
  Movies: [
    "The Godfather", "Titanic", "Inception", "Gladiator", "Casablanca", "Psycho", "Avatar", 
    "Deadpool", "Frozen", "The Matrix", "Goodfellas", "Braveheart", "Fight Club", "Pulp Fiction", 
    "Forrest Gump", "The Lion King", "Jurassic Park", "Blade Runner", 
    "Star Wars", "The Dark Knight", "Despicable Me", "The Wizard of Oz", "Maze Runner", 
    "Toy Story", "Alien", "Interstellar", "Parasite", "La La Land", "Spirited Away", "Dune", "A Quiet Place"
  ],
  TV_Shows: [
    "Breaking Bad", "South Park", "Game of Thrones", "Stranger Things", "The Sopranos", "Friends", 
    "The Office", "Sherlock", "Black Mirror", "The Crown", "Westworld", "Better Call Saul", 
    "The Simpsons", "Arrested Development", "Succession", "Fargo", "Mad Men", "The West Wing", "Dexter", 
    "Rick and Morty", "Lost", "Doctor Who", "The Walking Dead", 
    "Peaky Blinders", "The Witcher", "Curb Your Enthusiasm", "Supernatural", "Money Heist",
    "Wednesday", "True Detective", "Squid Game"
  ],
  Countries: [
    "Australia", "Azerbaijan", "Brazil", "Canada", "Denmark", "Egypt", "France", "Georgia", "Germany", "Hungary", "India", 
    "Japan", "Kenya", "Luxembourg", "Mexico", "Netherlands", "Oman", "Peru", "Qatar", "Russia", 
    "Spain", "Turkiye", "Thailand", "United Kingdom", "Vietnam", "Italy", "United States", "China", "South Africa", 
    "New Zealand", "Argentina", "Belgium", "Chile"
  ],
  Capital_Cities: [
    "Baku", "Tokyo", "Paris", "London", "Kuala Lumpur", "Berlin", "Ottawa", "Canberra", "Moscow", "Beijing", 
    "New Delhi", "Copenhagen", "Cairo", "Madrid", "Rome", "Buenos Aires", "Bangkok", "Vienna", "Seoul", 
    "Jakarta", "Lisbon", "Riyadh", "Helsinki", "Oslo", "Stockholm", "Athens", "Dublin", "Prague", "Budapest", 
    "Warsaw", "Amsterdam", "Ankara", "Tbilisi"
  ],
  Animals: [
    "Elephant", "Lion", "Giraffe", "Penguin", "Dolphin", "Tiger", "Kangaroo", "Panda", "Zebra", 
    "Polar Bear", "Cheetah", "Rhino", "Buffalo", "Koala", "Gorilla", "Chimpanzee", "Crocodile", "Flamingo", 
    "Peacock", "Jaguar", "Leopard", "Wolf", "Fox", "Bald Eagle", "Owl", "Frog", "Shark", "Octopus", "Turtle", 
    "Snake"
  ],
  Sports: [
    "Soccer", "Basketball", "Tennis", "Baseball", "Rock Climbing", "Swimming", "Volleyball", "Table Tennis", 
    "Badminton", "Rugby", "Cricket", "Hockey", "Boxing", "Martial Arts", "Fencing", "Archery", "Skiing", 
    "Bobsleigh", "Cycling", "Curling", "Surfing", "Diving", "Gymnastics", "Athletics", "Rowing", "Sailing", 
    "Canoeing", "Ice Hockey", "Triathlon", "American Football"
  ]
};


startGameBtn.addEventListener('click', () => switchPage(startPage, categorySelectionPage));
instructionsBtn.addEventListener('click', () => switchPage(startPage, instructionsPage));
backToStartBtn.addEventListener('click', () => switchPage(instructionsPage, startPage));
backToStartFromCategoryBtn.addEventListener('click', () => switchPage(categorySelectionPage, startPage));


// Selects category
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    startGame(category);
  });
});

// Switching pages
function switchPage(currentPage, nextPage) {
  currentPage.style.display = 'none';
  nextPage.style.display = 'flex';
}

// Start Game
let currentCategory = '';

function startGame(category) {
  currentCategory = category; 
  categoryTitle.textContent = `${category.replace("_", " ")}`;
  currentWord = getRandomWord(category).toUpperCase();
  word = currentWord;
  displayedWord = Array.from(word, (char) => (char === " " ? " " : "_"));
  health = 6;
  setupHealthBar();
  setupWordDisplay();
  setupAlphabetButtons();
  switchPage(categorySelectionPage, gamePage);
}

// Random Word
function getRandomWord(category) {
  const wordList = categories[category.replace(" ", "_")];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Health Bar
function setupHealthBar() {
  healthBar.innerHTML = '';
  for (let i = 0; i < health; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    healthBar.appendChild(heart);
  }
}

// Word Display
let letterBoxes = [];

function setupWordDisplay() {
  wordDisplay.innerHTML = '';
  letterBoxes = [];

  const words = word.split(' '); 

  words.forEach((wordPart) => {
    const wordRow = document.createElement('div');
    wordRow.classList.add('word-row');

    const rowBoxes = [];

    Array.from(wordPart).forEach((char) => {
      const box = document.createElement('div');
      box.classList.add('letter-box');
      box.textContent = '_';
      rowBoxes.push({ char, box });
      wordRow.appendChild(box);
    });

    wordDisplay.appendChild(wordRow);
    letterBoxes.push(...rowBoxes);
  });
}



// Setup Alphabet Buttons
function setupAlphabetButtons() {
  alphabetContainer.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const button = document.createElement('button');
    button.textContent = String.fromCharCode(i);
    button.addEventListener('click', () => handleLetterClick(button));
    alphabetContainer.appendChild(button);
  }
}

// Handle Letter Click
function handleLetterClick(button) {
  const letter = button.textContent;
  button.disabled = true;

  if (word.includes(letter)) {
    updateWord(letter);
  } else {
    loseHealth();
  }
}


const pauseOverlay = document.getElementById('pause-overlay');
const gameEndOverlay = document.getElementById('game-end-overlay');
const endMessage = document.getElementById('end-message');


const pauseBtn = document.getElementById('pause');
const continueBtn = document.getElementById('continue-button');
const newCategoryBtn = document.getElementById('new-category-button');
const quitGameBtn = document.getElementById('quit-game-button');
const continueGameBtn = document.getElementById('continue-game-button');


const newCategoryEndBtn = document.getElementById('new-category-end-button');
const quitEndGameBtn = document.getElementById('quit-end-game-button');


pauseBtn.addEventListener('click', () => toggleOverlay(pauseOverlay, true));
continueBtn.addEventListener('click', () => toggleOverlay(pauseOverlay, false));
newCategoryBtn.addEventListener('click', goToCategorySelection);
quitGameBtn.addEventListener('click', goToMainMenu);
continueGameBtn.addEventListener('click', restartGame);



newCategoryEndBtn.addEventListener('click', goToCategorySelection);
quitEndGameBtn.addEventListener('click', goToMainMenu);

// Show/Hide Overlays
function toggleOverlay(overlay, show) {
  overlay.classList.toggle('active', show);
}


function endGame(won, currentWord) {
  endMessage.textContent = won ? "You Win!" : "Game Over!";
  const revealedWordElement = document.getElementById('revealed-word');
  

  revealedWordElement.textContent = `The word was: ${currentWord}`;
  
  // Show the game over overlay
  toggleOverlay(gameEndOverlay, true);
  
 
  continueGameBtn.addEventListener('click', () => {
    restartGame();
  });
}



function restartGame() {
  word = getRandomWord(currentCategory).toUpperCase();
  currentWord = word;
  displayedWord = Array.from(word, (char) => (char === " " ? " " : "_"));
  
  health = 6;
  setupHealthBar();
  setupWordDisplay();
  setupAlphabetButtons();

  // Hiding the game over/win overlay
  toggleOverlay(gameEndOverlay, false);
}




// go Category Selection
function goToCategorySelection() {
  toggleOverlay(pauseOverlay, false);
  toggleOverlay(gameEndOverlay, false);
  gamePage.style.display = "none";
  categorySelectionPage.style.display = "flex";
}

// Back to Main Menu
function goToMainMenu() {
  toggleOverlay(pauseOverlay, false);
  toggleOverlay(gameEndOverlay, false);
  gamePage.style.display = "none";
  startPage.style.display = "flex";
}

// Update Word Logic to End Game Properly
function updateWord(letter) {
  letterBoxes.forEach(({ char, box }) => {
    if (char === letter) box.textContent = letter;
  });

  // Check if the word is fully revealed
  if (!letterBoxes.some(({ box }) => box.textContent === "_")) {
    endGame(true, currentWord);
  }
}

// Losing Health
function loseHealth() {
  health--;
  healthBar.removeChild(healthBar.lastElementChild);
  
  if (health === 0) {
    endGame(false, currentWord);
  }
}





