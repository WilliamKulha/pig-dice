# _Pig Dice_

#### _A web app for the dice game Pig, 10-18-2018_

#### By _**William Kulha**_

## Description

_This is a web app that I made to practice BDD and object-oriented JavasScript with learnhowtoprogram.com. The user can choose to play two vs two or vs the computer._

### Specs
| Spec | Input | Output |
| :-------------     | :------------- | :------------- |
**Program creates player objects from user inputted names** | Input: John, Bill| Output: {John}, {Bill} |
**Program sets the number of dice based on what user has selected** | Input: Two dice  | Output: Two dice will be rolled. |
**On each player's turn, they can roll using a math randomizer or hold.** | Input:  Player one rolls| Output: 5 & 4 |
**If a player rolls a one, their current turn points are reduced to zero and the turn is passed** | Input: user rolls one. | Output: user's turn points = 0, current turn = player 2
**The game ends when a player reaches 100 points** | Input: player one's total points = 104  | Output: Player one has won the game with 104 points! |
**If the player chooses to play against a computer, the computer takes turns after the player rolls a one or holds** | Input: Player one holds | Output: computer takes a turn |



## Setup/Installation Requirements

* _Download or clone this repo <code>$git clone https://github.com/zangiboy/pig-dice.git</code>_
* _Navigate to the folder where you saved the directory._
* _Open with the browser of your choice and enjoy_


## Known Bugs

* _Computer dice rolls are done so quickly that they aren't displayed. This issue could be resolved by adding a timeout event and using the computer roll as a callback._

## Support and contact details

_If you have any questions or advice, or if you find another bug, please email me at kulha.william@gmail.com_

## Technologies Used

_javascript_\
_jQuery_\
_Bootstrap 3_

### License

*This Pig Dice Game is licensed under the MIT License*

Copyright (c) 2018 **_William Kulha_**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
