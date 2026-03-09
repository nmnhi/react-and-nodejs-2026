import { useEffect, useState } from "react";

// Exactly like useState, but the value persists across page refreshes.
// The value is serialised to JSON and stored in localStorage under `key`.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Lazy initialiser — runs once on mount, not on every render
    try {
      const stored = localStorage.getItem(key);
      // If something is stored, parse it. Otherwise use initialValue.
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      // localStorage can fail (private browsing, storage full, etc.)
      return initialValue;
    }
  });

  // Whenever value changes, sync it to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  // `as const` makes TypeScript treat this as a tuple [T, setter, remover]
  // instead of an array of mixed types
  return [value, setValue, remove] as const;
}
