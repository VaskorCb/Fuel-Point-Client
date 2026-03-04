'use client';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import StyledTextField from 'components/styled/StyledTextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { epaSetupDefaultValues, currencyUnitOptions } from 'data/general-settings/combined';

const shopSuppliesSchema = yup.object().shape({
  epaType: yup.string().required('EPA type is required'),
  epaValue: yup.number().required('EPA value is required').positive('Must be positive'),
  epaUnit: yup.string().required('Unit is required'),
  minimum: yup.number().min(0, 'Minimum must be 0 or greater').required('Minimum is required'),
  maximum: yup.number().min(0, 'Maximum must be 0 or greater').required('Maximum is required'),
});

type EPASetupFormValues = yup.InferType<typeof shopSuppliesSchema>;

const EPASetupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EPASetupFormValues>({
    resolver: yupResolver(shopSuppliesSchema),
    defaultValues: epaSetupDefaultValues,
  });

  const onSubmit = (data: EPASetupFormValues) => {
    console.log('Shop Supplies:', data);
  };
  return (
    <form id="fees-and-setup-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" pb={3} sx={{ maxWidth: '584px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Switch id="field-epa-toggle" defaultChecked size="medium" aria-label="Shop Supplies on" />
            <Typography variant="h6">EPA on?</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Stack direction="row" alignItems="center" >
              <Checkbox defaultChecked size="medium" aria-label="On Parts" />
              <Typography variant="body2">On parts</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" >
              <Checkbox size="medium" aria-label="On Labor" />
              <Typography variant="body2">On labor</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ pt: 3 }}>
          <Typography variant="subtitle2" fontWeight={'bold'} fontSize={18} sx={{ mb: 2 }}>EPA type</Typography>
          <FormControl id="field-epa-type">
            <Controller
              name="epaType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="actual" control={<Radio />} label="Actual amount" />
                  <FormControlLabel value="percentage" control={<Radio />} label="Percentage %" />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Box>

        <Box sx={{ pt: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Controller
              name="epaUnit"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  select
                  value={field.value}
                  onChange={field.onChange}
                  size="large"
                  label="EPA"
                  aria-label="EPA"
                  sx={{ minWidth: 90 }}
                  error={!!errors.epaUnit}
                  helperText={errors.epaUnit?.message}
                >
                  {currencyUnitOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </StyledTextField>
              )}
            />
            <StyledTextField
              id="field-epa-value"
              {...register('epaValue', { valueAsNumber: true })}
              size="large"
              type="number"
              aria-label="EPA value"
              fullWidth
              sx={{ minWidth: 120, alignSelf: 'flex-end' }}
              error={!!errors.epaValue}
              helperText={errors.epaValue?.message}
            />
          </Stack>
        </Box>

        <Box sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <StyledTextField
                id="field-epa-minimum"
                {...register('minimum', { valueAsNumber: true })}
                size="large"
                type="number"
                label="Minimum"
                aria-label="Minimum"
                placeholder="0.00"
                fullWidth
                sx={{ minWidth: 120 }}
                error={!!errors.minimum}
                helperText={errors.minimum?.message}
              />
            </Grid>
            <Grid size={6}>
              <StyledTextField
                id="field-epa-maximum"
                {...register('maximum', { valueAsNumber: true })}
                size="large"
                type="number"
                label="Maximum"
                aria-label="Maximum"
                placeholder="0.00"
                fullWidth
                sx={{ minWidth: 120 }}
                error={!!errors.maximum}
                helperText={errors.maximum?.message}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </form>
  );
};

export default EPASetupForm;
