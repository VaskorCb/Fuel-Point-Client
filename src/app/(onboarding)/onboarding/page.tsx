'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Add as AddIcon } from '@mui/icons-material';
import { useCompleteOnboarding } from 'services/users/users.hooks';
import { useCreateFuelType, useFuelTypes } from 'services/fuel-types/fuel-types.hooks';
import { useCreateTank, useTanks } from 'services/tanks/tanks.hooks';
import { useCreatePump, usePumps } from 'services/pumps/pumps.hooks';
import type { CreateFuelTypePayload, CreateTankPayload, CreatePumpPayload } from 'types/petrol-pump';

const steps = ['Station Info', 'Fuel Types', 'Tanks', 'Pumps'];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');

  const completeOnboarding = useCompleteOnboarding();

  // Step 1: Station Info (stored locally for now)
  const [stationInfo, setStationInfo] = useState({
    stationName: '',
    stationCode: '',
    stationAddress: '',
    district: '',
    thana: '',
    phone: '',
    bpcLicense: '',
  });

  // Step 2: Fuel Types
  const createFuelType = useCreateFuelType();
  const { data: fuelTypesData } = useFuelTypes();
  const fuelTypes = fuelTypesData?.data ?? [];
  const [newFuelType, setNewFuelType] = useState<CreateFuelTypePayload>({
    name: '',
    currentPrice: 0,
  });

  // Step 3: Tanks
  const createTank = useCreateTank();
  const { data: tanksData } = useTanks();
  const tanks = tanksData?.data ?? [];
  const [newTank, setNewTank] = useState({
    fuelTypeId: 0,
    tankNumber: '',
    capacity: 0,
    currentLevel: 0,
  });

  // Step 4: Pumps
  const createPump = useCreatePump();
  const { data: pumpsData } = usePumps();
  const pumps = pumpsData?.data ?? [];
  const [newPump, setNewPump] = useState({ pumpNumber: '' });

  const handleSkipAll = async () => {
    try {
      await completeOnboarding.mutateAsync({});
      router.replace('/subscription');
    } catch {
      setError('Failed to complete onboarding');
    }
  };

  const handleNext = () => {
    setError('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    try {
      await completeOnboarding.mutateAsync(stationInfo);
      router.replace('/subscription');
    } catch {
      setError('Failed to complete setup');
    }
  };

  const handleAddFuelType = async () => {
    if (!newFuelType.name || !newFuelType.currentPrice) {
      setError('Please fill in fuel type name and price');
      return;
    }
    try {
      await createFuelType.mutateAsync(newFuelType);
      setNewFuelType({ name: '', currentPrice: 0 });
      setError('');
    } catch {
      setError('Failed to add fuel type');
    }
  };

  const handleAddTank = async () => {
    if (!newTank.fuelTypeId || !newTank.tankNumber || !newTank.capacity) {
      setError('Please fill in all tank fields');
      return;
    }
    try {
      await createTank.mutateAsync(newTank as CreateTankPayload);
      setNewTank({ fuelTypeId: 0, tankNumber: '', capacity: 0, currentLevel: 0 });
      setError('');
    } catch {
      setError('Failed to add tank');
    }
  };

  const handleAddPump = async () => {
    if (!newPump.pumpNumber) {
      setError('Please enter a pump number');
      return;
    }
    try {
      await createPump.mutateAsync(newPump as CreatePumpPayload);
      setNewPump({ pumpNumber: '' });
      setError('');
    } catch {
      setError('Failed to add pump');
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Welcome! Let&apos;s set up your station
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Complete these steps to get started, or skip to set up later.
          </Typography>
        </Box>
        <Button
          variant="text"
          color="inherit"
          onClick={handleSkipAll}
          disabled={completeOnboarding.isPending}
        >
          Skip Setup
        </Button>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Step Content */}
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Step 1: Station Info */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Station Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your petrol station details. You can update these later in Settings.
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Station Name"
                    value={stationInfo.stationName}
                    onChange={(e) => setStationInfo({ ...stationInfo, stationName: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Station Code"
                    value={stationInfo.stationCode}
                    onChange={(e) => setStationInfo({ ...stationInfo, stationCode: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Station Address"
                    value={stationInfo.stationAddress}
                    onChange={(e) => setStationInfo({ ...stationInfo, stationAddress: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="District"
                    value={stationInfo.district}
                    onChange={(e) => setStationInfo({ ...stationInfo, district: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Thana"
                    value={stationInfo.thana}
                    onChange={(e) => setStationInfo({ ...stationInfo, thana: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={stationInfo.phone}
                    onChange={(e) => setStationInfo({ ...stationInfo, phone: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="BPC License"
                    value={stationInfo.bpcLicense}
                    onChange={(e) => setStationInfo({ ...stationInfo, bpcLicense: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: Fuel Types */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Fuel Types
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add the fuel types available at your station (e.g., Octane, Diesel, Petrol).
              </Typography>

              {/* Added fuel types */}
              {fuelTypes.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {fuelTypes.map((ft) => (
                    <Chip
                      key={ft.id}
                      label={`${ft.name} — ৳${Number(ft.currentPrice).toFixed(2)}`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}

              {/* Add form */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  label="Fuel Name"
                  value={newFuelType.name}
                  onChange={(e) => setNewFuelType({ ...newFuelType, name: e.target.value })}
                  size="small"
                />
                <TextField
                  label="Price per Liter"
                  type="number"
                  value={newFuelType.currentPrice || ''}
                  onChange={(e) => setNewFuelType({ ...newFuelType, currentPrice: Number(e.target.value) })}
                  size="small"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddFuelType}
                  disabled={createFuelType.isPending}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}

          {/* Step 3: Tanks */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Underground Tanks
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add your underground storage tanks and link them to fuel types.
              </Typography>

              {/* Added tanks */}
              {tanks.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {tanks.map((t) => (
                    <Chip
                      key={t.id}
                      label={`${t.tankNumber} — ${t.fuelType?.name ?? 'N/A'} (${Number(t.capacity)}L)`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}

              {/* Add form */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Fuel Type"
                    value={newTank.fuelTypeId || ''}
                    onChange={(e) => setNewTank({ ...newTank, fuelTypeId: Number(e.target.value) })}
                    size="small"
                  >
                    {fuelTypes.map((ft) => (
                      <MenuItem key={ft.id} value={ft.id}>
                        {ft.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Tank Number"
                    value={newTank.tankNumber}
                    onChange={(e) => setNewTank({ ...newTank, tankNumber: e.target.value })}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Capacity (Liters)"
                    type="number"
                    value={newTank.capacity || ''}
                    onChange={(e) => setNewTank({ ...newTank, capacity: Number(e.target.value) })}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Current Level (Liters)"
                    type="number"
                    value={newTank.currentLevel || ''}
                    onChange={(e) => setNewTank({ ...newTank, currentLevel: Number(e.target.value) })}
                    size="small"
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddTank}
                    disabled={createTank.isPending}
                  >
                    Add Tank
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 4: Pumps */}
          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Pumps
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add your fuel pumps. You can add nozzles to each pump later from the Pumps page.
              </Typography>

              {/* Added pumps */}
              {pumps.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {pumps.map((p) => (
                    <Chip
                      key={p.id}
                      label={`Pump ${p.pumpNumber}`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}

              {/* Add form */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  label="Pump Number"
                  value={newPump.pumpNumber}
                  onChange={(e) => setNewPump({ pumpNumber: e.target.value })}
                  size="small"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddPump}
                  disabled={createPump.isPending}
                >
                  Add Pump
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleFinish}
              disabled={completeOnboarding.isPending}
              startIcon={completeOnboarding.isPending ? <CircularProgress size={16} /> : null}
            >
              Finish Setup
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
