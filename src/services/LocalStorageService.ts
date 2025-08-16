import type StorageService from '@/interfaces/StorageService';

export class LocalStorageService implements StorageService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
