const getFolderNameFromPath = (folderPath: string | undefined | null): string | undefined => {
  if (!folderPath) {
    return;
  }
  return (folderPath = folderPath.split(/[/\\]/).pop());
};

export default getFolderNameFromPath;
