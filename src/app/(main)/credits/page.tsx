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
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  useOutstandingCredits,
  useCreditSummary,
  useCreateCreditPayment,
} from 'services/credits/credits.hooks';
import { Customer, CreateCreditPaymentPayload } from 'types/petrol-pump';

const paymentMethods = ['CASH', 'BKASH', 'NAGAD'];

const CreditsPage = () => {
  const { data: outstandingData, isLoading: outstandingLoading } = useOutstandingCredits();
  const { data: summaryData, isLoading: summaryLoading } = useCreditSummary();
  const createPayment = useCreateCreditPayment();

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'CASH',
    paymentRef: '',
    notes: '',
  });

  const outstandingCustomers: Customer[] = outstandingData?.data ?? [];
  const summary = summaryData?.data;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 130 },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'currentBalance',
      headerName: 'Outstanding Balance',
      flex: 1,
      minWidth: 160,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 700 }}>
          ৳{(params.value ?? 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<PaymentIcon />}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCustomer(params.row as Customer);
            setPaymentOpen(true);
          }}
        >
          Pay
        </Button>
      ),
    },
  ];

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async () => {
    if (!selectedCustomer) return;
    const payload: CreateCreditPaymentPayload = {
      customerId: selectedCustomer.id,
      amount: Number(paymentForm.amount),
      paymentMethod: paymentForm.paymentMethod,
      paymentRef: paymentForm.paymentRef || undefined,
      notes: paymentForm.notes || undefined,
    };
    try {
      await createPayment.mutateAsync(payload);
      setPaymentOpen(false);
      setSelectedCustomer(null);
      setPaymentForm({ amount: '', paymentMethod: 'CASH', paymentRef: '', notes: '' });
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Credit Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'error.main' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Outstanding
                </Typography>
                {summaryLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
                    ৳{(summary?.totalOutstanding ?? 0).toLocaleString()}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Debtors
                </Typography>
                {summaryLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {summary?.totalDebtors ?? 0}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Outstanding Customers DataGrid */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Outstanding Customers
          </Typography>

          {outstandingLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : outstandingCustomers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No outstanding credits. All customers are settled.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={outstandingCustomers}
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

      {/* Make Payment Dialog */}
      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Customer: <strong>{selectedCustomer.name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Outstanding: <strong>৳{(selectedCustomer.currentBalance ?? 0).toLocaleString()}</strong>
              </Typography>
            </Box>
          )}
          {!selectedCustomer && (
            <Autocomplete
              options={outstandingCustomers}
              getOptionLabel={(option) => `${option.name} (${option.phone})`}
              value={selectedCustomer}
              onChange={(_, value) => setSelectedCustomer(value)}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" fullWidth sx={{ mt: 1, mb: 2 }} />
              )}
            />
          )}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Amount"
                name="amount"
                value={paymentForm.amount}
                onChange={handlePaymentChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Payment Method"
                name="paymentMethod"
                value={paymentForm.paymentMethod}
                onChange={handlePaymentChange}
                fullWidth
                select
                required
              >
                {paymentMethods.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Payment Reference"
                name="paymentRef"
                value={paymentForm.paymentRef}
                onChange={handlePaymentChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Notes"
                name="notes"
                value={paymentForm.notes}
                onChange={handlePaymentChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPaymentOpen(false);
              setSelectedCustomer(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePaymentSubmit}
            disabled={!selectedCustomer || !paymentForm.amount || createPayment.isPending}
          >
            {createPayment.isPending ? 'Processing...' : 'Submit Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreditsPage;
