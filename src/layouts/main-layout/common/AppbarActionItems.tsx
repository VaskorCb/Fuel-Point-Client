import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';

interface AppbarActionItemsProps {
  type?: 'default' | 'slim';
  sx?: SxProps;
  searchComponent?: ReactElement;
}

const AppbarActionItems = ({ type = 'default', sx, searchComponent }: AppbarActionItemsProps) => {
  return (
    <Stack
      className="action-items"
      direction="row"
      spacing={{ xs: 0.5, sm: 1 }}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        flexShrink: 0,
        minWidth: 0,
        ...sx,
      }}
    >
      {searchComponent}
      <Box
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          pr: { xs: 1, sm: 1.5 },
          mr: { xs: 0.5, sm: 1 },
        }}
      >
        <LanguageMenu type={type} />
      </Box>
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
