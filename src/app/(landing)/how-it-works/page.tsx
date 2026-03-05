'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import petrolPumpIcon from '../../../../public/assets/logos/petrol-pump-icon.svg';
import paths from 'routes/paths';

const PROCESS_SECTIONS = [
  {
    phase: 'Phase 1',
    title: 'Registration & Account Setup',
    subtitle: 'Get started in under 5 minutes',
    icon: 'solar:user-plus-bold',
    color: '#6366f1',
    steps: [
      {
        title: 'Create Your Account',
        description:
          'Visit the sign-up page, enter your name, email, phone number, and a secure password. Verify your email to activate your account instantly.',
        icon: 'solar:user-id-bold',
      },
      {
        title: 'Choose Your Plan',
        description:
          'Start with a free trial — no credit card required. Pick Monthly, Yearly, or Custom based on your station size. Upgrade anytime as you grow.',
        icon: 'solar:card-bold',
      },
      {
        title: 'Complete Onboarding',
        description:
          'Our guided onboarding walks you through setting up your station name, address, and basic business details. Everything is saved automatically.',
        icon: 'solar:checklist-minimalistic-bold',
      },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Configure Your Station',
    subtitle: 'Set up everything your station needs',
    icon: 'solar:settings-bold',
    color: '#f59e0b',
    steps: [
      {
        title: 'Add Fuel Types & Prices',
        description:
          'Define the fuel types you sell (Petrol, Diesel, Octane, etc.) and set their current selling prices. Update prices anytime with full history tracking.',
        icon: 'solar:gas-station-bold',
      },
      {
        title: 'Set Up Tanks',
        description:
          'Register each storage tank — assign a fuel type, set its capacity, and enter the current stock level. Tank alerts will notify you when stock is low.',
        icon: 'solar:battery-charge-bold',
      },
      {
        title: 'Register Pumps & Nozzles',
        description:
          'Add each physical pump, then create nozzles under it. Link nozzles to their tanks and fuel types. Set the initial meter reading for accurate tracking.',
        icon: 'solar:tuning-square-2-bold',
      },
      {
        title: 'Add Employees',
        description:
          'Create profiles for your pump operators, managers, and staff. Assign roles and permissions so everyone has access to what they need.',
        icon: 'solar:users-group-rounded-bold',
      },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Daily Operations',
    subtitle: 'Run your station smoothly every day',
    icon: 'solar:play-bold',
    color: '#10b981',
    steps: [
      {
        title: 'Start a Shift',
        description:
          'Begin each work period by starting a shift — select the employee, pumps, and record opening meter readings. This ensures every liter is tracked.',
        icon: 'solar:clock-circle-bold',
      },
      {
        title: 'Record Sales',
        description:
          'Log each sale with the pump, nozzle, fuel type, quantity, and amount. Support for cash, credit, and mobile payments. Sales are linked to the active shift.',
        icon: 'solar:cart-large-2-bold',
      },
      {
        title: 'Manage Credits & Customers',
        description:
          'Register customers and vehicles for credit sales. Track outstanding balances, record payments, and see a complete credit history per customer.',
        icon: 'solar:wallet-money-bold',
      },
      {
        title: 'End the Shift',
        description:
          'Close the shift by entering closing meter readings. The system automatically calculates total sales, cash collected, and highlights any discrepancies.',
        icon: 'solar:check-circle-bold',
      },
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Inventory & Supplies',
    subtitle: 'Keep your tanks full and costs tracked',
    icon: 'solar:box-bold',
    color: '#8b5cf6',
    steps: [
      {
        title: 'Record Fuel Supplies',
        description:
          'When a fuel tanker arrives, log the supply — supplier name, fuel type, quantity, cost per liter, and total amount. Tank levels update automatically.',
        icon: 'solar:delivery-bold',
      },
      {
        title: 'Tank Dipping',
        description:
          'Perform manual tank measurements (dipping) to verify physical stock against system records. Track differences and investigate discrepancies early.',
        icon: 'solar:ruler-angular-bold',
      },
      {
        title: 'Track Expenses',
        description:
          'Log all operational expenses — electricity, maintenance, salaries, rent, etc. Categorize them for clean financial reporting at month-end.',
        icon: 'solar:bill-list-bold',
      },
      {
        title: 'Bank Deposits',
        description:
          'Record daily cash deposits to your bank account. Keep a clear trail of how much cash was collected vs. deposited for full financial transparency.',
        icon: 'solar:safe-square-bold',
      },
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Reports & Insights',
    subtitle: 'Make data-driven decisions for your business',
    icon: 'solar:chart-2-bold',
    color: '#ef4444',
    steps: [
      {
        title: 'Daily Reports',
        description:
          'Get a complete summary of each day — total sales by fuel type, shift-wise breakdown, expenses, deposits, and net cash position.',
        icon: 'solar:calendar-bold',
      },
      {
        title: 'Monthly Reports',
        description:
          'View monthly trends with total revenue, cost of goods, gross profit, expenses, and net profit. Compare month-over-month to spot patterns.',
        icon: 'solar:graph-new-bold',
      },
      {
        title: 'Fuel-Wise & Shift-Wise Analysis',
        description:
          'Break down performance by fuel type or shift. See which fuels sell most, which shifts are most productive, and where losses might be occurring.',
        icon: 'solar:pie-chart-2-bold',
      },
      {
        title: 'Dashboard Overview',
        description:
          'Your real-time command center — see today\'s sales, tank levels, credit overview, alerts, and charts all on one page. Monitor everything at a glance.',
        icon: 'solar:widget-bold',
      },
    ],
  },
  {
    phase: 'Phase 6',
    title: 'Team & Settings',
    subtitle: 'Scale your operations confidently',
    icon: 'solar:shield-user-bold',
    color: '#0ea5e9',
    steps: [
      {
        title: 'Invite Team Members',
        description:
          'Add managers, accountants, or operators to your account. Each person gets their own login with role-based access — owner, manager, or operator.',
        icon: 'solar:user-plus-bold',
      },
      {
        title: 'Manage Subscriptions',
        description:
          'View your current plan, usage, and billing. Upgrade or switch plans as your station grows. Payment history and invoices are always available.',
        icon: 'solar:card-recive-bold',
      },
      {
        title: 'Station Settings',
        description:
          'Update station details, business info, and preferences. Configure alerts, notification preferences, and fuel price update workflows.',
        icon: 'solar:settings-minimalistic-bold',
      },
    ],
  },
];

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <>
      {/* Header */}
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              <Image src={petrolPumpIcon} alt="Fuel Point" width={36} height={36} />
              <Typography variant="h6" fontWeight={700} color="text.primary">
                Fuel Point
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                onClick={() => router.push(paths.login)}
                sx={{ fontWeight: 600 }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(paths.signup)}
                sx={{ fontWeight: 600, px: 2 }}
              >
                Get started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`
              : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 70%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.primary.main, 0.08),
            filter: 'blur(100px)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                display: 'inline-block',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              Complete guide
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              How Fuel Point works{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                from start to finish
              </Box>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
                maxWidth: 640,
                mx: 'auto',
              }}
            >
              New to Fuel Point? This guide walks you through every step — from creating your
              account to generating your first profit report. No technical knowledge required.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Process Sections */}
      {PROCESS_SECTIONS.map((section, sectionIndex) => (
        <Box
          key={section.phase}
          component="section"
          sx={{
            py: { xs: 6, md: 10 },
            bgcolor: sectionIndex % 2 === 0 ? 'background.default' : 'background.paper',
          }}
        >
          <Container maxWidth="lg">
            {/* Phase Header */}
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: alpha(section.color, 0.1),
                  mb: 2,
                }}
              >
                <IconifyIcon
                  icon={section.icon}
                  sx={{ fontSize: 18, color: section.color }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: section.color, letterSpacing: 1 }}
                >
                  {section.phase}
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  mb: 1,
                }}
              >
                {section.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {section.subtitle}
              </Typography>
            </Box>

            {/* Steps */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {section.steps.map((step, stepIndex) => (
                <Card
                  key={step.title}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    borderColor: 'divider',
                    overflow: 'visible',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: section.color,
                      boxShadow: `0 8px 32px ${alpha(section.color, 0.12)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 2.5, md: 4 },
                      display: 'flex',
                      gap: { xs: 2, md: 3 },
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Step number + icon */}
                    <Box sx={{ flexShrink: 0 }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: { xs: 52, md: 64 },
                          height: { xs: 52, md: 64 },
                          borderRadius: 3,
                          bgcolor: alpha(section.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconifyIcon
                          icon={step.icon}
                          sx={{
                            fontSize: { xs: 24, md: 30 },
                            color: section.color,
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: section.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: '#fff', fontWeight: 800, fontSize: 11 }}
                          >
                            {stepIndex + 1}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 0.75,
                          fontSize: { xs: '1rem', md: '1.15rem' },
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, fontSize: { xs: '0.875rem', md: '0.95rem' } }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>
      ))}

      {/* Bottom CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`
              : `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
              borderRadius: 4,
            }}
          >
            <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5 }}>
              Ready to get started?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
              Join thousands of fuel station owners who are already managing smarter with Fuel
              Point. Start your free trial — no credit card needed.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                Start free trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Back to home
              </Button>
            </Box>
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
                &copy; {new Date().getFullYear()} Fuel Point. All rights reserved.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                size="small"
                color="inherit"
                onClick={() => router.push('/')}
                sx={{ fontWeight: 500 }}
              >
                Home
              </Button>
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
}
