'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import petrolPumpIcon from '../../../public/assets/logos/petrol-pump-icon.svg';
import paths from 'routes/paths';

const PACKAGES = [
  {
    name: 'Monthly',
    price: '৳500',
    period: 'month',
    description: 'For small fuel stations',
    features: [
      'Full system access',
      'Up to 5 pumps',
      'Sales & reports',
      'Employee management',
      'Email support',
    ],
    cta: 'Start free trial',
    popular: false,
    isContact: false,
  },
  {
    name: 'Yearly',
    price: '৳5,000',
    period: 'year',
    description: 'For growing fuel businesses',
    features: [
      'Everything in Monthly',
      'Unlimited pumps',
      'Shifts & employees',
      'Credits & customers',
      'Priority support',
    ],
    cta: 'Start free trial',
    popular: true,
    isContact: false,
  },
  {
    name: 'Custom',
    price: 'Contact',
    period: 'us',
    description: 'For large operations',
    features: [
      'Everything in Yearly',
      'Custom duration',
      'Multi-role access',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    popular: false,
    isContact: true,
  },
];

const STEPS = [
  {
    icon: 'solar:user-id-bold',
    title: 'Create your account',
    description: 'Sign up in minutes. No credit card required to start your free trial.',
  },
  {
    icon: 'solar:settings-bold',
    title: 'Set up your station',
    description: 'Add branches, pumps, fuel types, and prices. We guide you through each step.',
  },
  {
    icon: 'solar:cart-large-2-bold',
    title: 'Start selling',
    description: 'Process sales, manage shifts, track inventory, and run reports from day one.',
  },
  {
    icon: 'solar:chart-2-bold',
    title: 'Grow with insights',
    description: 'Use dashboards and reports to understand your business and make better decisions.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHowItWorks = () => {
    setMobileMenuOpen(false);
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navButtons = (
    <>
      <Button
        color="inherit"
        onClick={scrollToHowItWorks}
        sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        How it works
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          setMobileMenuOpen(false);
          router.push(paths.login);
        }}
        sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        Sign in
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setMobileMenuOpen(false);
          router.push(paths.signup);
        }}
        sx={{ fontWeight: 600, px: 2, whiteSpace: 'nowrap' }}
      >
        Get started
      </Button>
    </>
  );

  return (
    <>
      {/* Navbar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 64,
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
              <Image src={petrolPumpIcon} alt="Fuel Point" width={36} height={36} />
              <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
                Fuel Point
              </Typography>
            </Box>
            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navButtons}
            </Box>
            {/* Mobile: Sign in + hamburger menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
              <Button
                color="inherit"
                onClick={() => router.push(paths.login)}
                sx={{ fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'auto', px: 1.5 }}
              >
                Sign in
              </Button>
              <IconButton
                aria-label="open menu"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: 'text.primary' }}
              >
                <IconifyIcon icon="material-symbols:menu-rounded" sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            pt: 3,
            px: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, '& .MuiButton-root': { justifyContent: 'flex-start' } }}>
          <Button
            color="inherit"
            onClick={scrollToHowItWorks}
            sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            How it works
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setMobileMenuOpen(false);
              router.push(paths.signup);
            }}
            sx={{ fontWeight: 600, px: 2, whiteSpace: 'nowrap' }}
          >
            Get started
          </Button>
        </Box>
      </Drawer>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '100vh', md: 'auto' },
          py: { xs: 8, md: 14 },
          display: 'flex',
          alignItems: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 60%)`
              : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 60%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.primary.main, 0.12),
            filter: 'blur(80px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.primary.main, 0.08),
            filter: 'blur(60px)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
            <Typography
              component="span"
              variant="overline"
              sx={{
                display: 'inline-block',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              Petrol pump management
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Run your fuel station
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                smarter, not harder
              </Box>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              Sales, shifts, tanks, credits, and reports — all in one place.
              Start your free trial today.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push(paths.signup)}
                endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Start free trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push(paths.login)}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How it works */}
      <Box
        ref={howItWorksRef}
        component="section"
        id="how-it-works"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
          scrollMarginTop: 80,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1,
            }}
          >
            How it works
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 6,
            }}
          >
            Get started in four simple steps
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {STEPS.map((step, i) => (
              <Card
                key={step.title}
                variant="outlined"
                sx={{
                  height: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <IconifyIcon
                      icon={step.icon}
                      sx={{ fontSize: 24, color: 'primary.main' }}
                    />
                  </Box>
                  <Typography
                    variant="overline"
                    sx={{ color: 'primary.main', fontWeight: 700 }}
                  >
                    Step {i + 1}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Pricing */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.04)} 50%, transparent 100%)`
              : `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.03)} 50%, transparent 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1,
            }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 6,
            }}
          >
            Simple, transparent pricing
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              alignItems: 'stretch',
            }}
          >
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                sx={{
                  position: 'relative',
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: pkg.popular ? 'primary.main' : 'divider',
                  boxShadow: pkg.popular
                    ? (theme) => `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                    : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                }}
              >
                {pkg.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    <Typography variant="caption" fontWeight={700} color="primary.contrastText">
                      Most popular
                    </Typography>
                  </Box>
                )}
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                    {pkg.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {pkg.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                    <Typography variant="h3" fontWeight={800}>
                      {pkg.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      /{pkg.period}
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', flex: 1 }}>
                    {pkg.features.map((f) => (
                      <Box
                        key={f}
                        component="li"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          py: 0.75,
                          typography: 'body2',
                          color: 'text.secondary',
                        }}
                      >
                        <IconifyIcon
                          icon="solar:check-circle-bold"
                          sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }}
                        />
                        {f}
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant={pkg.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    onClick={() =>
                      pkg.isContact
                        ? router.push(paths.login)
                        : router.push(paths.signup)
                    }
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 2,
                    }}
                  >
                    {pkg.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Ready to streamline your fuel station?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Join hundreds of stations already using Fuel Point. No credit card required.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push(paths.signup)}
              endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              Start your free trial
            </Button>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image src={petrolPumpIcon} alt="Fuel Point" width={28} height={28} />
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Fuel Point. All rights reserved.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                size="small"
                color="inherit"
                onClick={() => router.push(paths.login)}
                sx={{ fontWeight: 500 }}
              >
                Sign in
              </Button>
              <Button
                size="small"
                color="inherit"
                onClick={() => router.push(paths.signup)}
                sx={{ fontWeight: 500 }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
