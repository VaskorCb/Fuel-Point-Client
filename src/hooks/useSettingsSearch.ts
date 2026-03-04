import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  GroupedSearchResults,
  debounce,
  searchSettings,
} from 'utils/settings-search';

const DEBOUNCE_MS = 200;

export interface UseSettingsSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  results: GroupedSearchResults[];
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export function useSettingsSearch(): UseSettingsSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedSearchResults[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((q: string) => {
        const res = searchSettings(q);
        setResults(res);
        setIsOpen(res.length > 0 && q.trim().length > 0);
      }, DEBOUNCE_MS),
    [],
  );

  // Keep a ref so cleanup can cancel pending debounced calls
  const queryRef = useRef(query);
  queryRef.current = query;

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => {
    if (results.length > 0 && query.trim().length > 0) {
      setIsOpen(true);
    }
  }, [results, query]);

  return { query, setQuery, results, isOpen, close, open };
}
