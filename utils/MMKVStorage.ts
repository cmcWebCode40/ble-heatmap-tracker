import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV(); 

class MMKVStorage {
  setItem<T = any>(key: string, value: T): void {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    storage.set(key, toStore);
  }

  getItem<T = any>(key: string): T | null {
    const rawValue = storage.getString(key);
    if (rawValue === undefined || rawValue === null) return null;

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return rawValue as T;
    }
  }

  getItemById<T = any>(id: string): T | null {
    return this.getItem<T>(id);
  }

  deleteItemById(key: string): void {
    storage.delete(key);
  }

  clearAll(): void {
    storage.clearAll();
  }

  getAllKeys(): string[] {
    return storage.getAllKeys();
  }
}

export const mmkvStorage = new MMKVStorage();

export const GAME_CHARACTER = 'GAME_CHARACTER'