'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { useBankDeposits, useCreateBankDeposit } from 'services/bank-deposits/bank-deposits.hooks';
import { BankDeposit, CreateBankDepositPayload } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

const initialFormState = {
  bankName: '',
  accountNumber: '',
  amount: '',
  depositDate: new Date().toISOString().split('T')[0],
  reference: '',
  notes: '',
};

const BankDepositsPage = () => {
  const { t } = useTranslation();
  const { data: depositsData, isLoading, error } = useBankDeposits({});
  const createDeposit = useCreateBankDeposit();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const deposits: BankDeposit[] = depositsData?.data ?? [];

  const columns: GridColDef[] = [
    {
      field: 'depositDate',
      headerName: t('deposit_date'),
      flex: 1,
      minWidth: 130,
      renderCell: (params) => new Date(params.value).toLocaleDateString('en-GB'),
    },
    { field: 'bankName', headerName: t('bank_name'), flex: 1, minWidth: 150 },
    {
      field: 'accountNumber',
      headerName: t('account_no'),
      flex: 1,
      minWidth: 140,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1,
      minWidth: 120,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ৳{(params.value ?? 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'reference',
      headerName: t('reference'),
      flex: 1,
      minWidth: 130,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'notes',
      headerName: t('notes'),
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || '-',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload: CreateBankDepositPayload = {
      bankName: form.bankName,
      accountNumber: form.accountNumber || undefined,
      amount: Number(form.amount),
      depositDate: form.depositDate,
      reference: form.reference || undefined,
      notes: form.notes || undefined,
    };
    try {
      await createDeposit.mutateAsync(payload);
      setDialogOpen(false);
      setForm(initialFormState);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('bank_deposits')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          {t('add_deposit')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{t('failed_load_deposits')}</Alert>
          ) : deposits.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_deposits_found')}
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={deposits}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              autoHeight
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* Add Bank Deposit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('add_bank_deposit')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('bank_name')}
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('account_number')}
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('amount_currency')}
                name="amount"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('deposit_date')}
                name="depositDate"
                value={form.depositDate}
                onChange={handleChange}
                fullWidth
                type="date"
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('reference')}
                name="reference"
                value={form.reference}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('notes')}
                name="notes"
                value={form.notes}
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
            disabled={!form.bankName || !form.amount || createDeposit.isPending}
          >
            {createDeposit.isPending ? t('saving') : t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BankDepositsPage;
