'use client';

import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import DocSearch from 'layouts/main-layout/sidenav/doc-search/DocSearch';
import { useSettingsContext } from 'providers/SettingsProvider';
import sitemap from 'routes/sitemap';
import IconifyIcon from 'components/base/IconifyIcon';
import Logo from 'components/common/Logo';
import { useNavContext } from '../NavProvider';
import NavItem from './NavItem';
import SidenavSimpleBar from './SidenavSimpleBar';
import SlimNavItem from './SlimNavItem';
import { generalSettingsSitemap } from 'routes/sitemap';

interface SidenavDrawerContentProps {
  variant?: 'permanent' | 'temporary';
}

const SidenavDrawerContent = ({ variant = 'permanent' }: SidenavDrawerContentProps) => {
  const { t } = useTranslation();
  const {
    config: { sidenavCollapsed, openNavbarDrawer, navigationMenuType },
    setConfig,
    toggleNavbarCollapse,
  } = useSettingsContext();

  const { sidenavAppbarVariant } = useNavContext();

  const expanded = useMemo(
    () => variant === 'temporary' || (variant === 'permanent' && !sidenavCollapsed),
    [sidenavCollapsed],
  );

  const toggleNavbarDrawer = () => {
    setConfig({
      openNavbarDrawer: !openNavbarDrawer,
    });
  };

  return (
    <>
      <Toolbar variant={sidenavAppbarVariant} sx={{ display: 'block', px: { xs: 0 } }}>
        <Box
          sx={[
            {
              height: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'padding 0.3s ease-in-out',
            },
            !expanded && {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            expanded && {
              pl: { xs: 4, md: 6 },
              pr: { xs: 2, md: 3 },
            },
          ]}
        >
          {(navigationMenuType === 'sidenav' || variant === 'temporary') && (
            <>
              <Logo showName={expanded} />
              <IconButton sx={{ mt: 1, display: { md: 'none' } }} onClick={toggleNavbarDrawer}>
                <IconifyIcon icon="material-symbols:left-panel-close-outline" fontSize={20} />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <SidenavSimpleBar
          sx={[
            !expanded && {
              height: 1,
              '& .simplebar-horizontal': {
                display: 'none',
              },
            },
          ]}
          autoHide={!expanded ? false : undefined}
        >
          <Box
            sx={[
              {
                py: 2,
                transition: 'padding 0.3s ease-in-out',
              },
              !expanded && {
                px: 2,
              },
              expanded && {
                px: { xs: 2, md: 4 },
              },
            ]}
          >
            {expanded
              ? sitemap.map((menu, index) => (
                  <Box key={menu.id}>
                    {menu.subheader === 'Docs' && !sidenavCollapsed && (
                      <>
                        <Divider sx={{ mb: 4 }} />
                        <DocSearch />
                      </>
                    )}
                    <List
                      dense
                      key={menu.id}
                      sx={{
                        mb: index !== sitemap.length - 1 ? 3 : 0,
                        pb: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                      subheader={
                        menu.subheader && (
                          <ListSubheader
                            component="div"
                            disableGutters
                            sx={{
                              textAlign: 'left',
                              color: 'text.disabled',
                              typography: 'overline',
                              fontWeight: 700,
                              py: 1,
                              paddingLeft: 2,
                              mb: 0.25,
                              position: 'static',
                              background: 'transparent',
                            }}
                          >
                            {t(menu.key || menu.subheader)}
                          </ListSubheader>
                        )
                      }
                    >
                      {menu.items.map((item) => (
                        <NavItem key={item.pathName} item={item} level={0} />
                      ))}
                    </List>
                  </Box>
                ))
              : sitemap.map((menu, index) => (
                  <Fragment key={menu.id}>
                    <List
                      component="nav"
                      sx={{
                        py: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      {menu.items.map((item) => (
                        <SlimNavItem key={item.pathName} item={item} level={0} />
                      ))}
                    </List>
                    {index !== sitemap.length - 1 && <Divider sx={[{ my: 1.5 }]} />}
                  </Fragment>
                ))}
          </Box>
        </SidenavSimpleBar>
      </Box>

      <Box 
        sx={{ 
          py: 2,
          px: expanded ? 4 : 2,
          display: 'flex',
          justifyContent: expanded ? 'flex-start' : 'center',
          transition: 'padding 0.3s ease-in-out',
        }}
      >
       {
        expanded ? 
        <NavItem key={generalSettingsSitemap.pathName} item={generalSettingsSitemap} level={0} />
        :
      <SlimNavItem key={generalSettingsSitemap.pathName} item={generalSettingsSitemap} level={0} />
       }
      </Box>
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          p: 2,
          display: { xs: 'none', md: 'flex' },
          justifyContent: expanded ? 'flex-start' : 'center',
          transition: 'justify-content 0.3s ease-in-out',
        }}
      >
        <Tooltip title={sidenavCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} placement="top">
          <Button
            onClick={toggleNavbarCollapse}
            color="neutral"
            variant="text"
            sx={{
              minWidth: expanded ? 'auto' : 40,
              width: expanded ? '100%' : 40,
              justifyContent: expanded ? 'flex-start' : 'center',
              px: sidenavCollapsed ? 0 : 2,
              pl: sidenavCollapsed ? 0 : expanded ? 5 : 2,
              transition: 'all 0.3s ease-in-out',
              '& .MuiButton-startIcon': {
                transition: 'margin 0.3s ease-in-out, opacity 0.3s ease-in-out',
              },
            }}
            startIcon={
              expanded ? (
                <IconifyIcon
                  icon={sidenavCollapsed ? 'material-symbols:keyboard-double-arrow-right' : 'material-symbols:keyboard-double-arrow-left'}
                  sx={{ fontSize: 20, transition: 'transform 0.3s ease-in-out' }}
                />
              ) : undefined
            }
          >
            {!expanded && (
              <IconifyIcon
                icon={sidenavCollapsed ? 'material-symbols:keyboard-double-arrow-right' : 'material-symbols:keyboard-double-arrow-left'}
                sx={{ fontSize: 20, transition: 'transform 0.3s ease-in-out' }}
              />
            )}
            {expanded && (
              <Typography 
                variant="subtitle2" 
                fontWeight={400}
                sx={{
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: expanded ? 1 : 0,
                }}
              >
                {sidenavCollapsed ? 'Expand' : 'Collapse'}
              </Typography>
            )}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SidenavDrawerContent;
