
export const getUuidFromUrl = (url: string): string => {
  const parts = url.split(/[/\\]/);
  const filename = parts.pop() || '';
  return filename.toLowerCase().replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
};
