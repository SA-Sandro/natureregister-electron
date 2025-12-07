export const getCoordinates = (coordinatesString: string): [number, number] | null => {
  if (!coordinatesString) return null;
  const coords = coordinatesString.split(',').map((c) => parseFloat(c.trim()));
  if (coords.length < 2 || coords.some(isNaN)) return null;

  return [coords[0], coords[1]];
};
