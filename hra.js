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

const restartButtonElement = document.querySelector('#restart-button');
restartButtonElement.addEventListener('click', (event) => {
  const confirmValue = confirm('Opravdu chces zacit znovu?')
  if (confirmValue === false) {
    event.preventDefault();
  }
});

/* 
Může se stát, že uživatel se omylem uklikne a modrým tlačítkem pro restart přijde o rozehranou hru. Proto přidej modrému odkazu posluchač události, který se po kliknutí uživatele zeptá zabudovanou funcí confirm, jestli chce hru opravdu restartovat. Pokud ne, zavolej event.preventDefault(), čímž zabráníš tomu, aby prohlížeč přešel na odkazovanou stránku (tj. načetl stránku s prázdnou hrou). Funkce confirm vrací true nebo false podle toho, zda uživatel souhlasil nebo nesouhlasil s potvrzovací zprávou v dialogu.

*/
