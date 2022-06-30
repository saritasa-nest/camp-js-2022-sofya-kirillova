export const formatDate = ((date_received: string) => {
    var date = new Date(date_received);
    var options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleString('ru', options);
  })
  