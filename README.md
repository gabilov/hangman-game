# Hangman Game

**▶ [Play it live](https://gabilov.github.io/hangman-game/)**

A browser-based Hangman game built with plain HTML, CSS and JavaScript, based on the [Hangman game challenge](https://www.frontendmentor.io/challenges/hangman-game-rsQiSVLGWn) from Frontend Mentor.

This was one of my first front-end projects (December 2024). I built it to practice DOM manipulation, managing game state and moving between screens without a framework.

## Features
- **Six categories:** Movies, TV Shows, Countries, Capital Cities, Animals, Sports
- **Random word** picked from the chosen category
- **Health bar:** six hearts, and you lose one for each wrong guess
- **On-screen A–Z keyboard:** each letter is disabled after you use it
- **Multi-word answers** such as "The Lion King" are split into separate rows
- **Pause menu:** continue, pick a new category, or quit
- **Win/lose screen** that shows the answer

## Screens
Main menu → How to play → Category selection → Game → Pause / end screen

## How to run
No build step. Clone the repo and open `index.html` in a browser.

```bash
git clone https://github.com/gabilov/hangman-game.git
cd hangman-game
open index.html   # or double-click the file
```

## Built with
- HTML5
- CSS3
- Vanilla JavaScript (no libraries)

## What I learned
- Switching between screens by showing and hiding sections
- Building the alphabet keyboard and the letter boxes in JavaScript
- Tracking game state: the current word, the revealed letters, health
- Using overlays for the pause and end-of-game menus

## Known issues and next steps
- No physical keyboard input yet
- The layout isn't fully responsive on small screens

## Credits
The challenge and the design brief are from [Frontend Mentor](https://www.frontendmentor.io).
