'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UseMutationResult } from '@tanstack/react-query';
import paths from 'routes/paths';
import { signupSchema } from 'validations/auth-and-onboarding';
import { ApiError, SignupFormValues, SignupResponseData } from 'types/auth-and-onboarding';
import PasswordTextField from 'components/common/PasswordTextField';
import AuthFormLayout from '../common/AuthOnbardFormLayout';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface SignupFormProps {
  signupMutation: UseMutationResult<SignupResponseData, ApiError, SignupFormValues>;
}

const SignupForm = ({ signupMutation }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const { mutate, isPending } = signupMutation;
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Account created! Let\'s set up your station.');
        router.push('/onboarding');
      },
      onError: (err) => {
        const msg = err.data.message;
        toast.error(Array.isArray(msg) ? msg[0] : (msg || 'Signup failed'));
      },
    });
  };

  return (
    <AuthFormLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
        Create your account
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Start managing your fuel station in minutes
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            size="medium"
            id="name"
            type="text"
            label="Full name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
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
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
          <PasswordTextField
            fullWidth
            size="medium"
            id="password"
            label="Password"
            variant="outlined"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            loading={isPending}
            sx={{
              py: 1.75,
              mt: 1,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Create account
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Already have an account?{' '}
        <Link href={paths.login} fontWeight={600} sx={{ color: 'primary.main' }}>
          Sign in
        </Link>
      </Typography>
    </AuthFormLayout>
  );
};

export default SignupForm;
