'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import petrolPumpIcon from '../../../../public/assets/logos/petrol-pump-icon.svg';
import paths from 'routes/paths';

const PACKAGES = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    tagline: 'For single-pump stations',
    features: ['1 Branch', 'Up to 2 pumps', 'Basic sales & reports', 'Email support'],
    cta: 'Start free trial',
    popular: false,
    icon: 'solar:fuel-bold',
  },
  {
    name: 'Professional',
    price: 79,
    period: 'month',
    tagline: 'For growing fuel businesses',
    features: [
      'Up to 5 branches',
      'Unlimited pumps',
      'Shifts & employees',
      'Credits & customers',
      'Priority support',
    ],
    cta: 'Start free trial',
    popular: true,
    icon: 'solar:station-bold',
  },
  {
    name: 'Enterprise',
    price: 199,
    period: 'month',
    tagline: 'For large operations',
    features: [
      'Unlimited branches',
      'Unlimited pumps',
      'Multi-role access',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    popular: false,
    icon: 'solar:buildings-2-bold',
  },
];

const STEPS = [
  {
    num: '01',
    icon: 'solar:user-id-bold',
    title: 'Create account',
    desc: 'Sign up in minutes. No credit card required.',
  },
  {
    num: '02',
    icon: 'solar:settings-bold',
    title: 'Set up station',
    desc: 'Add branches, pumps, fuel types. We guide you.',
  },
  {
    num: '03',
    icon: 'solar:cart-large-2-bold',
    title: 'Start selling',
    desc: 'Process sales, manage shifts, track inventory.',
  },
  {
    num: '04',
    icon: 'solar:chart-2-bold',
    title: 'Grow with insights',
    desc: 'Dashboards and reports for better decisions.',
  },
];

export default function LandingPreviewPage() {
  const router = useRouter();
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* ─── Navbar ─── */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85),
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid',
          borderColor: (theme) => alpha(theme.palette.divider, 0.6),
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 72,
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                }}
              >
                <Image src={petrolPumpIcon} alt="Fuel Point" width={28} height={28} />
              </Box>
              <Typography variant="h6" fontWeight={800} letterSpacing="-0.02em">
                Fuel Point
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                onClick={scrollToHowItWorks}
                sx={{ fontWeight: 600, px: 2 }}
              >
                How it works
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push(paths.login)}
                sx={{ fontWeight: 600, px: 2 }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(paths.signup)}
                sx={{
                  fontWeight: 700,
                  px: 2.5,
                  py: 1.25,
                  borderRadius: 2,
                  boxShadow: (theme) =>
                    `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                }}
              >
                Get started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── Hero ─── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 14, md: 18 },
          pb: { xs: 10, md: 16 },
        }}
      >
        {/* Gradient orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '80%',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(ellipse, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-15%',
            width: '50%',
            height: '60%',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(ellipse, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        {/* Grid pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) =>
              `linear-gradient(${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px),
               linear-gradient(90deg, ${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                mb: 3,
                borderRadius: 3,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              }}
            >
              <IconifyIcon icon="solar:fuel-bold" sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="caption" fontWeight={700} color="primary.main" letterSpacing={1.5}>
                PETROL PUMP MANAGEMENT
              </Typography>
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.25rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                mb: 2,
              }}
            >
              Run your fuel station
              <br />
              <Box
                component="span"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                smarter, not harder
              </Box>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.7,
                mb: 4,
                maxWidth: 560,
                mx: 'auto',
              }}
            >
              Sales, shifts, tanks, credits, and reports — all in one place.
              Start your free trial today. No credit card required.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push(paths.signup)}
                endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
                sx={{
                  px: 3.5,
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: (theme) =>
                    `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                  '&:hover': {
                    boxShadow: (theme) =>
                      `0 12px 32px ${alpha(theme.palette.primary.main, 0.45)}`,
                  },
                }}
              >
                Start free trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push(paths.login)}
                sx={{
                  px: 3.5,
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 },
                }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── How it works ─── */}
      <Box
        ref={howItWorksRef}
        component="section"
        id="how-it-works"
        sx={{
          py: { xs: 10, md: 14 },
          scrollMarginTop: 88,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.4)
              : alpha(theme.palette.grey[50], 0.8),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: 3,
                mb: 1,
              }}
            >
              How it works
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Get started in four steps
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {STEPS.map((step, i) => (
              <Box
                key={step.title}
                sx={{
                  position: 'relative',
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                    boxShadow: (theme) =>
                      `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.12)}`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: (theme) => alpha(theme.palette.primary.main, 0.15),
                    mb: 2,
                  }}
                >
                  {step.num}
                </Typography>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <IconifyIcon icon={step.icon} sx={{ fontSize: 28, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {step.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── Pricing ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '50%',
            background: (theme) =>
              `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: 3,
                mb: 1,
              }}
            >
              Pricing
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.75rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Simple, transparent pricing
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: '1.1rem' }}>
              Choose the plan that fits your station. All plans include a 14-day free trial.
            </Typography>
          </Box>
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
              <Box
                key={pkg.name}
                sx={{
                  position: 'relative',
                  p: 3.5,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: pkg.popular ? 'primary.main' : 'divider',
                  boxShadow: pkg.popular
                    ? (theme) => `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                    : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                      `0 24px 48px -12px ${alpha(theme.palette.primary.main, 0.2)}`,
                    transform: 'translateY(-6px)',
                  },
                }}
              >
                {pkg.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      px: 2.5,
                      py: 0.75,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      boxShadow: (theme) =>
                        `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    <Typography variant="caption" fontWeight={800} color="primary.contrastText">
                      MOST POPULAR
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <IconifyIcon icon={pkg.icon} sx={{ fontSize: 24, color: 'primary.main' }} />
                </Box>
                <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pkg.tagline}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                  <Typography variant="h3" fontWeight={800} sx={{ fontSize: '2.5rem' }}>
                    ${pkg.price}
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
                        gap: 1.5,
                        py: 1,
                        typography: 'body2',
                        color: 'text.secondary',
                      }}
                    >
                      <IconifyIcon
                        icon="solar:check-circle-bold"
                        sx={{ fontSize: 20, color: 'success.main', flexShrink: 0 }}
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
                    pkg.name === 'Enterprise' ? router.push(paths.login) : router.push(paths.signup)
                  }
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 2,
                    ...(pkg.popular && {
                      boxShadow: (theme) =>
                        `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }),
                  }}
                >
                  {pkg.cta}
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── CTA ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.5)
              : alpha(theme.palette.grey[50], 0.9),
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5, letterSpacing: '-0.02em' }}>
              Ready to streamline your fuel station?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              Join hundreds of stations using Fuel Point. No credit card required.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push(paths.signup)}
              endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
              sx={{
                px: 4,
                py: 1.75,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: (theme) =>
                  `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
              }}
            >
              Start your free trial
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── Footer ─── */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image src={petrolPumpIcon} alt="Fuel Point" width={32} height={32} />
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Fuel Point. All rights reserved.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button size="small" color="inherit" onClick={() => router.push(paths.login)}>
                Sign in
              </Button>
              <Button size="small" color="inherit" onClick={() => router.push(paths.signup)}>
                Sign up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
