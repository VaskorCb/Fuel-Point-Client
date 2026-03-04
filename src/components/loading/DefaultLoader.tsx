import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const DefaultLoader = () => {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
        width: 1,
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default DefaultLoader;
