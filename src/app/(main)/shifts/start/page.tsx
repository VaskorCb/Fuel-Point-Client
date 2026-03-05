'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEmployees } from 'services/employees/employees.hooks';
import { useNozzles } from 'services/pumps/pumps.hooks';
import { useStartShift } from 'services/shifts/shifts.hooks';
import { useRouter } from 'next/navigation';
import paths from 'routes/paths';
import { MeterReadingInput, StartShiftPayload } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

const shiftTypes = ['DAY', 'NIGHT', 'MORNING', 'EVENING'];

const StartShiftPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: employeesData } = useEmployees();
  const { data: nozzlesData } = useNozzles();
  const startShift = useStartShift();

  const [employeeId, setEmployeeId] = useState<number | ''>('');
  const [shiftType, setShiftType] = useState('DAY');
  const [readings, setReadings] = useState<Record<number, string>>({});

  const nozzles = nozzlesData?.data ?? [];
  const activeEmployees = employeesData?.data?.filter((e) => e.isActive) ?? [];

  const handleReadingChange = (nozzleId: number, value: string) => {
    setReadings((prev) => ({ ...prev, [nozzleId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) return;

    const meterReadings: MeterReadingInput[] = nozzles
      .filter((n) => n.isActive)
      .map((n) => ({
        nozzleId: n.id,
        openingReading: parseFloat(readings[n.id] || '0'),
      }));

    const payload: StartShiftPayload = {
      employeeId: employeeId as number,
      shiftType,
      meterReadings,
    };

    startShift.mutate(payload, {
      onSuccess: () => {
        router.push(paths.shifts);
      },
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        {t('start_new_shift')}
      </Typography>

      {startShift.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('failed_start_shift')}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} mb={3}>
              {/* Employee */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label={t('employee')}
                  value={employeeId}
                  onChange={(e) => setEmployeeId(Number(e.target.value))}
                  fullWidth
                  required
                >
                  {activeEmployees.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.name} - {emp.designation}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Shift Type */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label={t('shift_type')}
                  value={shiftType}
                  onChange={(e) => setShiftType(e.target.value)}
                  fullWidth
                  required
                >
                  {shiftTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* Nozzle Opening Readings */}
            <Typography variant="h6" mb={2}>
              {t('opening_meter_readings')}
            </Typography>

            {nozzles.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                {t('no_nozzles_found')}
              </Alert>
            ) : (
              <TableContainer sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('nozzle')}</TableCell>
                      <TableCell>{t('pump')}</TableCell>
                      <TableCell>{t('fuel_type')}</TableCell>
                      <TableCell sx={{ width: 200 }}>{t('opening_reading')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nozzles
                      .filter((n) => n.isActive)
                      .map((nozzle) => (
                        <TableRow key={nozzle.id}>
                          <TableCell>{nozzle.nozzleNumber}</TableCell>
                          <TableCell>{nozzle.pump?.pumpNumber ?? '-'}</TableCell>
                          <TableCell>{nozzle.fuelType?.name ?? '-'}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              placeholder="0.00"
                              value={readings[nozzle.id] ?? ''}
                              onChange={(e) => handleReadingChange(nozzle.id, e.target.value)}
                              inputProps={{ step: '0.01', min: '0' }}
                              required
                              sx={{ width: 180 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Submit */}
            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={startShift.isPending || !employeeId || nozzles.length === 0}
                startIcon={startShift.isPending ? <CircularProgress size={20} /> : null}
              >
                {startShift.isPending ? t('starting') : t('start_shift')}
              </Button>
              <Button variant="outlined" size="large" onClick={() => router.push(paths.shifts)}>
                {t('cancel')}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StartShiftPage;
