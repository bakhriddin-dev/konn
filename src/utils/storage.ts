export const Storage = {
  get<T = unknown>(key: string): T | null {
    const item = localStorage.getItem(key);
    try {
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error parsing localStorage for key "${key}"`, error);
    }
  },
  set<T = unknown>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    localStorage.clear();
  },
};
