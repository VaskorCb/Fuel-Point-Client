import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={[
          {
            columnGap: 2,
            rowGap: 0.5,
            bgcolor: 'background.default',
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            height: ({ mixins }) => mixins.footer,
            py: 1,
            px: { xs: 3, md: 5 },
            textAlign: { xs: 'center', sm: 'left' },
          },
        ]}
      >
        <Typography
          variant="caption"
          component="p"
          sx={{
            lineHeight: 1.6,
            fontWeight: 'light',
            color: 'text.secondary',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box component="span" whiteSpace="nowrap">
            ©
            <Link
              href="https://www.vip-shop-management.com/"
              target="_blank"
              sx={{ textDecoration: 'none', mx: 0.5 }}
            >
              Vip Shop Management
            </Link>
            {dayjs().year()}
          </Box>
          ,&nbsp;
          <Box component="span" whiteSpace="nowrap">
          All rights reserved
          </Box>

        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
