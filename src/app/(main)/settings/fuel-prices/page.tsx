'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import {
  useFuelTypes,
  useCreateFuelType,
  useUpdateFuelPrice,
  useFuelPriceHistory,
} from 'services/fuel-types/fuel-types.hooks';
import { FuelType, FuelPriceHistory, UpdatePricePayload, CreateFuelTypePayload } from 'types/petrol-pump';

const FuelPricesPage = () => {
  const router = useRouter();
  const { data: fuelTypesData, isLoading, error } = useFuelTypes();
  const updateFuelPrice = useUpdateFuelPrice();
  const createFuelType = useCreateFuelType();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFuelType, setSelectedFuelType] = useState<FuelType | null>(null);
  const [priceForm, setPriceForm] = useState({
    newPrice: '',
    effectiveFrom: new Date().toISOString().split('T')[0],
  });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    nameBn: '',
    unit: 'Liter',
    currentPrice: '',
  });

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    const payload: CreateFuelTypePayload = {
      name: addForm.name,
      nameBn: addForm.nameBn || undefined,
      unit: addForm.unit || 'Liter',
      currentPrice: Number(addForm.currentPrice),
    };
    try {
      await createFuelType.mutateAsync(payload);
      setAddDialogOpen(false);
      setAddForm({ name: '', nameBn: '', unit: 'Liter', currentPrice: '' });
    } catch {
      // error handled by mutation
    }
  };

  const fuelTypes: FuelType[] = fuelTypesData?.data ?? [];

  const handleOpenUpdatePrice = (fuelType: FuelType) => {
    setSelectedFuelType(fuelType);
    setPriceForm({
      newPrice: '',
      effectiveFrom: new Date().toISOString().split('T')[0],
    });
    setDialogOpen(true);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceForm({ ...priceForm, [e.target.name]: e.target.value });
  };

  const handleSubmitPrice = async () => {
    if (!selectedFuelType) return;
    const payload: UpdatePricePayload = {
      newPrice: Number(priceForm.newPrice),
      effectiveFrom: priceForm.effectiveFrom || undefined,
    };
    try {
      await updateFuelPrice.mutateAsync({ id: selectedFuelType.id, data: payload });
      setDialogOpen(false);
      setSelectedFuelType(null);
    } catch {
      // error handled by mutation
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton onClick={() => router.push('/settings')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>Fuel Price Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
          Add Fuel Type
        </Button>
      </Box>

      {isLoading ? (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      ) : error ? (
        <Alert severity="error">Failed to load fuel types.</Alert>
      ) : fuelTypes.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No fuel types configured. Please set up fuel types first.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {fuelTypes.map((fuelType) => (
            <Grid key={fuelType.id} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{fuelType.name}</Typography>
                      {fuelType.nameBn && (
                        <Typography variant="body2" color="text.secondary">
                          {fuelType.nameBn}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={fuelType.isActive ? 'Active' : 'Inactive'}
                      color={fuelType.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Current Price
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ৳{Number(fuelType.currentPrice ?? 0).toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        per {fuelType.unit}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenUpdatePrice(fuelType)}
                    >
                      Update Price
                    </Button>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Price History Toggle */}
                  <Button
                    size="small"
                    onClick={() => toggleExpand(fuelType.id)}
                    endIcon={expandedId === fuelType.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ mt: 1 }}
                  >
                    Price History
                  </Button>

                  <Collapse in={expandedId === fuelType.id}>
                    <PriceHistorySection fuelTypeId={fuelType.id} />
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Update Price Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Update Price{selectedFuelType ? ` - ${selectedFuelType.name}` : ''}
        </DialogTitle>
        <DialogContent>
          {selectedFuelType && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 1 }}>
              Current Price: ৳{Number(selectedFuelType.currentPrice ?? 0).toFixed(2)} per {selectedFuelType.unit}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="New Price (৳)"
                name="newPrice"
                value={priceForm.newPrice}
                onChange={handlePriceChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Effective From"
                name="effectiveFrom"
                value={priceForm.effectiveFrom}
                onChange={handlePriceChange}
                fullWidth
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitPrice}
            disabled={!priceForm.newPrice || updateFuelPrice.isPending}
          >
            {updateFuelPrice.isPending ? 'Updating...' : 'Update Price'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Fuel Type Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Fuel Type</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fuel Name"
                name="name"
                value={addForm.name}
                onChange={handleAddChange}
                fullWidth
                required
                placeholder="e.g., Diesel, Octane, CNG"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Name (Bangla)"
                name="nameBn"
                value={addForm.nameBn}
                onChange={handleAddChange}
                fullWidth
                placeholder="e.g., ডিজেল"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Unit"
                name="unit"
                value={addForm.unit}
                onChange={handleAddChange}
                fullWidth
                placeholder="Liter"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Current Price (৳)"
                name="currentPrice"
                value={addForm.currentPrice}
                onChange={handleAddChange}
                fullWidth
                required
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddSubmit}
            disabled={!addForm.name || !addForm.currentPrice || createFuelType.isPending}
          >
            {createFuelType.isPending ? 'Saving...' : 'Add Fuel Type'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Sub-component for price history
const PriceHistorySection = ({ fuelTypeId }: { fuelTypeId: number }) => {
  const { data: historyData, isLoading } = useFuelPriceHistory(fuelTypeId);
  const history: FuelPriceHistory[] = historyData?.data ?? [];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (history.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No price history available.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Old Price</TableCell>
            <TableCell align="right">New Price</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((record) => {
            const change = Number(record.newPrice ?? 0) - Number(record.oldPrice ?? 0);
            return (
              <TableRow key={record.id}>
                <TableCell>
                  {new Date(record.effectiveFrom).toLocaleDateString('en-GB')}
                </TableCell>
                <TableCell align="right">৳{Number(record.oldPrice ?? 0).toFixed(2)}</TableCell>
                <TableCell align="right">৳{Number(record.newPrice ?? 0).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      color: change > 0 ? 'error.main' : 'success.main',
                      fontWeight: 600,
                    }}
                  >
                    {change > 0 ? '+' : ''}
                    ৳{Number(change).toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FuelPricesPage;
