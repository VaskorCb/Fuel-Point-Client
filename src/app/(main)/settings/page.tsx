'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const settingsItems = [
    {
      titleKey: 'fuel_prices',
      descKey: 'fuel_prices_desc',
      icon: <LocalGasStationIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/settings/fuel-prices',
    },
    {
      titleKey: 'general_settings',
      descKey: 'general_settings_desc',
      icon: <SettingsIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
      path: '/general-settings',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('settings')}
      </Typography>

      <Grid container spacing={3}>
        {settingsItems.map((item) => (
          <Grid key={item.titleKey} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea
                onClick={() => router.push(item.path)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 0 }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {item.icon}
                    <Typography variant="h6">{t(item.titleKey)}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {t(item.descKey)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SettingsPage;
