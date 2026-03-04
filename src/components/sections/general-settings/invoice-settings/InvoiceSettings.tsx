'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StyledTextField from 'components/styled/StyledTextField';
import InvoiceToggleRow from './InvoiceToggleRow';
import InvoiceMemoSection from './InvoiceMemoSection';
import {
  invoiceSettingsSwitches,
  invoiceSettingsDefaultValues,
  invoiceSettingsSections,
  typeDefaultOptions,
  invoiceTitleFontOptions
} from 'data/general-settings/combined';

const invoiceSettingsSchema = yup.object().shape({
  // Estimate & Invoice section
  applyPaymentAfterConversion: yup.boolean().required(),
  showBarcode: yup.boolean().required(),
  printQrWithVin: yup.boolean().required(),
  useVendorsListPrice: yup.boolean().required(),
  show1stSignature: yup.boolean().required(),
  eCustomerSignature: yup.boolean().required(),
  showLaborHours: yup.boolean().required(),
  saveEstimateBeforeInvoice: yup.boolean().required(),
  laborGuideAutoFill: yup.boolean().required(),

  // Print & Display section
  addPartNumberToDescription: yup.boolean().required(),
  addCustomPartNumberToDescription: yup.boolean().required(),
  showLogo: yup.boolean().required(),
  printEachMechanic: yup.boolean().required(),
  printAuthorization: yup.boolean().required(),
  printJobsWithSubtotal: yup.boolean().required(),
  printSubtotalOnly: yup.boolean().required(),
  alwaysExpandEstimateListview: yup.boolean().required(),

  // Automation & System section
  autoCompleteTiresInventory: yup.boolean().required(),
  autoCompleteGeneralInventory: yup.boolean().required(),
  autoFillWarrantyOnClick: yup.boolean().required(),
  autoFillWarrantyOnCreate: yup.boolean().required(),
  forwardNotificationsToGmail: yup.boolean().required(),
  enforceMileageBeforePayment: yup.boolean().required(),
  showThankYou: yup.boolean().required(),
  tabletMode: yup.boolean().required(),

  // Other fields
  typeDefault: yup.string().required('Type default is required'),
  invoiceTitleFont: yup.string().required('Invoice title font is required'),
  partsMemo: yup.string().required(),
  thankYouMemo: yup.string().required(),
});

type InvoiceSettingsFormValues = yup.InferType<typeof invoiceSettingsSchema>;

type SwitchSetting = {
  name: keyof InvoiceSettingsFormValues;
  label: string;
  section: string;
  id: string;
};

export const switchSettings: SwitchSetting[] = invoiceSettingsSwitches as SwitchSetting[];


const InvoiceSettings = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceSettingsFormValues>({
    resolver: yupResolver(invoiceSettingsSchema),
    defaultValues: invoiceSettingsDefaultValues,
  });

  const onSubmit = (data: InvoiceSettingsFormValues) => {
    console.log('Invoice Settings:', data);
  };

  const handleAutoCompleteLabor = () => {
    setValue('thankYouMemo', 'Thank you for your business! We appreciate your trust and look forward to serving you again.');
  };

  return (
    <form id="invoice-settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mx: 3 }}>
        <Stack direction="column" gap={3} py={5} sx={{ maxWidth: '584px', mx: 'auto' }}>
          {/* Toggle Switches Section */}
          <Stack direction="column" gap={3} sx={{ width: '100%', }}>
            {invoiceSettingsSections.map((section) => (
              <Box key={section} sx={{ border: '1px solid', borderColor: 'divider', py: 1, px: 3, borderRadius: 2 }}>

                {switchSettings
                  .filter((input) => input.section === section)
                  .map((input, index, filteredArray) => (
                    <Controller
                      key={input.name}
                      name={input.name}
                      control={control}
                      render={({ field }) => (
                        <InvoiceToggleRow
                          id={input.id}
                          label={input.label}
                          checked={!!field.value}
                          onChange={field.onChange}
                          showBorder={index < filteredArray.length - 1}
                        />
                      )}
                    />
                  ))}
              </Box>
            ))}
          </Stack>
          <Stack direction="column" gap={2.5} sx={{ width: '100%', border: '1px solid', borderColor: 'divider', p: 3, borderRadius: 2 }}>
            {/* Dropdowns Section */}
            <Box sx={{ width: '100%', }}>
              <Stack direction="column" spacing={2.5}>
                <Controller
                  name="typeDefault"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      id="field-type-default"
                      select
                      value={field.value}
                      onChange={field.onChange}
                      size="large"
                      fullWidth
                      label="Type default"
                      aria-label="Type default"
                      error={!!errors.typeDefault}
                      helperText={errors.typeDefault?.message}
                    >
                      {typeDefaultOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </StyledTextField>
                  )}
                />
                <Controller
                  name="invoiceTitleFont"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      id="field-invoice-title-font"
                      select
                      value={field.value}
                      onChange={field.onChange}
                      size="large"
                      fullWidth
                      label="Invoice title font"
                      aria-label="Invoice title font"
                      error={!!errors.invoiceTitleFont}
                      helperText={errors.invoiceTitleFont?.message}
                    >
                      {invoiceTitleFontOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                      ))}
                    </StyledTextField>
                  )}
                />
                <Button
                  size='small'
                  variant="text"
                  onClick={handleAutoCompleteLabor}
                  sx={{ alignSelf: 'flex-end' }}
                >
                  + Auto complete labor
                </Button>
              </Stack>
            </Box>

            {/* Memo Sections */}
            <Controller
              name="partsMemo"
              control={control}
              render={({ field }) => (
                <InvoiceMemoSection
                  id="field-parts-memo"
                  title="Parts memo"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="thankYouMemo"
              control={control}
              render={({ field }) => (
                <InvoiceMemoSection
                  id="field-thank-you-memo"
                  title="Thank you memo"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>

        </Stack>
      </Box>
    </form>
  );
};

export default InvoiceSettings;