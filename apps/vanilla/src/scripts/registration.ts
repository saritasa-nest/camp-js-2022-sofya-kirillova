export function checkFields() {

  const formElem = document.querySelector('.registration-form')!;
  if (!(formElem instanceof HTMLFormElement)) {
    throw new Error('not');
  }
  const formData = new FormData(formElem);
  for (let input of formData.entries()) {
    if (input[1] instanceof File){
      console.log(input[1])
    } else if (input[1] === null){
      console.log(7687)
    }
  }
}
