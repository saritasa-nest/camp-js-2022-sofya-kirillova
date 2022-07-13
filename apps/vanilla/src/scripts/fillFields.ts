/**
 * Check the form for empty fields.
 * @param formData Form Data.
 */
export function fillFields(formData: FormData): boolean{
  for (const input of formData.entries()) {
    if (input[1] === '') {
      return false
    }
  }
  return true
}