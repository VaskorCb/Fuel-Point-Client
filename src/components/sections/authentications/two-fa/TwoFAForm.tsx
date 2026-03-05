'use client';

import { ChangeEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography, Button, FormControlLabel, Checkbox, Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import useCountdown from 'hooks/useCountdown';
import toast from 'react-hot-toast';
import paths from 'routes/paths';
import StyledTextField from 'components/styled/StyledTextField';
import AuthFormLayout from '../common/AuthOnbardFormLayout';

interface TwoFAFormProps {
  handleVerifyOtp: (data: { email: string; otp: string }) => Promise<any>;
  handleResendOtp?: (data: { email: string }) => Promise<any>;
}

const totalInputLength = 6;

const TwoFAForm = ({ handleVerifyOtp, handleResendOtp }: TwoFAFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const { time, startTimer } = useCountdown();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    if (value) {
      [...value].slice(0, totalInputLength).forEach((char, charIndex) => {
        if (inputRefs.current && inputRefs.current[index + charIndex]) {
          inputRefs.current[index + charIndex]!.value = char;
          inputRefs.current[index + charIndex + 1]?.focus();
        }
      });
      const updatedOtp = inputRefs.current.reduce((acc, input) => acc + (input?.value || ''), '');
      setOtp(updatedOtp);
      setError('');
    }
  };

  const handleKeydown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Backspace') {
      inputRefs.current[index]!.value = '';
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();

      const updatedOtp = inputRefs.current.reduce((acc, input) => acc + (input?.value || ''), '');
      setOtp(updatedOtp);
    }
    if (event.key === 'ArrowLeft') {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    }
    if (event.key === 'ArrowRight') {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const resendOtp = async (showToast = true) => {
    setOtpSent(true);
    startTimer(30, () => {
      setOtpSent(false);
    });

    if (handleResendOtp && email) {
      try {
        const res = await handleResendOtp({ email });
        if (showToast && res?.message) {
          toast.success(res.message);
        }
      } catch {
        // Silently handle resend failure
      }
    }
  };

  const onSubmit = async () => {
    if (otp.length < totalInputLength) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await handleVerifyOtp({ email, otp });
      if (res?.message) {
        toast.success(res.message);
      }
      router.push(
        `${paths.setPassword}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(otp)}`,
      );
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    resendOtp(false);
  }, []);

  const maskedEmail = email
    ? `${email.slice(0, 2)}${'*'.repeat(Math.max(email.indexOf('@') - 2, 0))}${email.slice(email.indexOf('@'))}`
    : '';

  return (
    <AuthFormLayout>
      <Grid
        container
        size={12}
        sx={{
          mx: 'auto',
          maxWidth: '480px',
          width: 1,
          rowGap: 4,
        }}
      >
        <Grid size={12}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
            Verify your email
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center', lineHeight: 1.6 }}>
            A 6-digit verification code has been sent to{' '}
            <Typography
              component="span"
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 500,
              }}
            >
              {maskedEmail}
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'medium',
            }}
          >
            Didn&apos;t receive the code?{' '}
            <Link
              variant="caption"
              component="button"
              underline={otpSent ? 'none' : 'always'}
              disabled={otpSent}
              onClick={() => resendOtp()}
              sx={{
                fontWeight: 'medium',
                ml: 0.5,
              }}
            >
              Send again {otpSent && <>in {dayjs(time * 1000).format('m:ss')} s</>}
            </Link>
          </Typography>
        </Grid>

        <Grid size={12}>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container>
              <Grid sx={{ mb: 3 }} size={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 0.75, sm: 2 },
                    width: '100%',
                  }}
                >
                  {Array(totalInputLength)
                    .fill('')
                    .map((_, index) => (
                      <Fragment key={index}>
                        <StyledTextField
                          inputRef={(el: HTMLInputElement) => {
                            inputRefs.current[index] = el;
                          }}
                          type="number"
                          disabledSpinButton
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                            },
                          }}
                          slotProps={{
                            input: {
                              sx: {
                                '& .MuiInputBase-input': {
                                  textAlign: 'center',
                                  px: { xs: '4px !important', sm: '12px !important' },
                                },
                              },
                            },
                          }}
                          onClick={() => inputRefs.current[index]?.select()}
                          onFocus={() => inputRefs.current[index]?.select()}
                          onKeyUp={(e) => handleKeydown(e, index)}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                          size="medium"
                        />
                        {index === totalInputLength / 2 - 1 && (
                          <Typography sx={{ lineHeight: '32px', flexShrink: 0 }}>-</Typography>
                        )}
                      </Fragment>
                    ))}
                </Box>
              </Grid>
              <Grid sx={{ mb: 3 }} size={12}>
                <FormControlLabel
                  control={<Checkbox name="checked" size="small" />}
                  label={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      Remember this device
                    </Typography>
                  }
                />
              </Grid>
              <Grid sx={{ mb: 3 }} size={12}>
                <Button
                  fullWidth
                  color="primary"
                  size="medium"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={otp.length < totalInputLength}
                >
                  Verify
                </Button>
              </Grid>
              {/* <Grid sx={{ textAlign: 'center' }} size={12}>
              <Link href="#!" variant="subtitle2">
                Try alternate methods
              </Link>
            </Grid> */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </AuthFormLayout>
  );
};

export default TwoFAForm;
