const getFolderNameFromPath = (folderPath: string): string | undefined => {
  if (!folderPath) {
    return;
  }
  return (folderPath = folderPath.split(/[/\\]/).pop());
};

export default getFolderNameFromPath;
