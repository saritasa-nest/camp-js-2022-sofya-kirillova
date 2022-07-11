import { login } from "../../requests/authorization";

const button = document.querySelector('.authorization__button')!;

const formElement = document.querySelector('.authorization__form');

button.addEventListener('click', request);

function request() {
  if (!(formElement instanceof HTMLFormElement)) {
    throw new Error('not');
  }

  const formData = new FormData(formElement);
  for (let input of formData.entries()) {
    if (input[1] === '') {
      displayTheError('Please fill in all fields')
      return
    }
  }
  const authorizationConfig = {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }
  login(authorizationConfig)
}

export function displayTheError(message: string) {
  const h5Element = document.querySelector('.authorization__error')!;
  h5Element.innerHTML = message
  h5Element.classList.remove('di')
}