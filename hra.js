import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

// vytvoreni pole pro importovanou funkci findWinner
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

// funkce pro zmenu hrace
const switchCurrentPlayer = () => {
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
};

// funkce pro pridani AI tahu misto krizku:

const makeAiMove = async () => {
  const gameStatus = getGameStatus(); 
  const gridButtons = document.querySelectorAll('.piskvorky__button-grid');
  // disable vsechny tlacitka, aby nikdo nemohl kliknout, kdyz se ceka na API response
  gridButtons.forEach((button) => {
    button.disabled = true;
  });
  // volani API se tahem od AI
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameStatus,
        player: 'x',
      }),
    },
  );
  // zpracovani odpovedi od AI: 
  const data = await response.json();
  const x = data.position.x;
  const y = data.position.y;
  const index = x + y * 10;
  // kliknuti na tlacitko poslane od AI:
  const buttons = document.querySelectorAll('.piskvorky__button-grid');
  buttons[index].disabled = false; 
  buttons[index].click();
  
  gridButtons.forEach((button) => {
    if (
      !button.classList.contains('piskvorky__button-grid--circle') &&
      !button.classList.contains('piskvorky__button-grid--cross')
    ) {
      button.disabled = false;
    }
  });

};

// hra - co se stane pri kliknuti
const gridButtons = document.querySelectorAll('.piskvorky__button-grid');
gridButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (currentPlayer === 'circle') {
      event.target.classList.add('piskvorky__button-grid--circle');
    } else {
      event.target.classList.add('piskvorky__button-grid--cross');
    }
    event.target.disabled = true;

    // cast funkce pro kontrolu viteze hry
    const gameStatus = getGameStatus();
    const winner = findWinner(gameStatus);

    let gameEnded = false;

    if (winner === 'o' || winner === 'x') {
      const winnerSymbol = winner === 'o' ? 'kolečko' : 'křížek';
      gameEnded = true;
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${winnerSymbol}`);
        location.reload();
        return;
      }, 400);
    } else if (winner === 'tie') {
      gameEnded = true;
      setTimeout(() => {
        alert('Hra skončila remízou');
        location.reload();
        return;
      }, 400);
    }

    // pokud hra jeste neskoncila, switch players; pokud je na rade x, hraje AI
    if (!gameEnded) {
      switchCurrentPlayer();
      if (currentPlayer === 'cross') {
        makeAiMove();
      }
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
