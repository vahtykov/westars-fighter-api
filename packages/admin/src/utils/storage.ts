import config from '../config';

type StorageKey = keyof typeof config.storage;

class StorageService {
  private storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  getItem(key: StorageKey): string | null {
    try {
      return this.storage.getItem(config.storage[key]);
    } catch (error) {
      console.error(`Error getting item ${key} from storage:`, error);
      return null;
    }
  }

  setItem(key: StorageKey, value: string): void {
    try {
      this.storage.setItem(config.storage[key], value);
    } catch (error) {
      console.error(`Error setting item ${key} in storage:`, error);
    }
  }

  removeItem(key: StorageKey): void {
    try {
      this.storage.removeItem(config.storage[key]);
    } catch (error) {
      console.error(`Error removing item ${key} from storage:`, error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storage = new StorageService();
