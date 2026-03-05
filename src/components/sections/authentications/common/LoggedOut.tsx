'use client';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { authPaths } from 'routes/paths';
import AuthFormLayout from './AuthOnbardFormLayout';

const LoggedOut = () => {
  return (
    <AuthFormLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
        You have been logged out
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        We are sad to see you go, but you can log back in anytime!
      </Typography>

      <Button
        variant="contained"
        href={authPaths.login}
        color="primary"
        fullWidth
        size="large"
        sx={{
          py: 1.75,
          fontWeight: 700,
          borderRadius: 2,
          textTransform: 'none',
        }}
      >
        Log back in
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        <Link href="#!" fontWeight={600} sx={{ color: 'primary.main' }}>
          Trouble signing in?
        </Link>
      </Typography>
    </AuthFormLayout>
  );
};

export default LoggedOut;
