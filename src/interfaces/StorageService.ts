export default interface StorageService {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
}
