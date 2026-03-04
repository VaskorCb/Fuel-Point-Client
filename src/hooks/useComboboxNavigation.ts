import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseComboboxNavigationOptions {
  itemCount: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  onClose: () => void;
  listboxRef: React.RefObject<HTMLElement | null>;
}

export interface UseComboboxNavigationReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  resetActiveIndex: () => void;
}

// ── useComboboxNavigation ─────────────────────────────────────────────────────
// Manages keyboard navigation state for a WAI-ARIA combobox + listbox pattern.
//
// Responsibilities:
//   - Tracks activeIndex (which option is keyboard-highlighted)
//   - Handles ArrowUp/Down, Home, End, Enter, Escape, Tab
//   - Scrolls the active option into view inside the listbox
//   - Resets index when dropdown closes or item count changes
//   - Does NOT own any DOM refs itself (caller passes listboxRef)
// ─────────────────────────────────────────────────────────────────────────────
export function useComboboxNavigation({
  itemCount,
  isOpen,
  onSelect,
  onClose,
  listboxRef,
}: UseComboboxNavigationOptions): UseComboboxNavigationReturn {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Reset whenever the dropdown closes or results change
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [itemCount]);

  // Scroll the active option into view inside the listbox container
  const scrollActiveIntoView = useCallback(
    (index: number) => {
      if (!listboxRef.current || index < 0) return;
      const option = listboxRef.current.querySelector<HTMLElement>(
        `[role="option"][data-index="${index}"]`,
      );
      option?.scrollIntoView({ block: 'nearest' });
    },
    [listboxRef],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev < itemCount - 1 ? prev + 1 : 0;
            scrollActiveIntoView(next);
            return next;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev > 0 ? prev - 1 : itemCount - 1;
            scrollActiveIntoView(next);
            return next;
          });
          break;
        }
        case 'Home': {
          e.preventDefault();
          setActiveIndex(0);
          scrollActiveIntoView(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          const last = itemCount - 1;
          setActiveIndex(last);
          scrollActiveIntoView(last);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (activeIndex >= 0) {
            onSelect(activeIndex);
          }
          break;
        }
        case 'Tab': {
          // Select highlighted item on Tab (preferred UX), then let Tab proceed
          if (activeIndex >= 0) {
            e.preventDefault();
            onSelect(activeIndex);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setActiveIndex(-1);
          onClose();
          break;
        }
        default:
          break;
      }
    },
    [isOpen, itemCount, activeIndex, onSelect, onClose, scrollActiveIntoView],
  );

  const resetActiveIndex = useCallback(() => setActiveIndex(-1), []);

  return { activeIndex, setActiveIndex, handleKeyDown, resetActiveIndex };
}
