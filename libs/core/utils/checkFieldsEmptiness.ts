/**
 * Check the form for empty fields.
 * @param formData Form Data.
 */
export function checkFieldsEmptiness(formData: FormData): boolean {
  for (const formValue of formData.values()) {
    if (formValue === '') {
      return false;
    }
  }
  return true;
}
