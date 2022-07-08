import { register } from "../requests/registration";

export function checkFields() {

  const formElement = document.querySelector('.registration__form');
  if (!(formElement instanceof HTMLFormElement)) {
    throw new Error('not');
  }
  const formData = new FormData(formElement);
  for (let input of formData.entries()) {
    if (input[1] === '') {
      displayTheError()
      return
    }
  }
  request(formData)
}

function displayTheError() {
  const h5Element = document.querySelector('.registration__error')!;
  h5Element.classList.remove('di')
}

function request(formData: FormData){
  const avatar = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/user_avatars' +
  '%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg'
  const registrationConfig = {
    email: String(formData.get('email')),
    first_name: String(formData.get('first-name')),
    last_name: String(formData.get('last-name')),
    password: String(formData.get('password')),
    avatar,
  }
  // console.log(registrationConfig)
  register(registrationConfig)
}