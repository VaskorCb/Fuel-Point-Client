'use client';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

interface InvoiceToggleRowProps {
  id?: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  showBorder?: boolean;
}

const InvoiceToggleRow = ({ id, label, checked = false, disabled = false, onChange, showBorder = true }: InvoiceToggleRowProps) => {
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
      <Switch
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        size="medium"
      />

    </Box>
  );
};

export default InvoiceToggleRow;
