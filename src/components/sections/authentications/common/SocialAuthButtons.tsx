'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconifyIcon from 'components/base/IconifyIcon';

interface SocialAuthButtonsProps {
  action?: 'sign in' | 'sign up';
}

const SocialAuthButtons = ({ action = 'sign in' }: SocialAuthButtonsProps) => {
  const label = action === 'sign in' ? 'Sign in' : 'Sign up';

  const handleSocialAuth = (provider: string) => {
    // TODO: Implement social auth with backend OAuth flow
    console.log(`Social auth with ${provider} not yet implemented`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <Button
        fullWidth
        variant="contained"
        color="neutral"
        size="medium"
        onClick={() => handleSocialAuth('google')}
        startIcon={
          <IconifyIcon icon="flat-color-icons:google" sx={{ fontSize: '16px !important' }} />
        }
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        {label} with google
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="neutral"
        size="medium"
        onClick={() => handleSocialAuth('microsoft')}
        startIcon={<IconifyIcon icon="logos:microsoft-icon" sx={{ fontSize: '14px !important' }} />}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        {label} with microsoft
      </Button>
    </Box>
  );
};

export default SocialAuthButtons;
