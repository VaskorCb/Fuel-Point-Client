'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';
import { DirectionsCar, CheckCircle, PersonAdd } from '@mui/icons-material';
import { useCreateSale } from 'services/sales/sales.hooks';
import { useFuelTypes } from 'services/fuel-types/fuel-types.hooks';
import { useCustomers } from 'services/customers/customers.hooks';
import { useActiveShifts } from 'services/shifts/shifts.hooks';
import { useSearchVehicle } from 'services/vehicles/vehicles.hooks';
import { useRouter } from 'next/navigation';
import paths from 'routes/paths';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { CreateSalePayload, VEHICLE_TYPE_LABELS, VehicleType } from 'types/petrol-pump';

const vehicleTypeOptions: { value: VehicleType; label: string }[] = Object.entries(
  VEHICLE_TYPE_LABELS,
).map(([value, label]) => ({ value: value as VehicleType, label }));

interface SaleFormValues {
  vehicleNumber: string;
  fuelTypeId: number | '';
  quantity: number | '';
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  paymentRef: string;
  customerId: number | '';
  notes: string;
  shiftId: number | '';
  newCustomerName: string;
  newCustomerPhone: string;
  newVehicleType: VehicleType;
}

const NewSalePage = () => {
  const router = useRouter();

  const { data: fuelTypesData } = useFuelTypes();
  const { data: customersData } = useCustomers();
  const { data: activeShiftsData } = useActiveShifts();
  const createSale = useCreateSale();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SaleFormValues>({
    defaultValues: {
      vehicleNumber: '',
      fuelTypeId: '',
      quantity: '',
      unitPrice: 0,
      totalAmount: 0,
      paymentMethod: 'CASH',
      paymentRef: '',
      customerId: '',
      notes: '',
      shiftId: '',
      newCustomerName: '',
      newCustomerPhone: '',
      newVehicleType: 'CAR',
    },
  });

  const vehicleNumber = useWatch({ control, name: 'vehicleNumber' });
  const fuelTypeId = useWatch({ control, name: 'fuelTypeId' });
  const quantity = useWatch({ control, name: 'quantity' });
  const unitPrice = useWatch({ control, name: 'unitPrice' });
  const paymentMethod = useWatch({ control, name: 'paymentMethod' });

  const [debouncedVehicle, setDebouncedVehicle] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVehicle(vehicleNumber.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [vehicleNumber]);

  const { data: vehicleResult, isLoading: vehicleSearching } =
    useSearchVehicle(debouncedVehicle);

  const foundVehicle = vehicleResult?.data ?? null;
  const vehicleSearched = debouncedVehicle.length >= 3 && !vehicleSearching;
  const isNewVehicle = vehicleSearched && !foundVehicle;
  const isExistingVehicle = vehicleSearched && !!foundVehicle;

  useEffect(() => {
    if (isExistingVehicle && foundVehicle?.customer) {
      setValue('customerId', foundVehicle.customer.id);
      setValue('newCustomerName', '');
      setValue('newCustomerPhone', '');
    } else if (isNewVehicle) {
      setValue('customerId', '');
    }
  }, [isExistingVehicle, isNewVehicle, foundVehicle, setValue]);

  useEffect(() => {
    if (fuelTypeId) {
      const ft = fuelTypesData?.data?.find((f) => f.id === fuelTypeId);
      if (ft) setValue('unitPrice', Number(ft.currentPrice ?? 0));
    }
  }, [fuelTypeId, fuelTypesData?.data, setValue]);

  useEffect(() => {
    const q = Number(quantity) || 0;
    const p = Number(unitPrice) || 0;
    setValue('totalAmount', parseFloat((q * p).toFixed(2)));
  }, [quantity, unitPrice, setValue]);

  useEffect(() => {
    if (activeShiftsData?.data?.length === 1) {
      setValue('shiftId', activeShiftsData.data[0].id);
    }
  }, [activeShiftsData?.data, setValue]);

  const onSubmit = (formData: SaleFormValues) => {
    if (!formData.fuelTypeId || !formData.shiftId) return;

    const activeShift = activeShiftsData?.data?.find((s) => s.id === formData.shiftId);

    const payload: CreateSalePayload = {
      shiftId: formData.shiftId as number,
      employeeId: activeShift?.employeeId ?? 0,
      fuelTypeId: formData.fuelTypeId as number,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice ?? 0),
      totalAmount: Number(formData.totalAmount ?? 0),
      paymentMethod: formData.paymentMethod,
      paymentRef: formData.paymentRef || undefined,
      isCredit: formData.paymentMethod === 'CREDIT',
      vehicleNumber: formData.vehicleNumber.trim() || undefined,
      notes: formData.notes || undefined,
    };

    if (isExistingVehicle && foundVehicle) {
      payload.vehicleId = foundVehicle.id;
      payload.customerId = foundVehicle.customer?.id;
    } else if (isNewVehicle && formData.newCustomerName) {
      payload.newCustomerName = formData.newCustomerName;
      payload.newCustomerPhone = formData.newCustomerPhone || undefined;
      payload.newVehicleType = formData.newVehicleType;
    } else if (formData.paymentMethod === 'CREDIT' && formData.customerId) {
      payload.customerId = formData.customerId as number;
    }

    createSale.mutate(payload, {
      onSuccess: () => {
        router.push(paths.sales);
      },
    });
  };

  const isDigitalPayment = paymentMethod === 'BKASH' || paymentMethod === 'NAGAD';
  const isCredit = paymentMethod === 'CREDIT';

  const needsManualCustomer = useMemo(
    () => isCredit && !isExistingVehicle && !isNewVehicle,
    [isCredit, isExistingVehicle, isNewVehicle],
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        New Sale
      </Typography>

      {createSale.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to create sale. Please try again.
        </Alert>
      )}

      {!activeShiftsData?.data?.length && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No active shift found. Please start a shift before recording sales.
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsCar /> Vehicle Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="vehicleNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Vehicle Number"
                    placeholder="e.g., DHA-KA-12-3456"
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: vehicleSearching ? (
                          <InputAdornment position="end">
                            <CircularProgress size={20} />
                          </InputAdornment>
                        ) : null,
                      },
                    }}
                    helperText="Enter the vehicle number plate to auto-find customer"
                  />
                )}
              />
            </Grid>

            {isExistingVehicle && foundVehicle?.customer && (
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Alert
                  severity="success"
                  icon={<CheckCircle />}
                  sx={{ width: '100%' }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {foundVehicle.customer.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {foundVehicle.customer.phone}
                    {foundVehicle.customer.company ? ` | ${foundVehicle.customer.company}` : ''}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={VEHICLE_TYPE_LABELS[foundVehicle.vehicleType as VehicleType] ?? foundVehicle.vehicleType}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </Alert>
              </Grid>
            )}

            {isNewVehicle && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Alert severity="info" icon={<PersonAdd />}>
                    Vehicle not found. Enter customer details to create a new record.
                  </Alert>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="newCustomerName"
                    control={control}
                    rules={{ required: isNewVehicle ? 'Customer name is required' : false }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Customer Name"
                        fullWidth
                        required
                        error={!!errors.newCustomerName}
                        helperText={errors.newCustomerName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="newCustomerPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Customer Phone (Optional)" fullWidth />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name="newVehicleType"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Vehicle Type" select fullWidth>
                        {vehicleTypeOptions.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="shiftId"
                  control={control}
                  rules={{ required: 'Shift is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Active Shift"
                      fullWidth
                      error={!!errors.shiftId}
                      helperText={errors.shiftId?.message}
                    >
                      {activeShiftsData?.data?.map((shift) => (
                        <MenuItem key={shift.id} value={shift.id}>
                          {shift.employee?.name} - {shift.shiftType}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="fuelTypeId"
                  control={control}
                  rules={{ required: 'Fuel type is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Fuel Type"
                      fullWidth
                      error={!!errors.fuelTypeId}
                      helperText={errors.fuelTypeId?.message}
                    >
                      {fuelTypesData?.data?.map((ft) => (
                        <MenuItem key={ft.id} value={ft.id}>
                          {ft.name} - ৳{ft.currentPrice}/{ft.unit}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: 'Quantity is required',
                    min: { value: 0.01, message: 'Quantity must be greater than 0' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantity (Liters)"
                      type="number"
                      fullWidth
                      inputProps={{ step: '0.01', min: '0' }}
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="unitPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Unit Price (৳)"
                      type="number"
                      fullWidth
                      inputProps={{ step: '0.01', readOnly: true }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="totalAmount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Total Amount (৳)"
                      type="number"
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl>
                  <FormLabel>Payment Method</FormLabel>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
                        <FormControlLabel value="BKASH" control={<Radio />} label="bKash" />
                        <FormControlLabel value="NAGAD" control={<Radio />} label="Nagad" />
                        <FormControlLabel value="CREDIT" control={<Radio />} label="Credit (Baki)" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {isDigitalPayment && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="paymentRef"
                    control={control}
                    rules={{ required: isDigitalPayment ? 'Payment reference is required' : false }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Payment Reference / TxID"
                        fullWidth
                        error={!!errors.paymentRef}
                        helperText={errors.paymentRef?.message}
                      />
                    )}
                  />
                </Grid>
              )}

              {needsManualCustomer && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="customerId"
                    control={control}
                    rules={{ required: needsManualCustomer ? 'Customer is required for credit sales' : false }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Customer"
                        fullWidth
                        error={!!errors.customerId}
                        helperText={errors.customerId?.message}
                      >
                        {customersData?.data?.map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                            {c.name} - {c.phone}
                            {c.company ? ` (${c.company})` : ''}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              )}

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Notes (Optional)" fullWidth multiline rows={2} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={createSale.isPending || !activeShiftsData?.data?.length}
                    startIcon={createSale.isPending ? <CircularProgress size={20} /> : null}
                  >
                    {createSale.isPending ? 'Saving...' : 'Record Sale'}
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => router.push(paths.sales)}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewSalePage;
