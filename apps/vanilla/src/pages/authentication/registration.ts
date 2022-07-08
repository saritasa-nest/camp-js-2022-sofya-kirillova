import { checkFields } from "../../scripts/registration";

const button = document.querySelector('.registration-button')!;

button.addEventListener('click', checkFields);
