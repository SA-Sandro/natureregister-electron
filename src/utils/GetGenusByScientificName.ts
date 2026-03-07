export const getGenusByScientificName = (scientificName: string) => {
  if (scientificName.trim().toLowerCase() === 'sin determinar') return 'Sin determinar';
  return scientificName.trim().split(' ')[0];
};
