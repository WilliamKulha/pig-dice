
//Player Constructor

function Player(name, turnNumber, turnScore, totalScore, diceNumber) {
  this.playerName = name;
  this.turnNumber = turnNumber;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
  this.diceNumber = diceNumber;
}

//method to roll die.
Player.prototype.roll = function() {
  if (this.diceNumber === 1) {
    let dieRoll = Math.floor(Math.random() * 6) + 1
    $('.die_image').empty();
    if (dieRoll != 1){
      $('.die_image').append(`<img src='img/die${dieRoll}.svg' class="die_images" alt='A picture of a die with ${dieRoll} displayed'>`)
      this.turnScore += dieRoll
    } else if (dieRoll === 1) {
      $('.die_image').append(`<img src='img/die${dieRoll}.svg' class="die_images" alt='A picture of a die with ${dieRoll} displayed'>`)
      this.turnScore = 0;
      return "Rolled One"
    }
  } else if (this.diceNumber === 2) {

    let dieRoll1 = Math.floor(Math.random() * 6) + 1
    let dieRoll2 = Math.floor(Math.random() * 6) + 1
    $('.die_image').empty();
    $('.die_image2').empty();
    if (dieRoll1 != 1 && dieRoll2 != 1){
      $('.die_image').append(`<img src='img/die${dieRoll1}.svg' class="die_images" alt='A picture of a die with ${dieRoll1} displayed'>`)
      $('.die_image2').append(`<img src='img/die${dieRoll2}.svg' class="die_images" alt='A picture of a die with ${dieRoll2} displayed'>`)
      let totalRoll = dieRoll1 + dieRoll2
      this.turnScore += totalRoll

    } else if (dieRoll1 === 1 || dieRoll2 === 1) {
      $('.die_image').append(`<img src='img/die${dieRoll1}.svg' class="die_images" alt='A picture of a die with ${dieRoll1} displayed'>`)
      $('.die_image2').append(`<img src='img/die${dieRoll2}.svg' class="die_images" alt='A picture of a die with ${dieRoll2} displayed'>`)
      this.turnScore = 0;
      return "Rolled One"
    }
  }
}

Player.prototype.hold = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  this.turnNumber += 1
}

Player.prototype.checkForWinner = function() {
  if (this.totalScore >= 100) {
    return "WON";
  } else {
    return "NOWIN";
  }
}

function Game() {
  this.players = [];
  this.currentPlayerIndex = 0;
}

Game.prototype.switchTurn = function() {
  if (this.currentPlayerIndex === 0) {
    this.currentPlayerIndex = 1;
  }
  else if (this.currentPlayerIndex === 1) {
    this.currentPlayerIndex = 0
  }
}

Game.prototype.currentPlayer = function() {
  return this.players[this.currentPlayerIndex].playerName;
}

const updateGame = function(game) {
  game.switchTurn();

}

//The code to be executed when the computer takes a turn.
function computerTurn(game, player) {

  let computerRoll = player.roll();
  if (computerRoll === 'Rolled One') {
    player.turnNumber += 1;
    player.turnScore = 0;
    updateGame(game);
    return;
  } else if (computerRoll != 'Rolled One') {
    let computerRoll2 = player.roll();
    if (computerRoll2 === 'Rolled One') {
      player.turnNumber += 1;
      player.turnScore = 0;
      updateGame(game);
      return;
    } else if (computerRoll2 != 'Rolled One') {
      computerHold(game, player);

    }
  }
}

//the code to be executed when the computer holds.
function computerHold(game, player) {
  player.totalScore += player.turnScore;
  player.turnScore = 0;
  player.turnNumber += 1
  updateGame(game);
}


