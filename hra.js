import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const getGameStatus = () => {
  const gameStatus = [];
  const buttons = document.querySelectorAll('.piskvorky__button-grid');
  buttons.forEach((button) => {
    if (button.classList.contains('piskvorky__button-grid--circle')) {
      gameStatus.push('o');
    } else if (button.classList.contains('piskvorky__button-grid--cross')) {
      gameStatus.push('x');
    } else gameStatus.push('_');
  });
  return gameStatus;
};

const gridButtons = document.querySelectorAll('.piskvorky__button-grid');
gridButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (currentPlayer === 'circle') {
      event.target.classList.add('piskvorky__button-grid--circle');
    } else {
      event.target.classList.add('piskvorky__button-grid--cross');
    }
    event.target.disabled = true;

    const gameStatus = getGameStatus();
    const winner = findWinner(gameStatus);

    if (winner === 'o' || winner === 'x') {
      const winnerSymbol = winner === 'o' ? 'kolečko' : 'křížek';
      if ((winnerSymbol === 'tie')) {
        alert('hra skončila remízou');
      }
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${winnerSymbol}`);
        location.reload();
        return;
      }, 1000);
    }

    const currentPlayerIcon = document.querySelector('#playerIndicator');
    currentPlayerIcon.classList.remove('piskorky__button--player--circle');
    currentPlayerIcon.classList.remove('piskorky__button--player--cross');
    currentPlayerIcon.classList.remove('piskorky__button--player');
    if (currentPlayer === 'circle') {
      currentPlayer = 'cross';
      currentPlayerIcon.classList.add('piskorky__button--player--cross');
    } else {
      currentPlayer = 'circle';
      currentPlayerIcon.classList.add('piskorky__button--player--circle');
    }
  });
});

const restartButtonElement = document.querySelector('#restart-button');
restartButtonElement.addEventListener('click', (event) => {
  const confirmValue = confirm('Opravdu chces zacit znovu?');
  if (confirmValue === false) {
    event.preventDefault();
  }
});

/* 
1. funkce, ktera vytvori pole pro importovanou funkci findWinner

*/
