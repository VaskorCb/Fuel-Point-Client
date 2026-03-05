import { ReactElement } from 'react';
// import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';
// import ThemeToggler from './ThemeToggler';

// const NotificationMenu = dynamic(() => import('./NotificationMenu'), { ssr: false });

interface AppbarActionItemsProps {
  type?: 'default' | 'slim';
  sx?: SxProps;
  searchComponent?: ReactElement;
}

const AppbarActionItems = ({ type = 'default', sx, searchComponent }: AppbarActionItemsProps) => {
  return (
    <Stack
      className="action-items"
      spacing={1}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      {searchComponent}
      <LanguageMenu type={type} />
      {/* <ThemeToggler type={type} /> */}
      {/* <NotificationMenu type={type} /> */}
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
