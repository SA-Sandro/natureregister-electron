import { LocalStorageService } from '@/services/LocalStorageService';
import { useFolderStore } from '@/stores/folderStore';

const getFolderNameFromPath = (): void => {
  const folderPath = new LocalStorageService().getItem('selectedFolderPath');
  if (!folderPath) {
    return; //evita error si no se selecciona carpeta
  }
  const folderName = folderPath.split(/[/\\]/).pop();
  const folderStore = useFolderStore();
  folderStore.setFolderName(folderName);
};

export default getFolderNameFromPath;
