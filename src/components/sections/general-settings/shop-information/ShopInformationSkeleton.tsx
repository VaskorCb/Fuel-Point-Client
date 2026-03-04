import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

const ShopInformationSkeleton = () => {
  const TextFieldSkeleton = () => (
    <Box>
      <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
      <Skeleton variant="rounded" height={42} />
    </Box>
  );

  return (
    <Box sx={{ mx: 3 }}>
      <Box sx={{ maxWidth: 584, mx: 'auto', py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 5 }}>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 5 }}>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Grid container spacing={3}>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
          <Grid size={12}>
            <TextFieldSkeleton />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopInformationSkeleton;
