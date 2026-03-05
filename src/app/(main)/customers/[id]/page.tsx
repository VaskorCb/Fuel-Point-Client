'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Divider,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCustomer, useUpdateCustomer } from 'services/customers/customers.hooks';
import { useCreditsByCustomer } from 'services/credits/credits.hooks';
import { useCreateCreditPayment } from 'services/credits/credits.hooks';
import { useCreateVehicle, useDeleteVehicle } from 'services/vehicles/vehicles.hooks';
import { CreditTransaction, CreateCreditPaymentPayload, Vehicle, VehicleType, VEHICLE_TYPE_LABELS, CreateVehiclePayload } from 'types/petrol-pump';

const paymentMethods = ['CASH', 'BKASH', 'NAGAD'];

const CustomerDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const customerId = Number(params.id);

  const { data: customerData, isLoading: customerLoading } = useCustomer(customerId);
  const { data: creditsData, isLoading: creditsLoading } = useCreditsByCustomer(customerId);
  const updateCustomer = useUpdateCustomer();
  const createPayment = useCreateCreditPayment();
  const createVehicle = useCreateVehicle();
  const deleteVehicle = useDeleteVehicle();

  const customer = customerData?.data;
  const credits: CreditTransaction[] = creditsData?.data ?? [];
  const vehicles: Vehicle[] = customer?.vehicles ?? [];

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    company: '',
    address: '',
    creditLimit: '',
  });

  // Payment dialog state
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'CASH',
    paymentRef: '',
    notes: '',
  });

  // Vehicle dialog state
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: '',
    vehicleType: 'CAR' as VehicleType,
  });

  const handleOpenEdit = () => {
    if (customer) {
      setEditForm({
        name: customer.name,
        phone: customer.phone,
        company: customer.company ?? '',
        address: customer.address ?? '',
        creditLimit: String(customer.creditLimit ?? 0),
      });
    }
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await updateCustomer.mutateAsync({
        id: customerId,
        data: {
          name: editForm.name,
          phone: editForm.phone,
          company: editForm.company || undefined,
          address: editForm.address || undefined,
          creditLimit: editForm.creditLimit ? Number(editForm.creditLimit) : undefined,
        },
      });
      setEditOpen(false);
    } catch {
      // error handled by mutation
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async () => {
    const payload: CreateCreditPaymentPayload = {
      customerId,
      amount: Number(paymentForm.amount),
      paymentMethod: paymentForm.paymentMethod,
      paymentRef: paymentForm.paymentRef || undefined,
      notes: paymentForm.notes || undefined,
    };
    try {
      await createPayment.mutateAsync(payload);
      setPaymentOpen(false);
      setPaymentForm({ amount: '', paymentMethod: 'CASH', paymentRef: '', notes: '' });
    } catch {
      // error handled by mutation
    }
  };

  const handleVehicleSubmit = async () => {
    if (!customer) return;
    const payload: CreateVehiclePayload = {
      customerId,
      vehicleNumber: vehicleForm.vehicleNumber,
      vehicleType: vehicleForm.vehicleType,
    };
    try {
      await createVehicle.mutateAsync(payload);
      setVehicleOpen(false);
      setVehicleForm({ vehicleNumber: '', vehicleType: 'CAR' });
    } catch {
      // error handled by mutation
    }
  };

  const handleDeleteVehicle = async (vehicleId: number) => {
    try {
      await deleteVehicle.mutateAsync(vehicleId);
    } catch {
      // error handled by mutation
    }
  };

  const vehicleColumns: GridColDef[] = [
    { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1, minWidth: 150 },
    {
      field: 'vehicleType',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={VEHICLE_TYPE_LABELS[params.value as VehicleType] ?? params.value}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Added On',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => new Date(params.value).toLocaleDateString('en-GB'),
    },
    {
      field: 'actions',
      headerName: '',
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteVehicle(params.row.id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const ledgerColumns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => new Date(params.value).toLocaleDateString('en-GB'),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'PAYMENT' ? 'success' : 'warning'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 120,
      type: 'number',
      renderCell: (params) => `৳${(params.value ?? 0).toLocaleString()}`,
    },
    {
      field: 'balanceAfter',
      headerName: 'Balance After',
      flex: 1,
      minWidth: 130,
      type: 'number',
      renderCell: (params) => `৳${(params.value ?? 0).toLocaleString()}`,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 140,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'sale',
      headerName: 'Sale Ref',
      width: 130,
      renderCell: (params) => {
        const sale = params.value;
        if (!sale) return '-';
        return `#${sale.id} - ${sale.fuelType?.name ?? ''}`;
      },
    },
  ];

  if (customerLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Customer not found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => router.push('/customers')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {customer.name}
        </Typography>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpenEdit}>
          Edit
        </Button>
        <Button variant="contained" startIcon={<PaymentIcon />} onClick={() => setPaymentOpen(true)}>
          Make Payment
        </Button>
      </Box>

      {/* Customer Info Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{customer.name}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">{customer.phone}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Company
              </Typography>
              <Typography variant="body1">{customer.company || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1">{customer.address || '-'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Credit Limit
              </Typography>
              <Typography variant="body1">৳{(customer.creditLimit ?? 0).toLocaleString()}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Balance
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: customer.currentBalance > 0 ? 'error.main' : 'success.main',
                  fontWeight: 700,
                }}
              >
                ৳{(customer.currentBalance ?? 0).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Vehicles */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsCarIcon /> Vehicles ({vehicles.length})
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setVehicleOpen(true)}
            >
              Add Vehicle
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {vehicles.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No vehicles registered for this customer.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={vehicles}
              columns={vehicleColumns}
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              autoHeight
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* Credit Ledger */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Credit Ledger
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {creditsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : credits.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No credit transactions found for this customer.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={credits}
              columns={ledgerColumns}
              pageSizeOptions={[10, 25, 50]}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              autoHeight
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* Edit Customer Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Phone"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Company"
                name="company"
                value={editForm.company}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Credit Limit"
                name="creditLimit"
                value={editForm.creditLimit}
                onChange={handleEditChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEditSubmit}
            disabled={!editForm.name || !editForm.phone || updateCustomer.isPending}
          >
            {updateCustomer.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Make Payment Dialog */}
      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Current Balance: ৳{(customer.currentBalance ?? 0).toLocaleString()}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 0 }}>
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
          <Button onClick={() => setPaymentOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handlePaymentSubmit}
            disabled={!paymentForm.amount || createPayment.isPending}
          >
            {createPayment.isPending ? 'Processing...' : 'Submit Payment'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Vehicle Dialog */}
      <Dialog open={vehicleOpen} onClose={() => setVehicleOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Vehicle</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Vehicle Number"
                value={vehicleForm.vehicleNumber}
                onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleNumber: e.target.value })}
                fullWidth
                required
                placeholder="e.g., DHA-KA-12-3456"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Vehicle Type"
                value={vehicleForm.vehicleType}
                onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleType: e.target.value as VehicleType })}
                fullWidth
                select
              >
                {Object.entries(VEHICLE_TYPE_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVehicleOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleVehicleSubmit}
            disabled={!vehicleForm.vehicleNumber || createVehicle.isPending}
          >
            {createVehicle.isPending ? 'Saving...' : 'Save Vehicle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerDetailPage;
