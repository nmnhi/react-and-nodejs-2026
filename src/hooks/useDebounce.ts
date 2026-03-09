import { useEffect, useState } from "react";

// Problem: user types in a search box. Without debounce, you fire an
// API call on EVERY keystroke — potentially 10+ calls per second.
// Solution: wait until the user STOPS typing for `delay` ms, then update.
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update debounced value after `delay` ms
    const timer = setTimeout(() => setDebounced(value), delay);

    // CLEANUP: if value changes before the timer fires, cancel the old timer.
    // This is what makes debounce work — only the LAST timer ever fires.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
