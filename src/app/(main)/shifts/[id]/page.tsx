'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useShift, useEndShift } from 'services/shifts/shifts.hooks';
import { useParams, useRouter } from 'next/navigation';
import paths from 'routes/paths';
import dayjs from 'dayjs';
import { ClosingMeterReadingInput, EndShiftPayload } from 'types/petrol-pump';

const ShiftDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const shiftId = Number(params.id);

  const { data: shiftData, isLoading } = useShift(shiftId);
  const endShift = useEndShift();

  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [closingReadings, setClosingReadings] = useState<Record<number, string>>({});
  const [totalCash, setTotalCash] = useState('');
  const [totalBkash, setTotalBkash] = useState('');
  const [totalNagad, setTotalNagad] = useState('');
  const [endNotes, setEndNotes] = useState('');

  const shift = shiftData?.data;

  const handleClosingReadingChange = (nozzleId: number, value: string) => {
    setClosingReadings((prev) => ({ ...prev, [nozzleId]: value }));
  };

  const handleEndShift = () => {
    if (!shift) return;

    const meterReadings: ClosingMeterReadingInput[] = (shift.meterReadings ?? []).map((mr) => ({
      nozzleId: mr.nozzleId,
      closingReading: parseFloat(closingReadings[mr.nozzleId] || '0'),
    }));

    const payload: EndShiftPayload = {
      meterReadings,
      totalCash: totalCash ? parseFloat(totalCash) : undefined,
      totalBkash: totalBkash ? parseFloat(totalBkash) : undefined,
      totalNagad: totalNagad ? parseFloat(totalNagad) : undefined,
      notes: endNotes || undefined,
    };

    endShift.mutate({ id: shiftId, ...payload }, {
      onSuccess: () => {
        setEndDialogOpen(false);
        router.push(paths.shifts);
      },
    });
  };

  if (isLoading) {
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

  if (!shift) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Shift not found.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => router.push(paths.shifts)}>
          Back to Shifts
        </Button>
      </Box>
    );
  }

  const salesColumns: GridColDef[] = [
    {
      field: 'saleDate',
      headerName: 'Time',
      width: 100,
      valueFormatter: (value: string) => (value ? dayjs(value).format('hh:mm A') : ''),
    },
    {
      field: 'fuelType',
      headerName: 'Fuel Type',
      width: 130,
      valueGetter: (_value: unknown, row: { fuelType?: { name?: string } }) =>
        row.fuelType?.name ?? '',
    },
    {
      field: 'quantity',
      headerName: 'Qty (L)',
      width: 100,
      type: 'number',
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      width: 120,
      type: 'number',
      valueFormatter: (value: number) => `৳${value?.toLocaleString() ?? '0'}`,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment',
      width: 100,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 140,
      valueGetter: (_value: unknown, row: { customer?: { name?: string } }) =>
        row.customer?.name ?? '-',
    },
    {
      field: 'vehicleNumber',
      headerName: 'Vehicle',
      width: 120,
      valueGetter: (_value: unknown, row: { vehicleNumber?: string }) =>
        row.vehicleNumber || '-',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Shift Details</Typography>
        <Box display="flex" gap={2}>
          {shift.status === 'ACTIVE' && (
            <Button variant="contained" color="warning" onClick={() => setEndDialogOpen(true)}>
              End Shift
            </Button>
          )}
          <Button variant="outlined" onClick={() => router.push(paths.shifts)}>
            Back
          </Button>
        </Box>
      </Box>

      {/* Shift Info */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Shift Information
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Employee
                  </Typography>
                  <Typography variant="body2">{shift.employee?.name ?? '-'}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Shift Type
                  </Typography>
                  <Typography variant="body2">{shift.shiftType}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Start Time
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(shift.startTime).format('DD/MM/YYYY hh:mm A')}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    End Time
                  </Typography>
                  <Typography variant="body2">
                    {shift.endTime
                      ? dayjs(shift.endTime).format('DD/MM/YYYY hh:mm A')
                      : '-'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={shift.status}
                    size="small"
                    color={shift.status === 'ACTIVE' ? 'success' : 'default'}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Collection Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Collection Summary
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Sales
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ৳{shift.totalSales?.toLocaleString() ?? '0'}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Cash
                  </Typography>
                  <Typography variant="body2">
                    ৳{shift.totalCash?.toLocaleString() ?? '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    bKash
                  </Typography>
                  <Typography variant="body2">
                    ৳{shift.totalBkash?.toLocaleString() ?? '0'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Nagad
                  </Typography>
                  <Typography variant="body2">
                    ৳{shift.totalNagad?.toLocaleString() ?? '0'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Meter Readings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Meter Readings
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nozzle</TableCell>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell align="right">Opening</TableCell>
                  <TableCell align="right">Closing</TableCell>
                  <TableCell align="right">Dispensed (L)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shift.meterReadings?.map((mr) => (
                  <TableRow key={mr.id}>
                    <TableCell>{mr.nozzle?.nozzleNumber ?? `Nozzle #${mr.nozzleId}`}</TableCell>
                    <TableCell>{mr.nozzle?.fuelType?.name ?? '-'}</TableCell>
                    <TableCell align="right">{mr.openingReading?.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {mr.closingReading != null ? mr.closingReading.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {mr.totalDispensed != null ? mr.totalDispensed.toLocaleString() : '-'}
                    </TableCell>
                  </TableRow>
                ))}
                {(!shift.meterReadings || shift.meterReadings.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No meter readings
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Sales in this Shift */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Sales in this Shift
          </Typography>
          {(shift.sales ?? []).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No sales recorded in this shift.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={shift.sales ?? []}
              columns={salesColumns}
              autoHeight
              pageSizeOptions={[10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* End Shift Dialog */}
      <Dialog open={endDialogOpen} onClose={() => setEndDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>End Shift</DialogTitle>
        <DialogContent>
          {endShift.isError && (
            <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
              Failed to end shift. Please try again.
            </Alert>
          )}

          <Typography variant="subtitle1" mt={1} mb={2}>
            Closing Meter Readings
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nozzle</TableCell>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell align="right">Opening</TableCell>
                  <TableCell sx={{ width: 180 }}>Closing Reading</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shift.meterReadings?.map((mr) => (
                  <TableRow key={mr.id}>
                    <TableCell>
                      {mr.nozzle?.nozzleNumber ?? `Nozzle #${mr.nozzleId}`}
                    </TableCell>
                    <TableCell>{mr.nozzle?.fuelType?.name ?? '-'}</TableCell>
                    <TableCell align="right">{mr.openingReading?.toLocaleString()}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        placeholder="0.00"
                        value={closingReadings[mr.nozzleId] ?? ''}
                        onChange={(e) =>
                          handleClosingReadingChange(mr.nozzleId, e.target.value)
                        }
                        inputProps={{ step: '0.01', min: '0' }}
                        required
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1" mb={2}>
            Collection Handover
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Total Cash (৳)"
                type="number"
                value={totalCash}
                onChange={(e) => setTotalCash(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Total bKash (৳)"
                type="number"
                value={totalBkash}
                onChange={(e) => setTotalBkash(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Total Nagad (৳)"
                type="number"
                value={totalNagad}
                onChange={(e) => setTotalNagad(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
          </Grid>

          <TextField
            label="Notes (Optional)"
            value={endNotes}
            onChange={(e) => setEndNotes(e.target.value)}
            fullWidth
            multiline
            rows={2}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEndDialogOpen(false)} disabled={endShift.isPending}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleEndShift}
            disabled={endShift.isPending}
            startIcon={endShift.isPending ? <CircularProgress size={20} /> : null}
          >
            {endShift.isPending ? 'Ending...' : 'End Shift'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShiftDetailPage;
