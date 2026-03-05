'use client';

import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
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
        color="neutral"
        size={type === 'slim' ? 'small' : 'large'}
        variant="outlined"
        onClick={handleClick}
        sx={(theme) => ({
          px: { xs: 1, sm: type === 'slim' ? 1 : 1.5 },
          gap: { xs: 0, sm: 1 },
          minWidth: 'auto',
          minHeight: { xs: 36, sm: 'auto' },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'divider',
          },
        })}
      >
        <IconifyIcon
          icon={selectedLanguage.icon}
          sx={{ fontSize: { xs: 20, sm: type === 'slim' ? 20 : 24 } }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.primary',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {selectedLanguage.label}
        </Typography>
        <IconifyIcon
          icon="eva:chevron-down-fill"
          sx={{
            fontSize: { xs: 16, sm: type === 'slim' ? 16 : 24 },
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
