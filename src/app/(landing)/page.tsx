'use client';

import { useRef, useState, useEffect } from 'react';
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
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
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

const STATS = [
  { label: 'Happy Users', value: 2500, suffix: '+', icon: 'solar:users-group-rounded-bold' },
  { label: 'Fuel Stations', value: 850, suffix: '+', icon: 'solar:gas-station-bold' },
  { label: 'Sales Processed', value: 1.2, suffix: 'M+', icon: 'solar:cart-large-2-bold' },
  { label: 'Uptime', value: 99.9, suffix: '%', icon: 'solar:shield-check-bold' },
];

const REVIEWS = [
  {
    name: 'Karim Hossain',
    role: 'Station Owner, Dhaka',
    avatar: 'KH',
    rating: 5,
    review:
      'Fuel Point completely transformed how I manage my station. The shift management and real-time sales tracking saved us hours every day.',
  },
  {
    name: 'Rashida Begum',
    role: 'Manager, Chittagong',
    avatar: 'RB',
    rating: 5,
    review:
      'Before Fuel Point, we used paper logs for everything. Now our reports are instant, credits are tracked automatically, and I can monitor from my phone.',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Owner, Sylhet',
    avatar: 'TA',
    rating: 4,
    review:
      'The onboarding was so smooth — I set up 3 pumps, added my team, and started selling within 30 minutes. Customer support is excellent too.',
  },
  {
    name: 'Farhan Islam',
    role: 'Multi-Station Owner',
    avatar: 'FI',
    rating: 5,
    review:
      'Managing 5 stations used to be a nightmare. With Fuel Point dashboards and reports, I have full visibility across all locations in one place.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Accountant, Rajshahi',
    avatar: 'NJ',
    rating: 5,
    review:
      'The expense tracking and bank deposit features are a lifesaver. Monthly reconciliation that used to take 2 days now takes 2 hours.',
  },
  {
    name: 'Arif Rahman',
    role: 'Station Manager, Khulna',
    avatar: 'AR',
    rating: 4,
    review:
      'Tank dipping and inventory management are incredibly accurate. We reduced fuel discrepancies by 95% in the first month.',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Number(current.toFixed(1)));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const display = Number.isInteger(value) ? Math.floor(count).toLocaleString() : count.toFixed(1);

  return (
    <Typography
      ref={ref}
      variant="h3"
      sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1 }}
    >
      {display}
      {suffix}
    </Typography>
  );
}

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
          minHeight: { xs: 'calc(100vh - 64px)', md: 'auto' },
          py: { xs: 10, md: 16 },
          display: 'flex',
          alignItems: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `radial-gradient(ellipse 80% 60% at 50% -10%, ${alpha(theme.palette.primary.main, 0.18)} 0%, transparent 70%), linear-gradient(180deg, ${alpha(theme.palette.background.default, 1)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`
              : `radial-gradient(ellipse 80% 60% at 50% -10%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%), linear-gradient(180deg, #f8faff 0%, #ffffff 100%)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) =>
              `radial-gradient(${alpha(theme.palette.primary.main, 0.06)} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.6,
          },
        }}
      >
        {/* Animated floating orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -60, md: -120 },
            right: { xs: -40, md: -80 },
            width: { xs: 300, md: 500 },
            height: { xs: 300, md: 500 },
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 70%, transparent 100%)`,
            filter: 'blur(60px)',
            animation: 'heroFloat 8s ease-in-out infinite',
            '@keyframes heroFloat': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(-30px, 20px) scale(1.05)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -40, md: -100 },
            left: { xs: -60, md: -120 },
            width: { xs: 250, md: 400 },
            height: { xs: 250, md: 400 },
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: 'heroFloat2 10s ease-in-out infinite',
            '@keyframes heroFloat2': {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(20px, -25px) scale(1.08)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '15%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.primary.main, 0.06),
            filter: 'blur(50px)',
            display: { xs: 'none', md: 'block' },
            animation: 'heroFloat3 12s ease-in-out infinite',
            '@keyframes heroFloat3': {
              '0%, 100%': { transform: 'translate(0, 0)' },
              '33%': { transform: 'translate(15px, -20px)' },
              '66%': { transform: 'translate(-10px, 15px)' },
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 780, mx: 'auto' }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.5,
                py: 0.75,
                borderRadius: 10,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                mb: 3,
                backdropFilter: 'blur(10px)',
                animation: 'fadeInUp 0.8s ease-out',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  boxShadow: (theme) => `0 0 8px ${theme.palette.success.main}`,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.6, transform: 'scale(1.3)' },
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}
              >
                PETROL PUMP MANAGEMENT
              </Typography>
            </Box>

            {/* Title with 3D text effect */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.75rem', md: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                mb: 2.5,
                animation: 'fadeInUp 0.8s ease-out 0.1s both',
              }}
            >
              Run your fuel station
              <br />
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  color: 'primary.main',
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
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
                fontSize: { xs: '1.05rem', md: '1.3rem' },
                lineHeight: 1.65,
                mb: 5,
                maxWidth: 600,
                mx: 'auto',
                animation: 'fadeInUp 0.8s ease-out 0.2s both',
              }}
            >
              Sales, shifts, tanks, credits, and reports — all in one place.
              Start your free trial today.
            </Typography>

            {/* CTA buttons with glow */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeInUp 0.8s ease-out 0.3s both',
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push(paths.signup)}
                endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 2.5,
                  boxShadow: (theme) =>
                    `0 8px 32px ${alpha(theme.palette.primary.main, 0.35)}, 0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) =>
                      `0 12px 40px ${alpha(theme.palette.primary.main, 0.45)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
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
                  px: 4,
                  py: 1.75,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  borderRadius: 2.5,
                  borderWidth: 1.5,
                  backdropFilter: 'blur(10px)',
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderWidth: 1.5,
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                  },
                }}
              >
                Sign in
              </Button>
            </Box>

            {/* Floating 3D feature cards */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                gap: 3,
                mt: 8,
                perspective: '1200px',
                animation: 'fadeInUp 0.8s ease-out 0.5s both',
              }}
            >
              {[
                { icon: 'solar:gas-station-bold', label: 'Pump Management', color: '#6366f1' },
                { icon: 'solar:chart-2-bold', label: 'Live Dashboard', color: '#10b981' },
                { icon: 'solar:wallet-money-bold', label: 'Credit Tracking', color: '#f59e0b' },
                { icon: 'solar:document-bold', label: 'Auto Reports', color: '#ef4444' },
              ].map((item, i) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2.5,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.divider, 0.5),
                    backdropFilter: 'blur(20px)',
                    boxShadow: (theme) =>
                      `0 8px 32px ${alpha(theme.palette.common.black, 0.06)}, 0 2px 8px ${alpha(theme.palette.common.black, 0.04)}`,
                    transform: `rotateX(5deg) rotateY(${i < 2 ? '-' : ''}${i === 0 || i === 3 ? '6' : '2'}deg) translateZ(${i === 1 || i === 2 ? '20px' : '0px'})`,
                    transition: 'all 0.4s ease',
                    cursor: 'default',
                    '&:hover': {
                      transform: 'rotateX(0deg) rotateY(0deg) translateZ(30px) translateY(-6px)',
                      boxShadow: (theme) =>
                        `0 16px 48px ${alpha(item.color, 0.15)}, 0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                      borderColor: alpha(item.color, 0.3),
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: alpha(item.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconifyIcon icon={item.icon} sx={{ fontSize: 22, color: item.color }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Counter */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.dark, 0.12)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {STATS.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1.5,
                  }}
                >
                  <IconifyIcon icon={stat.icon} sx={{ fontSize: 28, color: 'primary.main' }} />
                </Box>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, fontWeight: 600, letterSpacing: 0.5 }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
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
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/how-it-works')}
              endIcon={<IconifyIcon icon="solar:arrow-right-bold" />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              See full process guide
            </Button>
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

      {/* User Reviews */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
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
            Testimonials
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 1.5,
            }}
          >
            Loved by station owners
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            See what fuel station owners and managers are saying about Fuel Point.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {REVIEWS.map((review) => (
              <Card
                key={review.name}
                variant="outlined"
                sx={{
                  height: 1,
                  borderRadius: 3,
                  borderColor: 'divider',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) =>
                      `0 12px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 1 }}>
                  <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1, lineHeight: 1.7, mb: 2.5, fontStyle: 'italic' }}
                  >
                    &ldquo;{review.review}&rdquo;
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {review.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {review.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.role}
                      </Typography>
                    </Box>
                  </Box>
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
