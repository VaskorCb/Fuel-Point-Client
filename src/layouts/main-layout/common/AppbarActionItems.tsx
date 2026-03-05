import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggler from './ThemeToggler';
import Chat from './Chat';

const NotificationMenu = dynamic(() => import('./NotificationMenu'), { ssr: false });

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
      <LanguageMenu type={type} />
      <ThemeToggler type={type} />
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <Chat />
      </Box>
      <NotificationMenu type={type} />
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
