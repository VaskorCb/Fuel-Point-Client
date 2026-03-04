import {
  SearchIndexEntry,
  settingsSearchIndex,
} from 'data/general-settings/settings-search-index';

// ── Grouped result type ─────────────────────────────────────
export interface GroupedSearchResults {
  section: string;
  items: SearchIndexEntry[];
}

// ── Core search function ────────────────────────────────────
export function searchSettings(query: string): GroupedSearchResults[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const tokens = trimmed.split(/\s+/);

  const matched = settingsSearchIndex.filter((entry) => {
    const haystack = [
      entry.label,
      entry.section,
      ...entry.keywords,
    ]
      .join(' ')
      .toLowerCase();

    return tokens.every((token) => haystack.includes(token));
  });

  // Group by section, preserving index order
  const map = new Map<string, SearchIndexEntry[]>();
  for (const item of matched) {
    const existing = map.get(item.section);
    if (existing) {
      existing.push(item);
    } else {
      map.set(item.section, [item]);
    }
  }

  const groups: GroupedSearchResults[] = [];
  map.forEach((items, section) => {
    groups.push({ section, items });
  });

  return groups;
}

// ── Debounce utility ────────────────────────────────────────
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delayMs);
  };
}
