export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateForStorage = (date: string): string => {
  return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
};

export const formatDateForObservedAtInput = (date: string): string => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default formatDate;
