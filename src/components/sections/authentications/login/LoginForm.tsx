'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UseMutationResult } from '@tanstack/react-query';
import { ApiError, LoginFormValues, LoginResponseData } from 'types/auth-and-onboarding';
import { loginSchema } from 'validations/auth-and-onboarding';
import PasswordTextField from 'components/common/PasswordTextField';
import AuthFormLayout from '../common/AuthOnbardFormLayout';
import toast from 'react-hot-toast';

interface LoginFormProps {
  loginMutation: UseMutationResult<LoginResponseData, ApiError, LoginFormValues>;
  signUpLink: string;
  forgotPasswordLink?: string;
  rememberDevice?: boolean;
  defaultCredential?: { email: string; password: string };
}

const LoginForm = ({
  loginMutation,
  signUpLink,
  forgotPasswordLink,
}: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success('Welcome back!');
        const user = response.data?.user;
        if (user?.role === 'PLATFORM_OWNER') {
          router.push('/platform-admin');
        } else if (user && !user.onboardingDone) {
          router.push('/onboarding');
        } else {
          router.push(callbackUrl || '/dashboard');
        }
      },
      onError: (err) => {
        const msg = err.data.message;
        toast.error(Array.isArray(msg) ? msg[0] : (msg || 'Login failed'));
      },
    });
  };

  return (
    <AuthFormLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
        Welcome back
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Sign in to manage your fuel station
      </Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            size="medium"
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme: any) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
          <Box>
            <PasswordTextField
              fullWidth
              size="medium"
              id="password"
              label="Password"
              variant="outlined"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: (theme: any) =>
                    theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                },
              }}
            />
            {forgotPasswordLink && (
              <Link
                href={forgotPasswordLink}
                variant="body2"
                sx={{
                  display: 'block',
                  mt: 1.5,
                  textAlign: 'right',
                  fontWeight: 600,
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Link>
            )}
          </Box>
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            loading={loginMutation.isPending}
            sx={{
              py: 1.75,
              mt: 1,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Don&apos;t have an account?{' '}
        <Link href={signUpLink} fontWeight={600} sx={{ color: 'primary.main' }}>
          Sign up
        </Link>
      </Typography>
    </AuthFormLayout>
  );
};

export default LoginForm;
