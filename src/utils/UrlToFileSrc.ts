export function toFileSrc(absPath: string): string {
  let path = absPath.replace(/\\/g, '/');
  if (!path.startsWith('file:///')) {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    path = 'file:///' + path;
  }
  return path;
}
