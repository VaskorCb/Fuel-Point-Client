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
  Divider,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add } from '@mui/icons-material';
import { usePumps, useCreatePump, useCreateNozzle } from 'services/pumps/pumps.hooks';
import { useTanks } from 'services/tanks/tanks.hooks';
import { useFuelTypes } from 'services/fuel-types/fuel-types.hooks';
import type { CreatePumpPayload, FuelType, Nozzle, Pump, Tank } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

export default function PumpsPage() {
  const { t } = useTranslation();
  const { data: pumpsResponse, isLoading: pumpsLoading } = usePumps();
  const { data: tanksResponse } = useTanks();
  const { data: fuelTypesResponse } = useFuelTypes();
  const createPump = useCreatePump();
  const createNozzle = useCreateNozzle();

  const pumps: Pump[] = pumpsResponse?.data ?? [];
  const tanks: Tank[] = tanksResponse?.data ?? [];
  const fuelTypes: FuelType[] = fuelTypesResponse?.data ?? [];

  // Add Pump Dialog
  const [pumpDialogOpen, setPumpDialogOpen] = useState(false);
  const [pumpForm, setPumpForm] = useState({ pumpNumber: '' });

  const handleAddPump = () => {
    const payload: CreatePumpPayload = {
      pumpNumber: pumpForm.pumpNumber,
    };
    createPump.mutate(payload, {
      onSuccess: () => {
        setPumpDialogOpen(false);
        setPumpForm({ pumpNumber: '' });
      },
    });
  };

  // Add Nozzle Dialog
  const [nozzleDialogOpen, setNozzleDialogOpen] = useState(false);
  const [nozzlePumpId, setNozzlePumpId] = useState<number | null>(null);
  const [nozzleForm, setNozzleForm] = useState({
    nozzleNumber: '',
    tankId: '',
    fuelTypeId: '',
  });

  const handleNozzleChange = (field: string, value: string) => {
    setNozzleForm((prev) => ({ ...prev, [field]: value }));

    // Auto-fill fuel type when tank is selected
    if (field === 'tankId') {
      const selectedTank = tanks.find((t) => t.id === Number(value));
      if (selectedTank) {
        setNozzleForm((prev) => ({ ...prev, [field]: value, fuelTypeId: String(selectedTank.fuelTypeId) }));
      }
    }
  };

  const resetNozzleForm = () => {
    setNozzleForm({ nozzleNumber: '', tankId: '', fuelTypeId: '' });
    setNozzlePumpId(null);
  };

  const openNozzleDialog = (pumpId: number) => {
    setNozzlePumpId(pumpId);
    setNozzleDialogOpen(true);
  };

  const handleAddNozzle = () => {
    if (!nozzlePumpId) return;
    createNozzle.mutate(
      {
        pumpId: nozzlePumpId,
        data: {
          nozzleNumber: nozzleForm.nozzleNumber,
          tankId: Number(nozzleForm.tankId),
          fuelTypeId: Number(nozzleForm.fuelTypeId),
        },
      },
      {
        onSuccess: () => {
          setNozzleDialogOpen(false);
          resetNozzleForm();
        },
      },
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('pump_nozzle_setup')}</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setPumpDialogOpen(true)}>
          {t('add_pump')}
        </Button>
      </Box>

      {pumpsLoading ? (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      ) : pumps.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_pumps_found')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {pumps.map((pump) => (
            <Grid key={pump.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {t('pump_hash', { number: pump.pumpNumber })}
                    </Typography>
                    <Chip
                      label={pump.isActive ? t('active') : t('inactive')}
                      color={pump.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    {t('nozzles')}
                  </Typography>

                  {(!pump.nozzles || pump.nozzles.length === 0) ? (
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {t('no_nozzles_configured')}
                    </Typography>
                  ) : (
                    <Grid container spacing={1} sx={{ mb: 2, maxHeight: 240, overflowY: 'auto' }}>
                      {pump.nozzles.map((nozzle: Nozzle) => (
                        <Grid key={nozzle.id} size={{ xs: 6 }}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1.5,
                              bgcolor: 'action.hover',
                              border: '1px solid',
                              borderColor: 'divider',
                              height: '100%',
                            }}
                          >
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.25}>
                              <Typography variant="body2" fontWeight={700}>
                                #{nozzle.nozzleNumber}
                              </Typography>
                              <Chip
                                label={nozzle.fuelType?.name ?? '?'}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ height: 20, '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' } }}
                              />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Tank #{nozzle.tank?.tankNumber ?? 'N/A'}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => openNozzleDialog(pump.id)}
                    fullWidth
                  >
                    {t('add_nozzle')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Pump Dialog */}
      <Dialog open={pumpDialogOpen} onClose={() => setPumpDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('add_new_pump')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('pump_number')}
                value={pumpForm.pumpNumber}
                onChange={(e) => setPumpForm({ pumpNumber: e.target.value })}
                fullWidth
                required
                placeholder="e.g., 1, 2, 3..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPumpDialogOpen(false); setPumpForm({ pumpNumber: '' }); }}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPump}
            disabled={!pumpForm.pumpNumber || createPump.isPending}
          >
            {createPump.isPending ? t('adding') : t('add_pump')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Nozzle Dialog */}
      <Dialog open={nozzleDialogOpen} onClose={() => { setNozzleDialogOpen(false); resetNozzleForm(); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t('add_nozzle_to_pump', { number: pumps.find((p) => p.id === nozzlePumpId)?.pumpNumber ?? '' })}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('nozzle_number')}
                value={nozzleForm.nozzleNumber}
                onChange={(e) => handleNozzleChange('nozzleNumber', e.target.value)}
                fullWidth
                required
                placeholder="e.g., 1, 2, 3..."
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('linked_tank')}
                value={nozzleForm.tankId}
                onChange={(e) => handleNozzleChange('tankId', e.target.value)}
                select
                fullWidth
                required
              >
                {tanks.map((tank) => (
                  <MenuItem key={tank.id} value={tank.id}>
                    Tank #{tank.tankNumber} - {tank.fuelType?.name ?? 'Unknown'} ({tank.currentLevel.toLocaleString()} / {tank.capacity.toLocaleString()} L)
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('fuel_type')}
                value={nozzleForm.fuelTypeId}
                onChange={(e) => handleNozzleChange('fuelTypeId', e.target.value)}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setNozzleDialogOpen(false); resetNozzleForm(); }}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleAddNozzle}
            disabled={!nozzleForm.nozzleNumber || !nozzleForm.tankId || !nozzleForm.fuelTypeId || createNozzle.isPending}
          >
            {createNozzle.isPending ? t('adding') : t('add_nozzle')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
