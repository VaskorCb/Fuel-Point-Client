'use client';

import { useState } from 'react';
import { useAtomValue } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { alpha } from '@mui/material/styles';
import {
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  CreditCard as PaidIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { subscriptionAtom } from 'store/auth';
import {
  useCreateSubscription,
  useCurrentSubscription,
} from 'services/subscriptions/subscriptions.hooks';
import type { PlanType } from 'types/auth-and-onboarding';
import PageLoader from 'components/loading/PageLoader';
import IconifyIcon from 'components/base/IconifyIcon';

export default function ManageSubscriptionPage() {
  const { t } = useTranslation();
  const subscriptionFromAtom = useAtomValue(subscriptionAtom);
  const { data: currentSubData, isLoading } = useCurrentSubscription();
  const createSubscription = useCreateSubscription();
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const currentSub = currentSubData?.data ?? null;
  const subscription = currentSub ?? subscriptionFromAtom;

  if (isLoading) {
    return <PageLoader sx={{ py: 10 }} />;
  }

  const isPending = subscription?.status === 'PENDING';
  const isActive = subscription?.status === 'TRIAL' || subscription?.status === 'ACTIVE';
  const isExpired = subscription?.status === 'EXPIRED';

  const endDate = subscription?.endDate ? new Date(subscription.endDate) : null;
  const startDate = subscription?.startDate ? new Date(subscription.startDate) : null;
  const daysRemaining = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / 86400000))
    : null;
  const totalDays =
    startDate && endDate
      ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000))
      : null;
  const progress =
    totalDays && daysRemaining !== null
      ? Math.min(((totalDays - daysRemaining) / totalDays) * 100, 100)
      : 0;

  const statusColor = {
    TRIAL: 'info' as const,
    ACTIVE: 'success' as const,
    PENDING: 'warning' as const,
    EXPIRED: 'error' as const,
  }[subscription?.status ?? 'EXPIRED'] ?? 'error' as const;

  const statusLabel = {
    TRIAL: 'free_trial',
    ACTIVE: 'active',
    PENDING: 'pending_activation',
    EXPIRED: 'expired',
  }[subscription?.status ?? 'EXPIRED'] ?? 'expired';

  const planLabel = {
    TRIAL: 'free_trial',
    MONTHLY: 'monthly_plan',
    YEARLY: 'yearly_plan',
    CUSTOM: 'custom_plan',
  }[subscription?.planType ?? ''] ?? subscription?.planType ?? '';

  const plans: {
    key: PlanType;
    nameKey: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
  }[] = [
    {
      key: 'MONTHLY',
      nameKey: 'monthly_plan',
      price: '৳500',
      period: t('per_month'),
      popular: false,
      features: [
        t('feature_full_access'),
        t('feature_5_pumps'),
        t('feature_sales_reports'),
        t('feature_employee_mgmt'),
        t('feature_email_support'),
      ],
    },
    {
      key: 'YEARLY',
      nameKey: 'yearly_plan',
      price: '৳5,000',
      period: t('per_year'),
      popular: true,
      features: [
        t('feature_everything_monthly'),
        t('feature_unlimited_pumps'),
        t('feature_shifts_employees'),
        t('feature_credits_customers'),
        t('feature_priority_support'),
      ],
    },
    {
      key: 'CUSTOM',
      nameKey: 'custom_plan',
      price: t('contact_us'),
      period: '',
      popular: false,
      features: [
        t('feature_everything_yearly'),
        t('feature_custom_duration'),
        t('feature_multi_role'),
        t('feature_api_access'),
        t('feature_dedicated_support'),
      ],
    },
  ];

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    try {
      await createSubscription.mutateAsync({
        planType: selectedPlan,
        paymentNote: paymentNote || undefined,
      });
      toast.success(t('subscription_submitted'));
      setSelectedPlan(null);
      setPaymentNote('');
    } catch {
      toast.error(t('subscription_failed'));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: '-0.02em' }}>
          {t('manage_subscription')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View your current plan and upgrade when you&apos;re ready
        </Typography>
      </Box>

      {/* Current Plan Card - Hero style */}
      {subscription && (
        <Card
          sx={{
            mb: 4,
            overflow: 'hidden',
            borderRadius: 3,
            border: 'none',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.light, 0.06)} 100%)`,
            boxShadow: (theme) =>
              `0 8px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>
            {/* Header row: label + status chip */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5 }}>
                {t('current_plan')}
              </Typography>
              <Chip
                label={t(statusLabel)}
                color={statusColor}
                size="medium"
                sx={{ fontWeight: 700, px: 1.5, py: 1.25, fontSize: '0.8rem' }}
              />
            </Box>

            {/* Plan name */}
            <Typography variant="h5" fontWeight={800} sx={{ mb: 2, letterSpacing: '-0.02em' }}>
              {t(planLabel)}
            </Typography>

            {/* Days remaining + progress bar */}
            {isActive && daysRemaining !== null && (
              <Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {daysRemaining === 0
                      ? t('expires_today')
                      : daysRemaining === 1
                        ? t('day_remaining')
                        : t('days_remaining', { count: daysRemaining })}
                    {endDate &&
                      ` · ${t('expires_on', {
                        date: endDate.toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }),
                      })}`}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  color={daysRemaining <= 3 ? 'error' : daysRemaining <= 7 ? 'warning' : 'primary'}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )}

            {isPending && (
              <Alert
                icon={<PendingIcon fontSize="small" />}
                severity="warning"
                sx={{ mt: 2, borderRadius: 2, py: 0.5 }}
              >
                {t('subscription_pending_msg')}
              </Alert>
            )}

            {isExpired && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2, py: 0.5 }}>
                {t('subscription_expired_msg')}
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Plans Section */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, letterSpacing: '-0.01em' }}>
        {isActive ? t('your_plan') : t('choose_plan')}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4, alignItems: 'stretch' }}>
        {plans.map((plan) => {
          const isCurrent = subscription?.planType === plan.key && isActive;
          const isSelected = selectedPlan === plan.key;
          const canSelect = !isActive && !isPending;
          const isCustom = plan.key === 'CUSTOM';

          return (
            <Grid key={plan.key} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: '2px solid',
                  borderColor: isSelected
                    ? 'primary.main'
                    : plan.popular
                      ? (theme) => alpha(theme.palette.primary.main, 0.5)
                      : 'divider',
                  borderRadius: 3,
                  cursor: canSelect ? 'pointer' : 'default',
                  opacity: isActive && !isCurrent ? 0.6 : isPending ? 0.7 : 1,
                  transition: 'all 0.25s ease',
                  overflow: 'visible',
                  bgcolor: plan.popular
                    ? (theme) => alpha(theme.palette.primary.main, 0.03)
                    : 'background.paper',
                  boxShadow: isSelected
                    ? (theme) => `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`
                    : plan.popular
                      ? (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.08)}`
                      : 'none',
                  '&:hover': canSelect
                    ? {
                        borderColor: 'primary.main',
                        boxShadow: (theme) => `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                        transform: 'translateY(-2px)',
                      }
                    : {},
                }}
                onClick={() => {
                  if (canSelect && !isCustom) setSelectedPlan(plan.key);
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1,
                    }}
                  >
                    <Chip
                      label={t('most_popular')}
                      color="primary"
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        px: 1.5,
                        boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                      }}
                    />
                  </Box>
                )}

                <CardContent
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:last-child': { pb: 3 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} color="text.secondary">
                      {t(plan.nameKey)}
                    </Typography>
                    {isCurrent && (
                      <Chip
                        label={t('current')}
                        color="success"
                        size="small"
                        sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                    <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
                      {plan.price}
                    </Typography>
                    {plan.period && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {plan.period}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ flex: 1, mb: 2 }}>
                    {plan.features.map((feature) => (
                      <Box
                        key={feature}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1.25,
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {canSelect && (
                    <Button
                      variant={plan.popular ? 'contained' : 'outlined'}
                      color={plan.popular ? 'primary' : 'neutral'}
                      fullWidth
                      size="large"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCustom) {
                          window.open('mailto:support@fuelpoint.com', '_blank');
                        } else {
                          setSelectedPlan(plan.key);
                        }
                      }}
                      sx={{
                        fontWeight: 700,
                        py: 1.25,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: plan.popular
                          ? (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
                          : 'none',
                      }}
                    >
                      {isCustom ? (
                        <>
                          <IconifyIcon icon="material-symbols:mail-outline" sx={{ mr: 1, fontSize: 20 }} />
                          {plan.price}
                        </>
                      ) : (
                        t('upgrade_now')
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Payment Section */}
      {selectedPlan && !isPending && selectedPlan !== 'CUSTOM' && (
        <Card
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
            boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              {t('complete_payment_for', {
                plan: t(plans.find((p) => p.key === selectedPlan)?.nameKey ?? ''),
              })}
            </Typography>

            <Alert
              severity="info"
              icon={<PaidIcon />}
              sx={{
                mb: 2,
                borderRadius: 2,
                py: 1.5,
                '& .MuiAlert-message': { width: '100%' },
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                {t('payment_methods')}:
              </Typography>
              <Typography variant="body2" component="div">
                bKash: 01XXXXXXXXX (Personal)
              </Typography>
              <Typography variant="body2" component="div">
                Bank: [Bank Name] - A/C: XXXXXXXXXX
              </Typography>
            </Alert>

            <TextField
              label={t('payment_reference')}
              placeholder={t('payment_reference_placeholder')}
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              fullWidth
              size="medium"
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setSelectedPlan(null);
                  setPaymentNote('');
                }}
                sx={{ textTransform: 'none', fontWeight: 600, flex: { xs: 'none', sm: '0 0 auto' } }}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, minWidth: 0 }}
                disabled={createSubscription.isPending}
                onClick={handleSubscribe}
                startIcon={
                  createSubscription.isPending ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <PaidIcon />
                  )
                }
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  py: 1.25,
                  borderRadius: 2,
                  boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                }}
              >
                {t('submit_payment')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
