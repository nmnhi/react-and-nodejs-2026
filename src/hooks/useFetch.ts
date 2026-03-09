import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// <T> means: the caller decides what type the data will be.
// useFetch<User[]>(...) → data is User[] | null
// useFetch<Post>(...) → data is Post | null
// TypeScript infers this — you don't manually write if/else for types.
export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  // useCallback so fetchData has a stable reference.
  // If we didn't do this, the useEffect below would re-run on every render
  // because fetchData would be a new function every time.
  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: T = await res.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: (err as Error).message });
    }
  }, [url]); // re-create only when url changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is stable, so this runs once on mount

  // Return state fields AND refetch so caller can trigger a reload
  return { ...state, refetch: fetchData };
}
