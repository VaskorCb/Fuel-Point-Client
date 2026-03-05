'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useCustomers, useCreateCustomer } from 'services/customers/customers.hooks';
import { Customer, CreateCustomerPayload } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

const initialFormState = {
  name: '',
  phone: '',
  company: '',
  address: '',
  creditLimit: '',
};

const CustomersPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: customersData, isLoading, error } = useCustomers();
  const createCustomer = useCreateCustomer();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const customers: Customer[] = customersData?.data ?? [];

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 1, minWidth: 150 },
    { field: 'phone', headerName: t('phone'), flex: 1, minWidth: 130 },
    {
      field: 'company',
      headerName: t('company'),
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || '-',
    },
    {
      field: '_count',
      headerName: t('vehicles'),
      width: 90,
      type: 'number',
      valueGetter: (_value: unknown, row: Customer) => row._count?.vehicles ?? 0,
    },
    {
      field: 'creditLimit',
      headerName: t('credit_limit'),
      flex: 1,
      minWidth: 120,
      type: 'number',
      renderCell: (params) => `৳${(params.value ?? 0).toLocaleString()}`,
    },
    {
      field: 'currentBalance',
      headerName: t('current_balance'),
      flex: 1,
      minWidth: 140,
      type: 'number',
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: params.value > 0 ? 'error.main' : 'success.main',
            fontWeight: params.value > 0 ? 700 : 400,
          }}
        >
          ৳{(params.value ?? 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: t('status'),
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? t('active') : t('inactive')}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload: CreateCustomerPayload = {
      name: form.name,
      phone: form.phone,
      company: form.company || undefined,
      address: form.address || undefined,
      creditLimit: form.creditLimit ? Number(form.creditLimit) : undefined,
    };
    try {
      await createCustomer.mutateAsync(payload);
      setDialogOpen(false);
      setForm(initialFormState);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('customers')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          {t('add_customer')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{t('failed_load_customers')}</Alert>
          ) : customers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_customers_found')}
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={customers}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              autoHeight
              disableRowSelectionOnClick
              onRowClick={(params) => router.push(`/customers/${params.row.id}`)}
              sx={{ cursor: 'pointer', border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('add_new_customer')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('name')}
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('phone')}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('company')}
                name="company"
                value={form.company}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('credit_limit')}
                name="creditLimit"
                value={form.creditLimit}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('address')}
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t('cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name || !form.phone || createCustomer.isPending}
          >
            {createCustomer.isPending ? t('saving') : t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomersPage;
