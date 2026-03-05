import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import toast from 'react-hot-toast';
import paths from 'routes/paths';
import { SetPasswordFormValues } from 'types/auth-and-onboarding';
import * as yup from 'yup';
import PasswordTextField from 'components/common/PasswordTextField';
import AuthFormLayout from '../common/AuthOnbardFormLayout';

interface SetPasswordFormProps {
  handleSetPassword: (data: SetPasswordFormValues) => Promise<any>;
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required('This field is required'),
    token: yup.string().required('This field is required'),
    password: yup
      .string()
      .required('This field is required')
      .min(8, 'Password must be at least 8 characters long'),
    password_confirmation: yup
      .string()
      .required('Confirm password field is required.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  })
  .required();

const SetPasswordForm = ({ handleSetPassword }: SetPasswordFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const token = searchParams.get('token');
  const email = searchParams.get('email');


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: email || '', token: token || '' },
  });

  const onSubmit = async (data: SetPasswordFormValues) => {
    try {
      const res = await handleSetPassword(data);
      toast.success(res.message);
      router.push(paths.login);
    } catch (error: any) {
      setError('root', { type: 'manual', message: error.message });
    }
  };

  return (
    <AuthFormLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
        Set new password
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 5, textAlign: 'center', lineHeight: 1.6 }}
      >
        Create a new password for your account. It must be at least 8 characters.
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.root.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          <PasswordTextField
            fullWidth
            size="medium"
            id="password"
            label="Password"
            variant="outlined"
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
          <PasswordTextField
            fullWidth
            size="medium"
            id="password_confirmation"
            label="Confirm password"
            variant="outlined"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
            {...register('password_confirmation')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              },
            }}
          />
        </Box>

        <Button
          loading={isSubmitting}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{
            py: 1.75,
            fontWeight: 700,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Set new password
        </Button>
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

export default SetPasswordForm;
