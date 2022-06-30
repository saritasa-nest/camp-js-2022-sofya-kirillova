/**
 * 
 * @param {string | null} date_received date
 * @returns {string} date in the format dd.mm.yyyy or 'no date'
 */
export const formatDate = ((date_received: string | null): string => {
  if (date_received === null){
    return 'no date'
  }
    var date = new Date(date_received);
    var options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleString('ru', options);
  })
  