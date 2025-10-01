import { describe, it, expect } from 'vitest';
import getFolderNameFromPath from '@/utils/getFolderNameFromPath';

describe('Test getFolderNameFromPath', () => {
  it('should return folderName with Unix style path', () => {
    const folderName = getFolderNameFromPath('/user/test/Documents/myFolder');
    expect(folderName).toBe('myFolder');
  });

  it('should return folderName with Windows style path', () => {
    const folderName = getFolderNameFromPath('C:\\Users\\Test\\Downloads\\folderWin');
    expect(folderName).toBe('folderWin');
  });

  it('should return undefined when path is null', () => {
    const folderName = getFolderNameFromPath(null as unknown as string);
    expect(folderName).toBeUndefined();
  });
});
