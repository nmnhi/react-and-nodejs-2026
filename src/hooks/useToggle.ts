import { useCallback, useState } from "react";

// Returns [value, toggle, setTrue, setFalse]
// Used for: modals, dropdowns, accordions, sidebars — anything with open/closed state
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  // useCallback because these are often passed as props to child components
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse] as const;
}
