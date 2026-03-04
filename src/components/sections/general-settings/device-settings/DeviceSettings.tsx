'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DeviceToggleRow from './DeviceToggleRow';
import { deviceSettingsDefaultValues } from 'data/general-settings/combined';

const deviceSettingsSchema = yup.object().shape({
  receiveData: yup.boolean().required(),
  tabletPairUnpair: yup.boolean().required(),
  cashDrawer: yup.boolean().required(),
});

type DeviceSettingsFormValues = yup.InferType<typeof deviceSettingsSchema>;

const DeviceSettings = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeviceSettingsFormValues>({
    resolver: yupResolver(deviceSettingsSchema),
    defaultValues: deviceSettingsDefaultValues,
  });

  const onSubmit = (data: DeviceSettingsFormValues) => {
    console.log('Device Settings:', data);
  };

  const handlePrintPreview = () => {
    console.log('Print preview clicked');
  };

  const handleOpenDrawer = () => {
    console.log('Open drawer clicked');
  };

  return (
    <form id="device-settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mx: 3 }}>
        <Stack direction="column" sx={{ maxWidth: '584px', py: 3, mx: 'auto' }}>
          <Box sx={{ width: '100%' }}>
            <Controller
              name="receiveData"
              control={control}
              render={({ field }) => (
                <DeviceToggleRow
                  id="field-receive-data"
                  label="Receive data"
                  checked={field.value}
                  onChange={field.onChange}
                  showBorder={true}
                />
              )}
            />
            <Controller
              name="tabletPairUnpair"
              control={control}
              render={({ field }) => (
                <DeviceToggleRow
                  id="field-tablet-pair-unpair"
                  label="Tablet (Pair/Unpair)"
                  linkText="Print preview"
                  onLinkClick={handlePrintPreview}
                  checked={field.value}
                  onChange={field.onChange}
                  showBorder={true}
                />
              )}
            />
            <Controller
              name="cashDrawer"
              control={control}
              render={({ field }) => (
                <DeviceToggleRow
                  id="field-cash-drawer"
                  label="Cash Drawer"
                  linkText="Open drawer"
                  onLinkClick={handleOpenDrawer}
                  checked={field.value}
                  onChange={field.onChange}
                  showBorder={false}
                />
              )}
            />
          </Box>
        </Stack>
      </Box>
    </form>
  );
};

export default DeviceSettings;