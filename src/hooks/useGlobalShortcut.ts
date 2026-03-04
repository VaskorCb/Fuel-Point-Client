import { useEffect, useCallback } from 'react';

interface UseGlobalShortcutOptions {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  onTrigger: () => void;
}

// ── useGlobalShortcut ─────────────────────────────────────────────────────────
// Attaches a global keydown listener for a keyboard shortcut.
// Cleans up automatically on unmount. Safe to use in multiple components.
//
// Usage:
//   useGlobalShortcut({ key: 'k', meta: true, ctrl: true, onTrigger: fn });
//   → fires on Cmd+K (Mac) OR Ctrl+K (Win/Linux)
// ─────────────────────────────────────────────────────────────────────────────
export function useGlobalShortcut({
  key,
  meta = false,
  ctrl = false,
  shift = false,
  onTrigger,
}: UseGlobalShortcutOptions): void {
  const stableOnTrigger = useCallback(onTrigger, [onTrigger]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === key.toLowerCase();

      // Support Cmd+K on Mac (metaKey) OR Ctrl+K on Win/Linux (ctrlKey)
      const modifierMatch =
        meta || ctrl
          ? e.metaKey || e.ctrlKey
          : true;

      const shiftMatch = shift ? e.shiftKey : !e.shiftKey;

      if (keyMatch && modifierMatch && shiftMatch) {
        // Don't fire if user is typing in an unrelated input (other than our
        // own search box, which is handled by the component itself)
        const active = document.activeElement;
        const isOurSearchBox = active?.id === 'settings-search-box';
        const isOtherInput =
          !isOurSearchBox &&
          active instanceof HTMLElement &&
          (active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.isContentEditable);

        if (isOtherInput) return;

        e.preventDefault();
        stableOnTrigger();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, meta, ctrl, shift, stableOnTrigger]);
}
