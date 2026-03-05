'use client';

import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { languages, SupportedLanguage } from 'locales/languages';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_LOCALE } from 'reducers/SettingsReducer';
import IconifyIcon from 'components/base/IconifyIcon';

interface LanguageMenuProps {
  type?: 'default' | 'slim';
}

const LanguageMenu = ({ type = 'default' }: LanguageMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    config: { locale },
    configDispatch,
  } = useSettingsContext();
  const open = Boolean(anchorEl);

  const selectedLanguage = useMemo(() => {
    return languages.find((lang) => lang.locale === locale) || languages[0];
  }, [locale]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (language: SupportedLanguage) => {
    configDispatch({
      type: SET_LOCALE,
      payload: language.locale,
    });
  };

  return (
    <>
      <Button
        color="inherit"
        size="large"
        variant="outlined"
        onClick={handleClick}
        sx={(theme) => ({
          display: { xs: 'none', md: 'flex' },
          px: type === 'slim' ? 1 : 1.5,
          gap: 1,
          minWidth: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'action.hover',
          borderRadius: 1,
          '&:hover': {
            borderColor: 'divider',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'action.hover',
          },
        })}
      >
        <IconifyIcon icon={selectedLanguage.icon} sx={{ fontSize: type === 'slim' ? 20 : 24, color: 'text.primary' }} />
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {selectedLanguage.label}
        </Typography>
        <IconifyIcon
          icon="eva:chevron-down-fill"
          sx={{
            fontSize: type === 'slim' ? 16 : 24,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'text.primary',
          }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.shortLabel}
            onClick={() => {
              handleItemClick(language);
            }}
            selected={locale === language.locale}
            sx={{ minWidth: 200 }}
          >
            <ListItemIcon>
              <IconifyIcon icon={language.icon} sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary={language.label}
              slotProps={{
                primary: { sx: { fontSize: 14 } },
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontWeight: 'normal',
              }}
            >
              {language.currencySymbol}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
