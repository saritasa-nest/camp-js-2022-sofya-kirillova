
export function checkFields() {

  
  const formElem = document.querySelector('.registration-form')!
  console.log(formElem)
  if (!(formElem instanceof HTMLFormElement)) {
    throw new Error('not')
  }
  const formData = new FormData(formElem)

  formData.append('key', 'value');

  for (let entry of formData.entries()) {
    console.log(entry, 5454);
  }
}
