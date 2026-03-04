import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { defaultJwtAuthCredentials } from 'config';
import IconifyIcon from 'components/base/IconifyIcon';

const DefaultCredentialAlert = () => {
  return (
    <Alert
      severity="info"
      sx={{ mb: 4 }}
      icon={<IconifyIcon icon="material-symbols:info-outline-rounded" />}
    >
      <Typography variant="body2">
        Use Email :{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {defaultJwtAuthCredentials.email}
        </Box>
      </Typography>
      <Typography variant="body2">
        Password :{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {defaultJwtAuthCredentials.password}
        </Box>
      </Typography>
    </Alert>
  );
};

export default DefaultCredentialAlert;
