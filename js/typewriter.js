const firstName = document.querySelector('.typed-name');
const surname = document.querySelector('.typed-surname');
const firstCursor = document.querySelector('.name-first .typing-cursor');
const surnameCursor = document.querySelector('.name-last .typing-cursor');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (firstName && surname && firstCursor && surnameCursor) {
  const firstNameLetters = Array.from('Henrique');
  const surnameLetters = Array.from('Sousa');
  const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

  const showCursor = (onSurname) => {
    firstCursor.hidden = onSurname;
    surnameCursor.hidden = !onSurname;
  };

  if (prefersReducedMotion.matches) {
    firstName.textContent = firstNameLetters.join('');
    surname.textContent = surnameLetters.join('');
    firstCursor.hidden = true;
    surnameCursor.hidden = true;
  } else {
    firstCursor.hidden = false;
    surnameCursor.hidden = true;

    const typeName = async () => {
      while (true) {
        for (let index = 1; index <= firstNameLetters.length; index += 1) {
          firstName.textContent = firstNameLetters.slice(0, index).join('');
          await delay(130);
        }

        showCursor(true);
        await delay(250);

        for (let index = 1; index <= surnameLetters.length; index += 1) {
          surname.textContent = surnameLetters.slice(0, index).join('');
          await delay(130);
        }

        await delay(10000);

        for (let index = surnameLetters.length - 1; index >= 0; index -= 1) {
          surname.textContent = surnameLetters.slice(0, index).join('');
          await delay(75);
        }

        showCursor(false);

        for (let index = firstNameLetters.length - 1; index >= 0; index -= 1) {
          firstName.textContent = firstNameLetters.slice(0, index).join('');
          await delay(75);
        }

        await delay(1200);
      }
    };

    typeName();
  }
}
