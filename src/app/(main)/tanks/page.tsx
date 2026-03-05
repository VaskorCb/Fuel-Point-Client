'use client';

import { useState } from 'react';
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
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add, Opacity, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { useTanks, useCreateTank } from 'services/tanks/tanks.hooks';
import { useFuelTypes } from 'services/fuel-types/fuel-types.hooks';
import paths from 'routes/paths';
import { Alert } from '@mui/material';
import type { CreateTankPayload, FuelType, Tank } from 'types/petrol-pump';

const getProgressColor = (percentage: number): 'error' | 'warning' | 'success' => {
  if (percentage < 20) return 'error';
  if (percentage < 40) return 'warning';
  return 'success';
};

export default function TanksPage() {
  const { data: tanksResponse, isLoading: tanksLoading } = useTanks();
  const { data: fuelTypesResponse } = useFuelTypes();
  const createTank = useCreateTank();

  const tanks: Tank[] = tanksResponse?.data ?? [];
  const fuelTypes: FuelType[] = fuelTypesResponse?.data ?? [];

  // Add Tank Dialog
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    tankNumber: '',
    fuelTypeId: '',
    capacity: '',
    currentLevel: '',
    minLevel: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({ tankNumber: '', fuelTypeId: '', capacity: '', currentLevel: '', minLevel: '' });
  };

  const handleAddTank = () => {
    const payload: CreateTankPayload = {
      fuelTypeId: Number(form.fuelTypeId),
      tankNumber: form.tankNumber,
      capacity: Number(form.capacity),
      currentLevel: Number(form.currentLevel),
      minLevel: form.minLevel ? Number(form.minLevel) : undefined,
    };
    createTank.mutate(payload, {
      onSuccess: () => {
        setAddOpen(false);
        resetForm();
      },
    });
  };

  // Dipping Dialog
  const [dippingOpen, setDippingOpen] = useState(false);
  const [dippingTankId, setDippingTankId] = useState<number | null>(null);
  const [dippingForm, setDippingForm] = useState({
    measuredLevel: '',
    measuredBy: '',
    dippingDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleDippingChange = (field: string, value: string) => {
    setDippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetDippingForm = () => {
    setDippingForm({
      measuredLevel: '',
      measuredBy: '',
      dippingDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setDippingTankId(null);
  };

  const openDippingDialog = (tankId: number) => {
    setDippingTankId(tankId);
    setDippingOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Tank Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>
          Add Tank
        </Button>
      </Box>

      {tanksLoading ? (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      ) : tanks.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No tanks found. Add your first tank to get started.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {tanks.map((tank) => {
            const percentage = tank.capacity > 0 ? (tank.currentLevel / tank.capacity) * 100 : 0;
            const isLow = tank.currentLevel <= tank.minLevel;
            const color = getProgressColor(percentage);

            return (
              <Grid key={tank.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6" fontWeight={600}>
                        Tank #{tank.tankNumber}
                      </Typography>
                      {isLow && (
                        <Chip label="Low Level" color="error" size="small" variant="outlined" />
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {tank.fuelType?.name ?? 'Unknown Fuel'}
                    </Typography>

                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          Level
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {percentage.toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(percentage, 100)}
                        color={color}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>

                    <Typography variant="body2" mb={2}>
                      <strong>Current Level:</strong> {tank.currentLevel.toLocaleString()} /{' '}
                      {tank.capacity.toLocaleString()} Liters ({percentage.toFixed(1)}%)
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Opacity />}
                        onClick={() => openDippingDialog(tank.id)}
                      >
                        Record Dipping
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<Visibility />}
                        component={Link}
                        href={`${paths.tanks}/${tank.id}`}
                      >
                        View Dippings
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Add Tank Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Tank</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tank Number"
                value={form.tankNumber}
                onChange={(e) => handleFormChange('tankNumber', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fuel Type"
                value={form.fuelTypeId}
                onChange={(e) => handleFormChange('fuelTypeId', e.target.value)}
                select
                fullWidth
                required
              >
                {fuelTypes.map((ft) => (
                  <MenuItem key={ft.id} value={ft.id}>
                    {ft.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Capacity (Liters)"
                type="number"
                value={form.capacity}
                onChange={(e) => handleFormChange('capacity', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Current Level (Liters)"
                type="number"
                value={form.currentLevel}
                onChange={(e) => handleFormChange('currentLevel', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Minimum Level (Liters)"
                type="number"
                value={form.minLevel}
                onChange={(e) => handleFormChange('minLevel', e.target.value)}
                fullWidth
                helperText="Alert will trigger when level drops below this"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTank}
            disabled={!form.tankNumber || !form.fuelTypeId || !form.capacity || !form.currentLevel || createTank.isPending}
          >
            {createTank.isPending ? 'Adding...' : 'Add Tank'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Record Dipping Dialog (quick access from list) */}
      <Dialog open={dippingOpen} onClose={() => { setDippingOpen(false); resetDippingForm(); }} maxWidth="sm" fullWidth>
        <DialogTitle>Record Dipping</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Measured Level (Liters)"
                type="number"
                value={dippingForm.measuredLevel}
                onChange={(e) => handleDippingChange('measuredLevel', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Measured By"
                value={dippingForm.measuredBy}
                onChange={(e) => handleDippingChange('measuredBy', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Dipping Date"
                type="date"
                value={dippingForm.dippingDate}
                onChange={(e) => handleDippingChange('dippingDate', e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Notes"
                value={dippingForm.notes}
                onChange={(e) => handleDippingChange('notes', e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDippingOpen(false); resetDippingForm(); }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!dippingForm.measuredLevel || !dippingForm.measuredBy}
            component={Link}
            href={dippingTankId ? `${paths.tanks}/${dippingTankId}` : '#'}
          >
            Go to Tank Detail
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

