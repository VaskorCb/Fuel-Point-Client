import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack, { StackOwnProps } from '@mui/material/Stack';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import splash from 'assets/json/splash-loader.json';

const Splash = (props: StackOwnProps) => {
  return (
    <Stack
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box
        sx={{
          height: 50,
          width: 50,
        }}
      >
        <Lottie animationData={splash} />
      </Box>
    </Stack>
  );
};

export default Splash;
