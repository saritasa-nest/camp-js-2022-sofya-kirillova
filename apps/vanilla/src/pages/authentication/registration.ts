import { checkFields } from "../../scripts/registration";

const button = document.querySelector('.registration__button')!;

button.addEventListener('click', checkFields);
