console.log('cauky');
let currentPlayer = 'circle';

const gridButtons = document.querySelectorAll('.piskvorky__button-grid');

gridButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (currentPlayer === 'circle') {
      event.target.classList.add('piskvorky__button-grid--circle');
    } else {
      event.target.classList.add('piskvorky__button-grid--cross');
    }
    event.target.disabled = true;
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

/* 
button id="playerIndicator"
S každým kliknutím změň hodnotu proměnné currentPlayer na opačnou. Z circle na cross a naopak.

Podle hotnoty proměnné na stránce uprav znázornění, kdo právě hraje.


event.target.classList.add('piskvorky__button-grid--circle');
  });
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    const currentPlayerIcon = document.querySelector('#playerIndicator');
    currentPlayerIcon.classList.add('piskorky__button--player--cross')
  } else {
    currentPlayer = 'circle';
    const currentPlayerIcon = document.querySelector('#playerIndicator');
    currentPlayerIcon.classList.add('piskorky__button--player--circle')
*/
