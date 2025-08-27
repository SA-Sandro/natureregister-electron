export function toFileSrc(absPath: string): string {
  let path = absPath.replace(/\\/g, '/');
  if (!path.startsWith('file:///')) path = 'file:///' + path;
  return path;
}
