'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import StyledTextField from 'components/styled/StyledTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  shopInformationSchema,
} from 'validations/general-settings';
import { ShopInformationFormValues } from 'types/general-settings';
import { shopInformationData } from 'data/general-settings/combined';
import ShopInformationSkeleton from './ShopInformationSkeleton';

// In your component
const ShopInformation = () => {
  const isLoading = false; // Replace with your actual loading state
  if (isLoading) {
    return <ShopInformationSkeleton />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopInformationFormValues>({
    resolver: yupResolver(shopInformationSchema),
    defaultValues: shopInformationData,
  });

  const onSubmit = (data: ShopInformationFormValues) => {
    console.log('Shop Information:', data);
  };

  return (
    <Box sx={{ mx: 3 }}>
      <Box sx={{ maxWidth: 584, mx: 'auto', py: 4 }}>
        <Box component="form" id="shop-information-form" noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Contact Information */}
          <Grid container spacing={3}>
            <Grid size={12}>
              <StyledTextField
                id="field-company-name"
                fullWidth
                size='large'
                label="Company name"
                {...register('companyName')}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-phone-main"
                fullWidth
                size='large'
                label="Phone (Main)"
                type="tel"
                {...register('phoneMain')}
                error={!!errors.phoneMain}
                helperText={errors.phoneMain?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-phone-l2"
                fullWidth
                size='large'
                label="Phone (L 2)"
                type="tel"
                {...register('phoneL2')}
                error={!!errors.phoneL2}
                helperText={errors.phoneL2?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-email"
                fullWidth
                size='large'
                label="Email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
          </Grid>

          {/* Address */}
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid size={12}>
              <StyledTextField
                id="field-street"
                fullWidth
                size='large'
                label="Street"
                {...register('street')}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-city"
                fullWidth
                size='large'
                label="City"
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-state"
                fullWidth
                size='large'
                label="State"
                {...register('state')}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-zip-code"
                fullWidth
                size='large'
                label="Zip code"
                {...register('zipCode')}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>
          </Grid>

          {/* Additional Contact */}
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid size={12}>
              <StyledTextField
                id="field-fax"
                fullWidth
                size='large'
                label="Fax"
                type="tel"
                {...register('fax')}
                error={!!errors.fax}
                helperText={errors.fax?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-web"
                fullWidth
                size='large'
                label="Web"
                {...register('web')}
                error={!!errors.web}
                helperText={errors.web?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-contact-name"
                fullWidth
                size='large'
                label="Contact Name (Manager)"
                {...register('contactName')}
                error={!!errors.contactName}
                helperText={errors.contactName?.message}
              />
            </Grid>
          </Grid>

          {/* Regulatory Section */}
          <Divider sx={{ my: 5 }} />

          <Grid container spacing={3}>
            <Grid size={12}>
              <StyledTextField
                id="field-state-reg-no"
                fullWidth
                size='large'
                label="STATE REG. NO."
                {...register('stateRegNo')}
                error={!!errors.stateRegNo}
                helperText={errors.stateRegNo?.message}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextField
                id="field-epa-no"
                fullWidth
                size='large'
                label="EPA NO."
                {...register('epaNo')}
                error={!!errors.epaNo}
                helperText={errors.epaNo?.message}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopInformation;
