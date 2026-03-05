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
import {
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  CreditCard as PaidIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { userAtom, subscriptionAtom } from 'store/auth';
import {
  useCreateSubscription,
  useCurrentSubscription,
} from 'services/subscriptions/subscriptions.hooks';
import type { PlanType } from 'types/auth-and-onboarding';
import PageLoader from 'components/loading/PageLoader';

export default function ManageSubscriptionPage() {
  const { t } = useTranslation();
  const user = useAtomValue(userAtom);
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

  const plans: { key: PlanType; nameKey: string; price: string; period: string; features: string[] }[] = [
    {
      key: 'MONTHLY',
      nameKey: 'monthly_plan',
      price: '৳500',
      period: t('per_month'),
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
    <Box>
      {/* Page Header */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        {t('manage_subscription')}
      </Typography>

      {/* Current Plan Card */}
      {subscription && (
        <Card sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {t('current_plan')}
              </Typography>
              <Chip label={t(statusLabel)} color={statusColor} size="small" />
            </Box>

            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {t(planLabel)}
            </Typography>

            {isActive && daysRemaining !== null && (
              <>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  color={daysRemaining <= 3 ? 'error' : daysRemaining <= 7 ? 'warning' : 'primary'}
                  sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {daysRemaining === 0
                    ? t('expires_today')
                    : daysRemaining === 1
                      ? t('day_remaining')
                      : t('days_remaining', { count: daysRemaining })}
                  {endDate &&
                    ` (${t('expires_on', { date: endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) })})`}
                </Typography>
              </>
            )}

            {isPending && (
              <Alert icon={<PendingIcon fontSize="small" />} severity="warning" sx={{ mt: 1, py: 0.5 }}>
                {t('subscription_pending_msg')}
              </Alert>
            )}

            {isExpired && (
              <Alert severity="error" sx={{ mt: 1, py: 0.5 }}>
                {t('subscription_expired_msg')}
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Plans Section */}
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
        {isActive ? t('your_plan') : t('choose_plan')}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {plans.map((plan) => {
          const isCurrent = subscription?.planType === plan.key && isActive;
          const isSelected = selectedPlan === plan.key;
          const canSelect = !isActive && !isPending;

          return (
            <Grid key={plan.key} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : isCurrent ? 'success.main' : 'divider',
                  borderRadius: 2,
                  cursor: canSelect ? 'pointer' : 'default',
                  opacity: isActive && !isCurrent ? 0.5 : isPending ? 0.6 : 1,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  '&:hover': canSelect ? { boxShadow: 4 } : {},
                }}
                onClick={() => {
                  if (canSelect) setSelectedPlan(plan.key);
                }}
              >
                <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%', '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {t(plan.nameKey)}
                    </Typography>
                    {isCurrent && (
                      <Chip label={t('current')} color="success" size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1.5 }}>
                    <Typography variant="h5" fontWeight={800}>
                      {plan.price}
                    </Typography>
                    {plan.period && (
                      <Typography variant="body2" color="text.secondary">
                        {plan.period}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    {plan.features.map((feature) => (
                      <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                        <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Payment Section */}
      {selectedPlan && !isPending && (
        <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              {t('complete_payment_for', { plan: t(plans.find((p) => p.key === selectedPlan)?.nameKey ?? '') })}
            </Typography>

            <Alert severity="info" sx={{ mb: 2, py: 0.5 }}>
              <Typography variant="body2" fontWeight={600}>{t('payment_methods')}:</Typography>
              <Typography variant="body2">bKash: 01XXXXXXXXX (Personal)</Typography>
              <Typography variant="body2">Bank: [Bank Name] - A/C: XXXXXXXXXX</Typography>
            </Alert>

            <TextField
              label={t('payment_reference')}
              placeholder={t('payment_reference_placeholder')}
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => { setSelectedPlan(null); setPaymentNote(''); }}
                sx={{ textTransform: 'none' }}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                disabled={createSubscription.isPending}
                onClick={handleSubscribe}
                startIcon={createSubscription.isPending ? <CircularProgress size={16} /> : <PaidIcon />}
                sx={{ textTransform: 'none', fontWeight: 600 }}
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
