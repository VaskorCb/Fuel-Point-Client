'use client';

import Box from '@mui/material/Box';
import StyledTextField from 'components/styled/StyledTextField';

interface InvoiceMemoSectionProps {
  id?: string;
  title: string;
  value: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
  rows?: number;
}

const InvoiceMemoSection = ({ id, title, value, onChange, multiline = true, rows = 3 }: InvoiceMemoSectionProps) => {
  return (
    <Box id={id} sx={{ width: '100%', }}>
      <StyledTextField
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        label={title}
        rows={rows}
        fullWidth
        placeholder={`Enter ${title.toLowerCase()}`}
        aria-label={title}
      />
    </Box>
  );
};

export default InvoiceMemoSection;