$(function() {
  let newGame;
  //The code for two human players (THIS DOESN'T USE THE NEW OBJECT: GAME)
  $('#two_players').click(function() {
    $('.choose_players').slideUp();
    $('#two_player_form').slideDown();
    $('#play').submit(function(event) {
      event.preventDefault();

      $('#initial_info').slideUp();
      $('#game').slideDown();

      let playerOneName = $('#player_one_name').val();
      let playerTwoName = $('#player_two_name').val();
      let diceNumber = parseInt($("input:radio[name='dice']:checked").val());
      console.log(diceNumber);

      const playerOne = new Player(playerOneName, 1, 0, 0, diceNumber);
      const playerTwo = new Player(playerTwoName, 1, 0, 0, diceNumber);
      console.log(playerOne, playerTwo);
      //Set Player turn cards
      function setPlayerOneCard () {
        $('.player_one_name_display').text(`${playerOne.playerName}`);
        $('.player_one_turn').text(`${playerOne.turnNumber}`);
        $('.player_one_turn_score').text(`${playerOne.turnScore}`);
        $('.player_one_total_score').text(`${playerOne.totalScore}`);
      }

//can this be refactored?
      function setPlayerTwoCard () {
        $('.player_two_name_display').text(`${playerTwo.playerName}`);
        $('.player_two_turn').text(`${playerTwo.turnNumber}`);
        $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
        $('.player_two_total_score').text(`${playerTwo.totalScore}`);
      }

      setPlayerOneCard();
      setPlayerTwoCard();

      //Player One Turn

      $('#player_one_roll').click(function() {
        let pOneRoll = playerOne.roll();
        $('.player_one_turn_score').text(`${playerOne.turnScore}`);
        if (pOneRoll === "Rolled One") {
          playerOne.turnNumber += 1;
          setPlayerOneCard();
          $('#player_one_turn').fadeOut();
          $('#player_two_turn').fadeIn();
        }
      });
      $('#player_one_hold').click(function() {
        playerOne.hold();
        $('#player_one_turn').fadeOut();
        $('#player_two_turn').fadeIn();
        setPlayerOneCard();

        let wonOrNot = playerOne.checkForWinner();
        if (wonOrNot === "WON") {
          $(`body`).fadeOut('slow');
          alert(`${playerOne.playerName} has won with ${playerOne.totalScore} points! If you'd like to play again, refresh the page.`)
        } else {
          return;
        }
      });
      //Player two turn
      $('#player_two_roll').click(function() {
        let pTwoRoll = playerTwo.roll();
        $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
        if (pTwoRoll === "Rolled One") {
          playerTwo.turnNumber += 1;
          setPlayerTwoCard();
          $('#player_two_turn').fadeOut();
          $('#player_one_turn').fadeIn();
        }
      });
      $('#player_two_hold').click(function() {
        playerTwo.hold();
        $('#player_two_turn').fadeOut();
        $('#player_one_turn').fadeIn();
        setPlayerTwoCard();

        let wonOrNot = playerTwo.checkForWinner();
        if (wonOrNot === "WON") {
          $(`body`).fadeOut('slow');
          alert(`${playerTwo.playerName} has won with ${playerTwo.totalScore} points! If you'd like to play again, refresh the page.`)
        } else {
          return;
        }
      });
    });
  });
  $('#computer').click(function() {
    $('.choose_players').slideUp();
    $('#one_player_form').slideDown();
    $('#vsCompPlay').submit(function(event) {
      event.preventDefault();
      $('#initial_info').slideUp();
      $('#game').slideDown();
      let playerName = $('#player_name').val();
      let computerName = 'HAL';
      let diceNumber = parseInt($("input:radio[name='dice']:checked").val());
      const playerOne = new Player(playerName, 1, 0, 0, diceNumber);
      const playerTwo = new Player(computerName, 1, 0, 0, diceNumber);
      newGame = new Game();
      newGame.players.push(playerOne, playerTwo);
      console.log(newGame);
      //Set Player turn cards
      function setPlayerOneCard () {
        $('.player_one_name_display').text(`${playerOne.playerName}`);
        $('.player_one_turn').text(`${playerOne.turnNumber}`);
        $('.player_one_turn_score').text(`${playerOne.turnScore}`);
        $('.player_one_total_score').text(`${playerOne.totalScore}`);
      }

//can this be refactored?
      function setPlayerTwoCard () {
        $('.player_two_name_display').text(`${playerTwo.playerName}`);
        $('.player_two_turn').text(`${playerTwo.turnNumber}`);
        $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
        $('.player_two_total_score').text(`${playerTwo.totalScore}`);
      }

      setPlayerOneCard();
      setPlayerTwoCard();


      //Turns
      $('#player_one_roll').click(function() {
        let pOneRoll = playerOne.roll();
        $('.player_one_turn_score').text(`${playerOne.turnScore}`);
        if (pOneRoll === "Rolled One") {
          playerOne.turnNumber += 1;
          setPlayerOneCard();
          updateGame(newGame);
          $('#player_one_turn').fadeOut('slow');

          //Player one has rolled a one, so the computer goes.
          computerTurn(newGame, playerTwo);
          setPlayerTwoCard();
          //Check if the computer has won.
          if(playerTwo.totalScore >= 100) {
            alert(`${playerTwo.playerName} has won with ${playerTwo.totalScore} points! If you'd like to play again, refresh the page.`)
          }
          //if no win, player one's buttons come back.
          $('#player_one_turn').fadeIn('slow');
        }
      });
      //Player one holds, and their turn ends.
      $('#player_one_hold').click(function() {
        playerOne.hold();
        updateGame(newGame);

        $('#player_one_turn').fadeOut('slow');
        setPlayerOneCard();

        let wonOrNot = playerOne.checkForWinner();
        if (wonOrNot === "WON") {
          $(`body`).fadeOut('slow');
          alert(`${playerOne.playerName} has won with ${playerOne.totalScore} points! If you'd like to play again, refresh the page.`)
        } else {
          //If the player hasn't won, we let the computer take a turn, then check if HAL has won.
          computerTurn(newGame, playerTwo);
          if(playerTwo.totalScore >= 100) {
            setPlayerTwoCard();
            alert(`HAL has won with ${playerTwo.totalScore} points! If you'd like to play again, refresh the page.`)
          } else {
            $('#player_one_turn').fadeIn('slow');
            setPlayerTwoCard();
          }
        }
      });
    });
  });
});
