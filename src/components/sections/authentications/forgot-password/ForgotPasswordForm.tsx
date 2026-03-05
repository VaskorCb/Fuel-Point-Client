'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useCountdown from 'hooks/useCountdown';
import toast from 'react-hot-toast';
import paths from 'routes/paths';
import { ForgotPasswordFormValues } from 'types/auth-and-onboarding';
import { forgotPasswordSchema } from 'validations/auth-and-onboarding';
import AuthFormLayout from '../common/AuthOnbardFormLayout';

interface ForgotPasswordFormProps {
  handleSendResetLink: ({ email }: { email: string }) => Promise<any>;
}

const ForgotPasswordForm = ({ handleSendResetLink }: ForgotPasswordFormProps) => {
  const router = useRouter();
  const [linkSent, setLinkSent] = useState(false);
  const { time, startTimer } = useCountdown();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const res = await handleSendResetLink({ email: data.email });
      setLinkSent(true);
      if (res?.message) toast.success(res.message);
      startTimer(30, () => setLinkSent(false));
      router.push(`${paths.twoFactorAuth}?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      setError('email', { type: 'manual', message: error.message });
    }
  };

  return (
    <AuthFormLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
        Reset your password
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Enter your email and we&apos;ll send you a verification code to reset your password.
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            size="medium"
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
          <Button
            type="submit"
            loading={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
            disabled={linkSent}
            sx={{
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {linkSent && time > 0 ? `Resend in ${time}s` : 'Send verification code'}
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Remember your password?{' '}
        <Link href={paths.login} fontWeight={600} sx={{ color: 'primary.main' }}>
          Sign in
        </Link>
      </Typography>
    </AuthFormLayout>
  );
};

export default ForgotPasswordForm;
