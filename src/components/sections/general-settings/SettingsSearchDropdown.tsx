'use client';

import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import { useSettingsSearch } from 'hooks/useSettingsSearch';
import { useGlobalShortcut } from 'hooks/useGlobalShortcut';
import { useComboboxNavigation } from 'hooks/useComboboxNavigation';
import { SearchIndexEntry } from 'data/general-settings/settings-search-index';
import { GroupedSearchResults } from 'utils/settings-search';
import {
  dispatchSubTabNavigation,
  scrollToAndHighlight,
} from 'utils/scroll-and-highlight';

// ── Stable IDs ──────────────────────────────────────────────
const LISTBOX_ID = 'settings-search-listbox';
const INPUT_ID = 'settings-search-box';

// Build a flat ordered list of all items across all groups.
// This is the canonical source of truth for keyboard index ↔ entry mapping.
function flattenResults(results: GroupedSearchResults[]): SearchIndexEntry[] {
  return results.flatMap((g) => g.items);
}

// Derive a stable option id from the entry id for aria-activedescendant.
function optionId(entryId: string): string {
  return `settings-option-${entryId}`;
}

interface SettingsSearchDropdownProps {
  onTabChange: (event: SyntheticEvent, newValue: string) => void;
}

const SettingsSearchDropdown = ({ onTabChange }: SettingsSearchDropdownProps) => {
  const { query, setQuery, results, isOpen, close, open } = useSettingsSearch();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Flat ordered list used for index ↔ entry mapping
  const flatItems = useMemo(() => flattenResults(results), [results]);

  // ── Selection handler ─────────────────────────────────────
  const handleSelect = useCallback(
    (entry: SearchIndexEntry) => {
      onTabChange({} as SyntheticEvent, entry.tab);

      if (entry.subTab !== undefined) {
        dispatchSubTabNavigation({
          tab: entry.tab,
          subTab: entry.subTab,
          fieldId: entry.id,
        });
      }

      const delay = entry.subTab !== undefined ? 350 : 100;
      setTimeout(() => scrollToAndHighlight(entry.id), delay);

      close();
      setQuery('');
    },
    [onTabChange, close, setQuery],
  );

  const handleSelectByIndex = useCallback(
    (index: number) => {
      const entry = flatItems[index];
      if (entry) handleSelect(entry);
    },
    [flatItems, handleSelect],
  );

  // ── Keyboard navigation ───────────────────────────────────
  const { activeIndex, setActiveIndex, handleKeyDown, resetActiveIndex } =
    useComboboxNavigation({
      itemCount: flatItems.length,
      isOpen,
      onSelect: handleSelectByIndex,
      onClose: close,
      listboxRef: listboxRef as React.RefObject<HTMLElement | null>,
    });

  // ── Global Cmd+K / Ctrl+K shortcut ───────────────────────
  useGlobalShortcut({
    key: 'k',
    meta: true,
    ctrl: true,
    onTrigger: useCallback(() => {
      inputRef.current?.focus();
      open();
    }, [open]),
  });

  // ── Close on outside click ────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [close]);

  // ── Reset active index when results change ────────────────
  useEffect(() => {
    resetActiveIndex();
  }, [results, resetActiveIndex]);

  // ── Derived ARIA value ────────────────────────────────────
  const activeDescendant =
    activeIndex >= 0 && flatItems[activeIndex]
      ? optionId(flatItems[activeIndex].id)
      : undefined;

  // ── Render ────────────────────────────────────────────────
  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: 1 }}>
      {/* WAI-ARIA combobox input */}
      <StyledTextField
        id={INPUT_ID}
        inputRef={inputRef}
        type="search"
        placeholder="Find a setting"
        fullWidth
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={open}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        slotProps={{
          input: {
            role: 'combobox',
            'aria-expanded': isOpen,
            'aria-controls': LISTBOX_ID,
            'aria-autocomplete': 'list',
            'aria-activedescendant': activeDescendant,
            'aria-label': 'Search settings',
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="material-symbols:search-rounded" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ fontSize: 12, color: 'text.secondary', pointerEvents: 'none' }}>
                <Box
                  component="kbd"
                  sx={{
                    px: 0.8,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                    fontSize: 12,
                    fontFamily: "monospace",
                    bgcolor: "background.paper",
                  }}
                >
                  {navigator.platform.toUpperCase().includes('MAC') ? '⌘ K' : 'Ctrl K'}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        sx={{ maxWidth: { xs: 1, sm: 0.5, md: 1 } }}
      />

      {/* WAI-ARIA listbox dropdown */}
      {isOpen && results.length > 0 && (
        <Paper
          elevation={7}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 380,
            overflowY: 'auto',
            zIndex: 1300,
            borderRadius: 2,
          }}
        >
          <List
            ref={listboxRef}
            id={LISTBOX_ID}
            role="listbox"
            aria-label="Settings search results"
            dense
            disablePadding
            component="ul"
          >
            {results.map((group) => (
              <Box key={group.section} component="li" role="presentation">
                {/* Group header — not an option, role="presentation" */}
                <ListSubheader
                  disableSticky
                  component="div"
                  sx={{
                    bgcolor: 'primary.lighter',
                    lineHeight: '32px',
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'text.primary',
                  }}
                >
                  {group.section}
                </ListSubheader>

                {/* Options */}
                {group.items.map((item) => {
                  const globalIndex = flatItems.indexOf(item);
                  const isActive = globalIndex === activeIndex;

                  return (
                    <Box
                      key={item.id}
                      id={optionId(item.id)}
                      role="option"
                      aria-selected={isActive}
                      data-index={globalIndex}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      className={isActive ? 'settings-search-option--active' : undefined}
                      component="li"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 1,
                        px: 3,
                        cursor: 'pointer',
                        listStyle: 'none',
                        bgcolor: isActive ? 'action.selected' : 'transparent',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        transition: 'background-color 0.1s ease',
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {highlightMatch(item.label, query)}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

// ── Highlight matching text in result labels ────────────────
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  // Reset lastIndex after split (regex with 'g' flag retains state)
  regex.lastIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        regex.lastIndex = 0;
        return regex.test(part) ? (
          <Box key={i} component="mark" sx={{ fontWeight: 700, color: 'primary.main', bgcolor: 'transparent' }}>
            {part}
          </Box>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export default SettingsSearchDropdown;
