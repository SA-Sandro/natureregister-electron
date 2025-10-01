const getFolderNameFromPath = (folderPath: string): string => {
  if (!folderPath) {
    return;
  }
  return (folderPath = folderPath.split(/[/\\]/).pop());
};

export default getFolderNameFromPath;
