const prompt = require('prompt');
prompt.start();

prompt.get(['userSelection'], function (err, result) {
  if (err) {
    return onErr(err);
  }

  // Convert the user's selection to uppercase to standardize input
  const userSelection = result.userSelection.toUpperCase();

  // Only 'R', 'P', 'S' commands are allowed
  if (userSelection !== 'R' && userSelection !== 'P' && userSelection !== 'S') {
    console.log('Invalid input. Please enter only R (Rock), P (Paper), or S (Scissors).');
    return;  // Exit the function
  }

  // Map 'R', 'P', 'S' to 'ROCK', 'PAPER', 'SCISSORS'
  const userChoice = userSelection === 'R' ? 'ROCK' : 
                     userSelection === 'P' ? 'PAPER' : 'SCISSORS';

  console.log('User selected:', userChoice);

  // computer's random selection
  const random = Math.random();
  let computerSelection;

  if (random <= 0.34) {
    computerSelection = 'PAPER';
  } else if (random <= 0.67) {
    computerSelection = 'SCISSORS';
  } else {
    computerSelection = 'ROCK';
  }

  console.log('Computer selected:', computerSelection);

  // Consider the winner
  function determineWinner(user, computer) {
    if (user === computer) {
      return "It's a tie!";
    } else if (
      (user === 'ROCK' && computer === 'SCISSORS') ||
      (user === 'PAPER' && computer === 'ROCK') ||
      (user === 'SCISSORS' && computer === 'PAPER')
    ) {
      return 'User Wins!';
    } else {
      return 'Computer Wins!';
    }
  }

  // Show the outcome
  const outcome = determineWinner(userChoice, computerSelection);
  console.log(outcome);
});

function onErr(err) {
  console.log(err);
  return 1;
}
