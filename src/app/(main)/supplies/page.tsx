'use client';

import React, { useState, useEffect } from 'react';
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
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useSupplies, useCreateSupply } from 'services/supplies/supplies.hooks';
import { useTanks } from 'services/tanks/tanks.hooks';
import { FuelSupply, CreateSupplyPayload, Tank } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

const initialFormState = {
  tankId: '',
  challanNumber: '',
  supplierName: '',
  quantity: '',
  unitCost: '',
  totalCost: '',
  receivedDate: new Date().toISOString().split('T')[0],
  notes: '',
};

const SuppliesPage = () => {
  const { t } = useTranslation();
  const { data: suppliesData, isLoading, error } = useSupplies({});
  const { data: tanksData } = useTanks();
  const createSupply = useCreateSupply();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const supplies: FuelSupply[] = suppliesData?.data ?? [];
  const tanks: Tank[] = tanksData?.data ?? [];

  // Auto-calculate totalCost when quantity or unitCost changes
  useEffect(() => {
    const qty = Number(form.quantity) || 0;
    const cost = Number(form.unitCost) || 0;
    const total = qty * cost;
    setForm((prev) => ({ ...prev, totalCost: total > 0 ? total.toFixed(2) : '' }));
  }, [form.quantity, form.unitCost]);

  const columns: GridColDef[] = [
    {
      field: 'receivedDate',
      headerName: t('received_date'),
      flex: 1,
      minWidth: 130,
      renderCell: (params) => new Date(params.value).toLocaleDateString('en-GB'),
    },
    { field: 'challanNumber', headerName: t('challan_no'), flex: 1, minWidth: 120 },
    {
      field: 'tank',
      headerName: t('tank'),
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        const tank = params.value;
        if (!tank) return '-';
        return `${tank.tankNumber} (${tank.fuelType?.name ?? ''})`;
      },
    },
    {
      field: 'quantity',
      headerName: t('quantity_l'),
      flex: 1,
      minWidth: 110,
      type: 'number',
      renderCell: (params) => `${Number(params.value ?? 0).toLocaleString()} L`,
    },
    {
      field: 'unitCost',
      headerName: t('unit_cost'),
      flex: 1,
      minWidth: 100,
      type: 'number',
      renderCell: (params) => `৳${Number(params.value ?? 0).toFixed(2)}`,
    },
    {
      field: 'totalCost',
      headerName: t('total_cost'),
      flex: 1,
      minWidth: 120,
      type: 'number',
      renderCell: (params) => `৳${Number(params.value ?? 0).toLocaleString()}`,
    },
    {
      field: 'supplierName',
      headerName: t('supplier'),
      flex: 1,
      minWidth: 130,
      renderCell: (params) => params.value || '-',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload: CreateSupplyPayload = {
      tankId: Number(form.tankId),
      challanNumber: form.challanNumber,
      supplierName: form.supplierName || undefined,
      quantity: Number(form.quantity),
      unitCost: Number(form.unitCost),
      totalCost: Number(form.totalCost),
      receivedDate: form.receivedDate,
      notes: form.notes || undefined,
    };
    try {
      await createSupply.mutateAsync(payload);
      setDialogOpen(false);
      setForm(initialFormState);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('fuel_supplies')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          {t('record_supply')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{t('failed_load_supplies')}</Alert>
          ) : supplies.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_supplies_found')}
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={supplies}
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

      {/* Record Supply Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('record_fuel_supply')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('tank')}
                name="tankId"
                value={form.tankId}
                onChange={handleChange}
                fullWidth
                select
                required
              >
                {tanks.map((tank) => (
                  <MenuItem key={tank.id} value={tank.id}>
                    {tank.tankNumber} ({tank.fuelType?.name ?? 'Unknown'})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('challan_number')}
                name="challanNumber"
                value={form.challanNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('quantity_liters')}
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('unit_cost_currency')}
                name="unitCost"
                value={form.unitCost}
                onChange={handleChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('total_cost_currency')}
                name="totalCost"
                value={form.totalCost}
                fullWidth
                type="number"
                disabled
                helperText={t('auto_calculated')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('received_date')}
                name="receivedDate"
                value={form.receivedDate}
                onChange={handleChange}
                fullWidth
                type="date"
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('supplier_name')}
                name="supplierName"
                value={form.supplierName}
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
            disabled={
              !form.tankId || !form.challanNumber || !form.quantity || !form.unitCost || createSupply.isPending
            }
          >
            {createSupply.isPending ? t('saving') : t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuppliesPage;
