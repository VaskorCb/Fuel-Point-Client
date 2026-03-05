'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
  LinearProgress,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ArrowBack, Opacity } from '@mui/icons-material';
import Link from 'next/link';
import { useTank, useTankDippings, useCreateDipping } from 'services/tanks/tanks.hooks';
import paths from 'routes/paths';
import type { TankDipping } from 'types/petrol-pump';

export default function TankDetailPage() {
  const params = useParams();
  const tankId = Number(params.id);

  const { data: tankResponse, isLoading: tankLoading } = useTank(tankId);
  const { data: dippingsResponse, isLoading: dippingsLoading } = useTankDippings(tankId);
  const createDipping = useCreateDipping();

  const tank = tankResponse?.data;
  const dippings: TankDipping[] = dippingsResponse?.data ?? [];

  // Dipping Dialog
  const [dippingOpen, setDippingOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState({
    measuredLevel: '',
    measuredBy: '',
    dippingDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      measuredLevel: '',
      measuredBy: '',
      dippingDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleOpenConfirm = () => {
    setDippingOpen(false);
    setConfirmOpen(true);
  };

  const calculatedLevel = tank?.currentLevel ?? 0;
  const measuredLevel = Number(form.measuredLevel) || 0;
  const difference = measuredLevel - calculatedLevel;

  const handleConfirmDipping = () => {
    createDipping.mutate(
      {
        tankId,
        data: {
          measuredLevel: Number(form.measuredLevel),
          measuredBy: form.measuredBy,
          dippingDate: form.dippingDate,
          notes: form.notes || undefined,
        },
      },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          resetForm();
        },
      },
    );
  };

  const columns: GridColDef<TankDipping>[] = [
    {
      field: 'dippingDate',
      headerName: 'Date',
      flex: 1,
      minWidth: 120,
      valueFormatter: (value: string) => {
        return new Date(value).toLocaleDateString();
      },
    },
    {
      field: 'measuredLevel',
      headerName: 'Measured Level',
      flex: 1,
      minWidth: 130,
      valueFormatter: (value: number) => `${value.toLocaleString()} L`,
    },
    {
      field: 'calculatedLevel',
      headerName: 'Calculated Level',
      flex: 1,
      minWidth: 140,
      valueFormatter: (value: number) => `${value.toLocaleString()} L`,
    },
    {
      field: 'difference',
      headerName: 'Difference',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const diff = params.value as number;
        const color = diff < 0 ? 'error.main' : diff > 0 ? 'success.main' : 'text.primary';
        const prefix = diff > 0 ? '+' : '';
        return (
          <Typography variant="body2" color={color} fontWeight={500}>
            {prefix}{diff.toLocaleString()} L
          </Typography>
        );
      },
    },
    {
      field: 'measuredBy',
      headerName: 'Measured By',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1.5,
      minWidth: 150,
      valueFormatter: (value: string | undefined) => value ?? '-',
    },
  ];

  if (tankLoading) {
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

  if (!tank) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Tank not found.
        </Typography>
        <Button component={Link} href={paths.tanks} startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Tanks
        </Button>
      </Box>
    );
  }

  const percentage = tank.capacity > 0 ? (tank.currentLevel / tank.capacity) * 100 : 0;
  const isLow = tank.currentLevel <= tank.minLevel;
  const progressColor = percentage < 20 ? 'error' : percentage < 40 ? 'warning' : 'success';

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button component={Link} href={paths.tanks} startIcon={<ArrowBack />} variant="text">
          Back
        </Button>
        <Typography variant="h4">
          Tank #{tank.tankNumber}
        </Typography>
        {isLow && <Chip label="Low Level Warning" color="error" size="small" />}
      </Box>

      {/* Tank Info Card */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Tank Information
              </Typography>
              <Stack spacing={1.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Tank Number</Typography>
                  <Typography variant="body2" fontWeight={500}>{tank.tankNumber}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Fuel Type</Typography>
                  <Typography variant="body2" fontWeight={500}>{tank.fuelType?.name ?? 'N/A'}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Capacity</Typography>
                  <Typography variant="body2" fontWeight={500}>{tank.capacity.toLocaleString()} Liters</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Minimum Level</Typography>
                  <Typography variant="body2" fontWeight={500}>{tank.minLevel.toLocaleString()} Liters</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Current Status
              </Typography>
              <Typography variant="h3" fontWeight={700} color={`${progressColor}.main`} mb={1}>
                {percentage.toFixed(1)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(percentage, 100)}
                color={progressColor as 'error' | 'warning' | 'success'}
                sx={{ height: 12, borderRadius: 6, mb: 2 }}
              />
              <Typography variant="body1">
                {tank.currentLevel.toLocaleString()} / {tank.capacity.toLocaleString()} Liters
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<Opacity />}
                  onClick={() => setDippingOpen(true)}
                >
                  Record Dipping
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dipping History */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Dipping History
          </Typography>
          <DataGrid
            rows={dippings}
            columns={columns}
            loading={dippingsLoading}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: { sortModel: [{ field: 'dippingDate', sort: 'desc' }] },
            }}
            disableRowSelectionOnClick
            sx={{ border: 'none' }}
            localeText={{
              noRowsLabel: 'No dipping records found',
            }}
          />
        </CardContent>
      </Card>

      {/* Record Dipping Dialog */}
      <Dialog open={dippingOpen} onClose={() => setDippingOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Dipping</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mt: 1, mb: 2 }}>
            Current calculated level: <strong>{tank.currentLevel.toLocaleString()} Liters</strong>
          </Alert>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Measured Level (Liters)"
                type="number"
                value={form.measuredLevel}
                onChange={(e) => handleFormChange('measuredLevel', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Measured By"
                value={form.measuredBy}
                onChange={(e) => handleFormChange('measuredBy', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Dipping Date"
                type="date"
                value={form.dippingDate}
                onChange={(e) => handleFormChange('dippingDate', e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Notes"
                value={form.notes}
                onChange={(e) => handleFormChange('notes', e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDippingOpen(false); resetForm(); }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenConfirm}
            disabled={!form.measuredLevel || !form.measuredBy}
          >
            Review
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dipping Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Dipping Record</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">Calculated Level:</Typography>
              <Typography variant="body1" fontWeight={500}>{calculatedLevel.toLocaleString()} L</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">Measured Level:</Typography>
              <Typography variant="body1" fontWeight={500}>{measuredLevel.toLocaleString()} L</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">Difference:</Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                color={difference < 0 ? 'error.main' : difference > 0 ? 'success.main' : 'text.primary'}
              >
                {difference > 0 ? '+' : ''}{difference.toLocaleString()} L
              </Typography>
            </Box>
            {difference < 0 && (
              <Alert severity="warning">
                Measured level is lower than calculated level. This may indicate a leak or unrecorded dispensing.
              </Alert>
            )}
            {difference > 0 && (
              <Alert severity="info">
                Measured level is higher than calculated level. This may indicate an unrecorded supply.
              </Alert>
            )}
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Measured By:</Typography>
              <Typography variant="body2">{form.measuredBy}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Date:</Typography>
              <Typography variant="body2">{form.dippingDate}</Typography>
            </Box>
            {form.notes && (
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Notes:</Typography>
                <Typography variant="body2">{form.notes}</Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setConfirmOpen(false); setDippingOpen(true); }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmDipping}
            disabled={createDipping.isPending}
          >
            {createDipping.isPending ? 'Saving...' : 'Confirm & Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
