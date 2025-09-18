import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFolderStore } from '@/stores/folderStore';
import getFolderNameFromPath from '@/utils/getFolderNameFromPath';
import { LocalStorageService } from '@/services/LocalStorageService';

describe('Test getFolderNameFromPath', () => {
  it('should update folderName with Unix style path', () => {
    setActivePinia(createPinia());

    LocalStorageService.prototype.getItem = () => '/user/test/Documents/myFolder';

    getFolderNameFromPath();

    const folderStore = useFolderStore();
    expect(folderStore.folderName).toBe('myFolder');
  });

  it('should update folderName with Windows style path', () => {
    setActivePinia(createPinia());

    LocalStorageService.prototype.getItem = () => 'C:\\Users\\Test\\Downloads\\folderWin';

    getFolderNameFromPath();

    const folderStore = useFolderStore();
    expect(folderStore.folderName).toBe('folderWin');
  });

  it('should not modify folderName when LocalStorage is empty', () => {
    setActivePinia(createPinia());

    LocalStorageService.prototype.getItem = () => null;

    getFolderNameFromPath();

    const folderStore = useFolderStore();
    expect(folderStore.folderName).toBe('');
  });
});
