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
  $('#die_image').empty();
  if (dieRoll != 1){
    this.turnScore =+ dieRoll
    $('body').fadeOut();
    $('.die_image').append(`<img src='img/die${dieRoll}.svg' alt='A picture of a die with ${dieRoll} displayed'>`)
    $('body').fadeIn();
  } else if (dieRoll === 1) {
    this.turnScore = 0;
  }
}

//check for winner
function checkForWinner(player) {
  if (player.totalScore < 100) {
    return
  } else if (player.totalScore >= 100) {
    return 'WON'
  }
}



$(function() {
  $('#play').submit(function(event) {
    event.preventDefault();
    //Create the two Players.
    let playerOneName = $(`#player_one_name`).val();
    let playerTwoName = $(`#player_two_name`).val();
    const playerOne = new Player(playerOneName, 1, 0, 0);
    const playerTwo = new Player(playerTwoName, 1, 0, 0);
    console.log(playerOne, playerTwo)

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


  });
});
