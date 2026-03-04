'use client';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { ThemePreset } from 'config';
import { THEME_DISPLAY_NAMES } from 'theme/palettes';
import { ThemeRadio, themeListRowSx } from './ThemeRadio';

interface ThemeListItemProps {
  preset: ThemePreset;
  palette: any;
  isSelected: boolean;
  onSelect: (preset: ThemePreset) => void;
  variant?: 'default' | 'menu';
  isNested?: boolean;
}

const ThemeListItem = ({
  preset,
  palette,
  isSelected,
  onSelect,
  variant = 'default',
  isNested = false,
}: ThemeListItemProps) => {
  const colors = [palette.primary?.main, palette.background?.menu];

  return (
    <ListItem disablePadding>
      <ListItemButton
        dense
        selected={isSelected}
        onClick={() => onSelect(preset)}
        sx={themeListRowSx(variant, isNested)}
      >
        <ListItemIcon>
          <ThemeRadio checked={isSelected} />
        </ListItemIcon>

        <ListItemText primary={THEME_DISPLAY_NAMES[preset] || preset} />

        <Stack direction="row" gap={0.5}>
          {colors.map((bg, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: 0.5,
                border: 1,
                borderColor: 'divider',
                bgcolor: bg,
              }}
            />
          ))}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default ThemeListItem;
