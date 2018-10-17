//Player Constructor

function Player(name, turnNumber, turnScore, totalScore) {
  this.playerName = name;
  this.turnNumber = turnNumber;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

//method to roll die.
Player.prototype.roll = function() {
  let dieRoll = Math.floor(Math.random() * 6) + 1
  $('.die_image').empty();
  if (dieRoll != 1){
    $('body').fadeOut('slow');
    $('body').fadeIn('fast');
    $('.die_image').append(`<img src='img/die${dieRoll}.svg' class="die_images" alt='A picture of a die with ${dieRoll} displayed'>`)
    this.turnScore += dieRoll
  } else if (dieRoll === 1) {
    $('body').fadeOut('slow');
    $('body').fadeIn('fast');
    $('.die_image').append(`<img src='img/die${dieRoll}.svg' class="die_images" alt='A picture of a die with ${dieRoll} displayed'>`)
    this.turnScore = 0;
    return "Rolled One"
  }
}

Player.prototype.rollTwo = function() {
  let dieRoll1 = Math.floor(Math.random() * 6) + 1
  let dieRoll2 = Math.floor(Math.random() * 6) + 1
  $('.die_image').empty();
  $('.die_image2').empty();
  if (dieRoll1 != 1 && dieRoll2 != 1){
    $('body').fadeOut('slow');
    $('body').fadeIn('fast');
    $('.die_image').append(`<img src='img/die${dieRoll1}.svg' class="die_images" alt='A picture of a die with ${dieRoll1} displayed'>`)
    $('.die_image2').append(`<img src='img/die${dieRoll2}.svg' class="die_images" alt='A picture of a die with ${dieRoll2} displayed'>`)
    let totalRoll = dieRoll1 + dieRoll2
    this.turnScore += totalRoll

  } else if (dieRoll1 === 1 || dieRoll2 === 1) {
    $('body').fadeOut('slow');
    $('body').fadeIn('fast');
    $('.die_image').append(`<img src='img/die${dieRoll1}.svg' class="die_images" alt='A picture of a die with ${dieRoll1} displayed'>`)
    $('.die_image2').append(`<img src='img/die${dieRoll2}.svg' class="die_images" alt='A picture of a die with ${dieRoll2} displayed'>`)
    this.turnScore = 0;
    return "Rolled One"
  }
}

Player.prototype.hold = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
}

Player.prototype.checkForWinner = function() {
  if (this.totalScore >= 100) {
    return "WON";
  }
}




$(function() {
  //For one die
  $('.one_dice').click(function(event) {
    event.preventDefault();
    //Create the two Players.
    let playerOneName = $(`#player_one_name`).val();
    let playerTwoName = $(`#player_two_name`).val();
    const playerOne = new Player(playerOneName, 1, 0, 0);
    const playerTwo = new Player(playerTwoName, 1, 0, 0);

    $(`#initial_info`).slideUp();
    $(`#game`).slideDown();
    //Set Player turn cards
    function setPlayerOneCard () {
      $('.player_one_name_display').text(`${playerOne.playerName}`);
      $('.player_one_turn').text(`${playerOne.turnNumber}`);
      $('.player_one_turn_score').text(`${playerOne.turnScore}`);
      $('.player_one_total_score').text(`${playerOne.totalScore}`);
    }

    function setPlayerTwoCard () {
      $('.player_two_name_display').text(`${playerTwo.playerName}`);
      $('.player_two_turn').text(`${playerTwo.turnNumber}`);
      $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
      $('.player_two_total_score').text(`${playerTwo.totalScore}`);
    }
    setPlayerOneCard();
    setPlayerTwoCard();

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
        playerOne.turnNumber += 1;
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
      $('#player_two_roll').click(function() {
        let pTwoRoll = playerTwo.roll();
        $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
        if (pTwoRoll === "Rolled One") {
          playerTwo.turnNumber += 1;
          setPlayerTwoCard();
          $('#player_one_turn').fadeIn();
          $('#player_two_turn').fadeOut();
        }
      });
      $('#player_two_hold').click(function() {
        playerTwo.hold();
        playerTwo.turnNumber += 1;
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
  $('.two_dice').click(function(event) {
    event.preventDefault();
    //Create the two Players.
    let playerOneName = $(`#player_one_name`).val();
    let playerTwoName = $(`#player_two_name`).val();
    const playerOne = new Player(playerOneName, 1, 0, 0);
    const playerTwo = new Player(playerTwoName, 1, 0, 0);

    $(`#initial_info`).slideUp();
    $(`#game`).slideDown();
    //Set Player turn cards
    function setPlayerOneCard () {
      $('.player_one_name_display').text(`${playerOne.playerName}`);
      $('.player_one_turn').text(`${playerOne.turnNumber}`);
      $('.player_one_turn_score').text(`${playerOne.turnScore}`);
      $('.player_one_total_score').text(`${playerOne.totalScore}`);
    }

    function setPlayerTwoCard () {
      $('.player_two_name_display').text(`${playerTwo.playerName}`);
      $('.player_two_turn').text(`${playerTwo.turnNumber}`);
      $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
      $('.player_two_total_score').text(`${playerTwo.totalScore}`);
    }
    setPlayerOneCard();
    setPlayerTwoCard();

      $('#player_one_roll').click(function() {
        let pOneRoll = playerOne.rollTwo();
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
        playerOne.turnNumber += 1;
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
      $('#player_two_roll').click(function() {
        let pTwoRoll = playerTwo.rollTwo();
        $('.player_two_turn_score').text(`${playerTwo.turnScore}`);
        if (pTwoRoll === "Rolled One") {
          playerTwo.turnNumber += 1;
          setPlayerTwoCard();
          $('#player_one_turn').fadeIn();
          $('#player_two_turn').fadeOut();
        }
      });
      $('#player_two_hold').click(function() {
        playerTwo.hold();
        playerTwo.turnNumber += 1;
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
