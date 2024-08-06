export type StorageVaultSource = 'localStorage' | 'sessionStorage' | 'memoryStorage';


export function storageVault(source: StorageVaultSource): Storage {
  if (source === 'memoryStorage') {
    return new MemoryStorage();
  }
  else if (source in window) {
    return window[source];
  }
  //else
  console.warn(`could not find window.${source} - using memoryStorage for your vault, instead`);
  return new MemoryStorage();
}



export class MemoryStorage implements Storage {
  private readonly vault: Record<string, string | null> = {};

  get keys() {
    return Object.keys(this.vault);
  }

  get length() {
    return this.keys.length;
  }

  clear() {
    this.keys.forEach(key => {
      delete this.vault[key];
    });
  }

  getItem(key: string) {
    if (this.keys.includes(key)) {
      return this.vault[key];
    }
    //else
    return null;
  }

  key(index: number) { 
    if (index >= 0 && index < this.keys.length) {
      return this.keys[index];
    }
    //else
    return null;
  }

  removeItem(key: string) {
    if (this.keys.includes(key)) {
      delete this.vault[key];
    }
  }

  setItem(key: string, value: string) {
    this.vault[key] = value;
  }
}