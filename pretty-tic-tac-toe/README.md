# Tic Tac Toe React App
## Overview
This app is based on the tutorial located at [React Tutoria: Tic Tac Toe](https://react.dev/learn/tutorial-tic-tac-toe). The entirety of the game (components and game logic) is contained in the 'src/App.tsx' file. The game consists of a variety of fnctions and components:
1. The Board: This provides the space for placing marks and logic for handling clicks (placing marks) and checking if the board is solved (the solved function is responsible for highlighting winning squares).
2. The History Record: This displays the history of game states and allows players to revert the state to any previous state.
3. The Game Function: This ties the previous two components together and holds important game state information (such as current player, the board state, and the board history).

## How to Run
### Requirements
- Node.js
- npm

### Installation
1. Clone the repository (this will include all of my projects for learning React):
``` 
git clone https://github.com/Young-Griff/LearningReact
```
2. From the 'LearningReact' repository, navigate to the 'tic-tac-toe-app' directory and install the necessary npm contingencies:
```
cd tic-tac-toe-app
npm install
```
3. Run the app and open it on your local host!
```
npm run dev
```