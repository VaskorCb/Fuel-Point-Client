'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSales } from 'services/sales/sales.hooks';
import { useFuelTypes } from 'services/fuel-types/fuel-types.hooks';
import Link from 'next/link';
import paths from 'routes/paths';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

const SalesPage = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [fuelTypeFilter, setFuelTypeFilter] = useState<number | ''>('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');

  const { data: fuelTypesData } = useFuelTypes();

  const { data: salesData, isLoading } = useSales({
    date: selectedDate?.format('YYYY-MM-DD'),
    fuelTypeId: fuelTypeFilter || undefined,
  });

  const paymentMethods = useMemo(() => [
    { value: '', label: t('all') },
    { value: 'CASH', label: t('cash') },
    { value: 'BKASH', label: t('bkash') },
    { value: 'NAGAD', label: t('nagad') },
    { value: 'CREDIT', label: t('credit') },
  ], [t]);

  const filteredRows = useMemo(() => {
    let rows = salesData?.data ?? [];
    if (paymentMethodFilter) {
      rows = rows.filter((s) => s.paymentMethod === paymentMethodFilter);
    }
    return rows;
  }, [salesData?.data, paymentMethodFilter]);

  const columns: GridColDef[] = [
    {
      field: 'saleDate',
      headerName: t('date'),
      width: 120,
      valueFormatter: (value: string) => (value ? dayjs(value).format('DD/MM/YYYY') : ''),
    },
    {
      field: 'fuelType',
      headerName: t('fuel_type'),
      width: 130,
      valueGetter: (_value: unknown, row: { fuelType?: { name?: string } }) =>
        row.fuelType?.name ?? '',
    },
    {
      field: 'quantity',
      headerName: t('quantity_l'),
      width: 120,
      type: 'number',
    },
    {
      field: 'unitPrice',
      headerName: t('unit_price'),
      width: 120,
      type: 'number',
      valueFormatter: (value: number) => `৳${value?.toLocaleString() ?? '0'}`,
    },
    {
      field: 'totalAmount',
      headerName: t('total_amount'),
      width: 140,
      type: 'number',
      valueFormatter: (value: number) => `৳${value?.toLocaleString() ?? '0'}`,
    },
    {
      field: 'paymentMethod',
      headerName: t('payment'),
      width: 110,
    },
    {
      field: 'employee',
      headerName: t('employee'),
      width: 140,
      valueGetter: (_value: unknown, row: { employee?: { name?: string } }) =>
        row.employee?.name ?? '',
    },
    {
      field: 'customer',
      headerName: t('customer'),
      width: 140,
      valueGetter: (_value: unknown, row: { customer?: { name?: string } }) =>
        row.customer?.name ?? '-',
    },
    {
      field: 'vehicleNumber',
      headerName: t('vehicle'),
      width: 120,
      valueGetter: (_value: unknown, row: { vehicleNumber?: string }) =>
        row.vehicleNumber || '-',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('sales')}</Typography>
        <Button variant="contained" component={Link} href={paths.sales_new}>
          {t('new_sale')}
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
            <DatePicker
              label={t('date')}
              value={selectedDate}
              onChange={(val) => setSelectedDate(val ? dayjs(val as dayjs.Dayjs | Date) : null)}
              slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
            />
            <TextField
              select
              label={t('fuel_type')}
              value={fuelTypeFilter}
              onChange={(e) =>
                setFuelTypeFilter(e.target.value === '' ? '' : Number(e.target.value))
              }
              size="small"
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="">{t('all')}</MenuItem>
              {fuelTypesData?.data?.map((ft) => (
                <MenuItem key={ft.id} value={ft.id}>
                  {ft.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label={t('payment_method')}
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 160 }}
            >
              {paymentMethods.map((pm) => (
                <MenuItem key={pm.value} value={pm.value}>
                  {pm.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredRows.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_sales_found')}
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesPage;
