'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

interface DeviceToggleRowProps {
  id?: string;
  label: string;
  linkText?: string;
  onLinkClick?: () => void;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  showBorder?: boolean;
}

const DeviceToggleRow = ({
  id,
  label,
  linkText,
  onLinkClick,
  checked = false,
  disabled = false,
  onChange,
  showBorder = true
}: DeviceToggleRowProps) => {
  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        py: 2.5,
        borderBottom: showBorder ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: disabled ? 'text.disabled' : 'text.primary' }}>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" gap={2}>
        {linkText && (
          <Button
            variant='text'
            size='small'
            onClick={onLinkClick}
            sx={{
              color: 'primary.main',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': {
                color: 'primary.dark',
              }
            }}
          >
            {linkText}
            <ArrowOutward sx={{ fontSize: 14 }} />
          </Button>
        )}
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          size="medium"
        />
      </Stack>
    </Box>
  );
};

export default DeviceToggleRow;
