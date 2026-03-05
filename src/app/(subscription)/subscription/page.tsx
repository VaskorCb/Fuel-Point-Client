'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import {
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  CreditCard as PaidIcon,
  RocketLaunch as TrialIcon,
} from '@mui/icons-material';
import PageLoader from 'components/loading/PageLoader';
import { userAtom } from 'store/auth';
import {
  useStartTrial,
  useCreateSubscription,
  useCurrentSubscription,
} from 'services/subscriptions/subscriptions.hooks';
import type { PlanType } from 'types/auth-and-onboarding';
import toast from 'react-hot-toast';

const plans: {
  key: PlanType;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonLabel: string;
  buttonVariant: 'contained' | 'outlined';
}[] = [
  {
    key: 'MONTHLY',
    name: 'Monthly',
    subtitle: 'For small fuel stations',
    price: '৳500',
    period: '/month',
    features: [
      'Full system access',
      'Up to 5 pumps',
      'Sales & reports',
      'Employee management',
      'Email support',
    ],
    buttonLabel: 'Subscribe Monthly',
    buttonVariant: 'outlined',
  },
  {
    key: 'YEARLY',
    name: 'Yearly',
    subtitle: 'For growing fuel businesses',
    price: '৳5,000',
    period: '/year',
    popular: true,
    features: [
      'Everything in Monthly',
      'Unlimited pumps',
      'Shifts & employees',
      'Credits & customers',
      'Priority support',
    ],
    buttonLabel: 'Subscribe Yearly',
    buttonVariant: 'contained',
  },
  {
    key: 'CUSTOM',
    name: 'Custom',
    subtitle: 'For large operations',
    price: 'Contact',
    period: ' us',
    features: [
      'Everything in Yearly',
      'Custom duration',
      'Multi-role access',
      'API access',
      'Dedicated support',
    ],
    buttonLabel: 'Contact Sales',
    buttonVariant: 'outlined',
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const { data: currentSubData, isLoading } = useCurrentSubscription();
  const startTrial = useStartTrial();
  const createSubscription = useCreateSubscription();
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const currentSub = currentSubData?.data;
  const hasUsedTrial = user?.hasUsedTrial ?? false;

  if (
    currentSub &&
    (currentSub.status === 'TRIAL' || currentSub.status === 'ACTIVE')
  ) {
    router.replace('/dashboard');
    return null;
  }

  const handleStartTrial = async (plan: PlanType) => {
    if (hasUsedTrial) {
      setSelectedPlan(plan);
      return;
    }
    try {
      await startTrial.mutateAsync();
      toast.success('Free trial activated! Enjoy 7 days of full access.');
      router.replace('/dashboard');
    } catch {
      toast.error('Failed to start trial. Please try again.');
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    try {
      await createSubscription.mutateAsync({
        planType: selectedPlan,
        paymentNote: paymentNote || undefined,
      });
      toast.success('Subscription request submitted! We will activate it after verifying your payment.');
    } catch {
      toast.error('Failed to submit subscription. Please try again.');
    }
  };

  if (isLoading) {
    return <PageLoader sx={{ py: 10 }} />;
  }

  const isPending = currentSub?.status === 'PENDING';

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
          Simple, transparent pricing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose the plan that fits your fuel station
        </Typography>
      </Box>

      {/* Pending alert */}
      {isPending && (
        <Alert icon={<PendingIcon />} severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography fontWeight={600}>Payment Pending Verification</Typography>
          <Typography variant="body2">
            Your <strong>{currentSub.planType}</strong> subscription request has been submitted.
            We will activate it once payment is verified.
          </Typography>
        </Alert>
      )}

      {/* Expired alert */}
      {currentSub?.status === 'EXPIRED' && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          Your subscription has expired. Please select a plan to continue.
        </Alert>
      )}

      {/* Plan Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {plans.map((plan) => (
          <Grid key={plan.key} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid',
                borderColor: plan.popular ? 'primary.main' : 'divider',
                borderRadius: 3,
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most popular"
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              )}
              <CardContent
                sx={{
                  p: 3.5,
                  pt: plan.popular ? 4 : 3.5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Plan name & subtitle */}
                <Typography variant="h5" fontWeight={800}>
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  {plan.subtitle}
                </Typography>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 3 }}>
                  <Typography variant="h3" fontWeight={800}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {plan.period}
                  </Typography>
                </Box>

                {/* Features */}
                <Box sx={{ flex: 1, mb: 3 }}>
                  {plan.features.map((feature) => (
                    <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                      <CheckIcon sx={{ fontSize: 20, color: 'success.main' }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Action button */}
                {!hasUsedTrial && plan.key !== 'CUSTOM' ? (
                  <Button
                    variant={plan.buttonVariant}
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isPending || startTrial.isPending}
                    onClick={() => handleStartTrial(plan.key)}
                    startIcon={startTrial.isPending ? <CircularProgress size={16} /> : <TrialIcon />}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Start free trial
                  </Button>
                ) : (
                  <Button
                    variant={plan.buttonVariant}
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isPending}
                    onClick={() => setSelectedPlan(plan.key)}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      ...(selectedPlan === plan.key && {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }),
                    }}
                  >
                    {selectedPlan === plan.key ? 'Selected' : plan.buttonLabel}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trial used info */}
      {hasUsedTrial && !selectedPlan && !isPending && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Free trial has already been used. Please select a paid plan above.
        </Alert>
      )}

      {/* Payment section */}
      {selectedPlan && !isPending && (
        <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Complete Payment for {plans.find((p) => p.key === selectedPlan)?.name} Plan
            </Typography>

            <Alert severity="info" sx={{ mb: 2, borderRadius: 1.5 }}>
              <Typography variant="body2" fontWeight={600}>
                Payment Methods:
              </Typography>
              <Typography variant="body2">
                bKash: 01XXXXXXXXX (Personal)
              </Typography>
              <Typography variant="body2">
                Bank: [Bank Name] - A/C: XXXXXXXXXX
              </Typography>
            </Alert>

            <TextField
              label="Payment Reference / TXN ID"
              placeholder="e.g. bKash TXN123456"
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              disabled={createSubscription.isPending}
              onClick={handleSubscribe}
              startIcon={
                createSubscription.isPending ? <CircularProgress size={16} /> : <PaidIcon />
              }
              sx={{
                py: 1.5,
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Submit Payment
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
