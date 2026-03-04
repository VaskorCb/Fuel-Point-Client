// ── Custom event for inner sub-tab navigation ──────────────
export const SETTINGS_SEARCH_NAVIGATE = 'settings-search-navigate';

export interface SettingsSearchNavigateDetail {
  tab: string;
  subTab?: number;
  fieldId: string;
}

export function dispatchSubTabNavigation(detail: SettingsSearchNavigateDetail): void {
  window.dispatchEvent(
    new CustomEvent<SettingsSearchNavigateDetail>(SETTINGS_SEARCH_NAVIGATE, { detail }),
  );
}

// ── Highlight CSS class name ────────────────────────────────
const HIGHLIGHT_CLASS = 'settings-search-highlight';

// ── Scroll to element, focus it, and apply a temporary highlight ─
export function scrollToAndHighlight(elementId: string): void {
  // Allow a short delay for tab switch / render to complete
  requestAnimationFrame(() => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (!el) return;

      // Scroll smoothly into view
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Try to focus the element (works for inputs, selects, textareas)
      const focusable =
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT'
          ? el
          : el.querySelector<HTMLElement>('input, textarea, select, [tabindex]');

      if (focusable) {
        focusable.focus({ preventScroll: true });
      }

      // Find the closest wrapper to highlight (for MUI components the
      // actual visual container is usually the parent fieldset or box)
      const highlightTarget = el.closest('.MuiFormControl-root') ?? el.parentElement ?? el;

      highlightTarget.classList.add(HIGHLIGHT_CLASS);

      // Remove highlight after animation completes
      const onEnd = () => {
        highlightTarget.classList.remove(HIGHLIGHT_CLASS);
        highlightTarget.removeEventListener('animationend', onEnd);
      };
      highlightTarget.addEventListener('animationend', onEnd);

      // Safety fallback – remove class after 2.5 s regardless
      setTimeout(() => {
        highlightTarget.classList.remove(HIGHLIGHT_CLASS);
      }, 2500);
    }, 150);
  });
}
