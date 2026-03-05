'use client';

import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAtomValue } from 'jotai';
import DocSearch from 'layouts/main-layout/sidenav/doc-search/DocSearch';
import { useSettingsContext } from 'providers/SettingsProvider';
import paths from 'routes/paths';
import sitemap from 'routes/sitemap';
import { settingsSitemap } from 'routes/sitemap';
import { subscriptionAtom, userRoleAtom } from 'store/auth';
import IconifyIcon from 'components/base/IconifyIcon';
import petrolPumpIcon from '../../../../public/assets/logos/petrol-pump-icon.svg';
import { useNavContext } from '../NavProvider';
import NavItem from './NavItem';
import SidenavSimpleBar from './SidenavSimpleBar';
import SlimNavItem from './SlimNavItem';

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

  const userRole = useAtomValue(userRoleAtom);

  const filteredSitemap = useMemo(
    () =>
      sitemap
        .filter((group) => !group.roles || !userRole || group.roles.includes(userRole))
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => !item.roles || !userRole || item.roles.includes(userRole),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [userRole],
  );

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
              pl: { xs: 2, sm: 4, md: 6 },
              pr: { xs: 1.5, sm: 2, md: 3 },
            },
          ]}
        >
          {(navigationMenuType === 'sidenav' || variant === 'temporary') && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Image src={petrolPumpIcon} alt="Fuel Point" width={32} height={32} />
                {expanded && (
                  <Typography variant="h6" fontWeight={700} letterSpacing="-0.02em">
                    Fuel Point
                  </Typography>
                )}
              </Box>

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
                px: { xs: 1.5, sm: 2, md: 4 },
              },
            ]}
          >
            {expanded
              ? filteredSitemap.map((menu, index) => (
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
                        mb: index !== filteredSitemap.length - 1 ? 3 : 0,
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
              : filteredSitemap.map((menu, index) => (
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
                    {index !== filteredSitemap.length - 1 && <Divider sx={[{ my: 1.5 }]} />}
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
        {expanded ? (
          <NavItem key={settingsSitemap.pathName} item={settingsSitemap} level={0} />
        ) : (
          <SlimNavItem
            key={settingsSitemap.pathName}
            item={settingsSitemap}
            level={0}
          />
        )}
      </Box>

      {/* Subscription Package Widget */}
      <SidebarSubscriptionWidget expanded={expanded} />

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
        <Tooltip title={sidenavCollapsed ? t('expand_sidebar') : t('collapse_sidebar')} placement="top">
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
                  icon={
                    sidenavCollapsed
                      ? 'material-symbols:keyboard-double-arrow-right'
                      : 'material-symbols:keyboard-double-arrow-left'
                  }
                  sx={{ fontSize: 20, transition: 'transform 0.3s ease-in-out' }}
                />
              ) : undefined
            }
          >
            {!expanded && (
              <IconifyIcon
                icon={
                  sidenavCollapsed
                    ? 'material-symbols:keyboard-double-arrow-right'
                    : 'material-symbols:keyboard-double-arrow-left'
                }
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
                {sidenavCollapsed ? t('expand') : t('collapse')}
              </Typography>
            )}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'error'> = {
  TRIAL: 'info',
  ACTIVE: 'success',
  PENDING: 'warning',
  EXPIRED: 'error',
};

const statusLabels: Record<string, string> = {
  TRIAL: 'free_trial',
  ACTIVE: 'active',
  PENDING: 'pending_activation',
  EXPIRED: 'expired',
};

const SidebarSubscriptionWidget = ({ expanded }: { expanded: boolean }) => {
  const { t } = useTranslation();
  const subscription = useAtomValue(subscriptionAtom);
  const role = useAtomValue(userRoleAtom);

  if (!subscription || (role !== 'OWNER' && role !== 'ADMIN')) return null;

  const color = statusColors[subscription.status] ?? 'error';
  const label = statusLabels[subscription.status] ?? 'expired';
  const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
  const daysRemaining = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / 86400000))
    : null;
  const isActive = subscription.status === 'TRIAL' || subscription.status === 'ACTIVE';

  if (!expanded) {
    return (
      <Box sx={{ px: 2, pb: 1, display: 'flex', justifyContent: 'center' }}>
        <Tooltip title={t(label)} placement="right">
          <IconButton
            component={Link}
            href={paths.manage_subscription}
            size="small"
            sx={{ color: `${color}.main` }}
          >
            <IconifyIcon icon="material-symbols:card-membership-outline" sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Button
      component={Link}
      href={paths.manage_subscription}
      variant="text"
      color="neutral"
      fullWidth
      sx={{
        mx: 'auto',
        mb: 0.5,
        px: 3,
        py: 0.75,
        justifyContent: 'space-between',
        textTransform: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconifyIcon icon="material-symbols:card-membership-outline" sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="caption" fontWeight={600} color="text.primary">
          {t(label)}
        </Typography>
      </Box>
      {isActive && daysRemaining !== null && (
        <Chip
          label={daysRemaining === 0 ? t('expires_today') : `${daysRemaining}d`}
          size="small"
          color={daysRemaining <= 3 ? 'error' : daysRemaining <= 7 ? 'warning' : color}
          sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700 }}
        />
      )}
    </Button>
  );
};

export default SidenavDrawerContent;
