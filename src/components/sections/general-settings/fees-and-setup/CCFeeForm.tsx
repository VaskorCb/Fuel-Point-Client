'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import StyledTextField from 'components/styled/StyledTextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ccFeeDefaultValues, currencyUnitOptions } from 'data/general-settings/combined';

const shopSuppliesSchema = yup.object().shape({
  inPersonUnit: yup.string().required('EPA type is required'),
  inPersonValue: yup.number().required('EPA value is required').positive('Must be positive'),
  onlineUnit: yup.string().required('Unit is required'),
  onlineValue: yup.number().required('EPA value is required').positive('Must be positive'),

});

type CCFeeFormValues = yup.InferType<typeof shopSuppliesSchema>;

const CCFeeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CCFeeFormValues>({
    resolver: yupResolver(shopSuppliesSchema),
    defaultValues: ccFeeDefaultValues,
  });

  const onSubmit = (data: CCFeeFormValues) => {
    console.log('Shop Supplies:', data);
  };
  return (
    <form id="fees-and-setup-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" pb={3} sx={{ maxWidth: '584px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Switch id="field-cc-fee-toggle" defaultChecked size="medium" aria-label="Shop Supplies on" />
            <Typography variant="h6">Credit card fee setup</Typography>
          </Stack>
        </Box>


        <Box sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Controller
                  name="inPersonUnit"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      select
                      value={field.value}
                      onChange={field.onChange}
                      size="large"
                      label="In person"
                      aria-label="In person"
                      sx={{ minWidth: 90 }}
                      error={!!errors.inPersonUnit}
                      helperText={errors.inPersonUnit?.message}
                    >
                      {currencyUnitOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </StyledTextField>
                  )}
                />
                <StyledTextField
                  id="field-cc-in-person"
                  {...register('inPersonValue', { valueAsNumber: true })}
                  size="large"
                  type="number"
                  aria-label="In person value"
                  fullWidth
                  sx={{ minWidth: 120, alignSelf: 'flex-end' }}
                  error={!!errors.inPersonValue}
                  helperText={errors.inPersonValue?.message}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Controller
                  name="onlineUnit"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      select
                      value={field.value}
                      onChange={field.onChange}
                      size="large"
                      label="Online"
                      aria-label="Online"
                      sx={{ minWidth: 90 }}
                      error={!!errors.onlineUnit}
                      helperText={errors.onlineUnit?.message}
                    >
                      {currencyUnitOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </StyledTextField>
                  )}
                />
                <StyledTextField
                  id="field-cc-online"
                  {...register('onlineValue', { valueAsNumber: true })}
                  size="large"
                  type="number"
                  aria-label="Online value"
                  fullWidth
                  sx={{ minWidth: 120, alignSelf: 'flex-end' }}
                  error={!!errors.onlineValue}
                  helperText={errors.onlineValue?.message}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </form>
  );
};

export default CCFeeForm;
