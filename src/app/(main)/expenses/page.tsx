'use client';

import React, { useState } from 'react';
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
  IconButton,
  MenuItem,
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
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
  useExpenseSummary,
} from 'services/expenses/expenses.hooks';
import { Expense, CreateExpensePayload } from 'types/petrol-pump';
import { useTranslation } from 'react-i18next';

const CATEGORIES = ['ELECTRICITY', 'SALARY', 'MAINTENANCE', 'TRANSPORT', 'RENT', 'FUEL', 'OTHER'];

const categoryColorMap: Record<string, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'> = {
  ELECTRICITY: 'warning',
  SALARY: 'primary',
  MAINTENANCE: 'info',
  TRANSPORT: 'secondary',
  RENT: 'error',
  FUEL: 'success',
  OTHER: 'default',
};

const initialFormState = {
  category: '',
  description: '',
  amount: '',
  paidBy: '',
  date: new Date().toISOString().split('T')[0],
};

const ExpensesPage = () => {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: expensesData, isLoading, error } = useExpenses({});
  const { data: summaryData, isLoading: summaryLoading } = useExpenseSummary(currentMonth, currentYear);
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(initialFormState);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const expenses: Expense[] = expensesData?.data ?? [];
  const summary = summaryData?.data;

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: t('date'),
      flex: 1,
      minWidth: 110,
      renderCell: (params) => new Date(params.value).toLocaleDateString('en-GB'),
    },
    {
      field: 'category',
      headerName: t('category'),
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={categoryColorMap[params.value] ?? 'default'}
          size="small"
          variant="outlined"
        />
      ),
    },
    { field: 'description', headerName: t('description'), flex: 2, minWidth: 200 },
    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1,
      minWidth: 110,
      type: 'number',
      renderCell: (params) => `৳${(params.value ?? 0).toLocaleString()}`,
    },
    {
      field: 'paidBy',
      headerName: t('paid_by'),
      flex: 1,
      minWidth: 120,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(params.row as Expense);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              setDeletingId(params.row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setForm({
      category: expense.category,
      description: expense.description,
      amount: String(expense.amount),
      paidBy: expense.paidBy ?? '',
      date: expense.date ? expense.date.split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(initialFormState);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    const payload: CreateExpensePayload = {
      category: form.category,
      description: form.description,
      amount: Number(form.amount),
      paidBy: form.paidBy || undefined,
      date: form.date,
    };

    try {
      if (editingId) {
        await updateExpense.mutateAsync({ id: editingId, data: payload });
      } else {
        await createExpense.mutateAsync(payload);
      }
      setDialogOpen(false);
      setEditingId(null);
      setForm(initialFormState);
    } catch {
      // error handled by mutation
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteExpense.mutateAsync(deletingId);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('expenses')}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          {t('add_expense')}
        </Button>
      </Box>

      {/* Expense List */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{t('failed_load_expenses')}</Alert>
          ) : expenses.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_expenses_found')}
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={expenses}
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

      {/* Monthly Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('monthly_summary')} ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {summaryLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : !summary || summary.categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('no_expense_data')}
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('category')}</TableCell>
                    <TableCell align="right">{t('total')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.categories.map((cat) => (
                    <TableRow key={cat.category}>
                      <TableCell>
                        <Chip
                          label={cat.category}
                          color={categoryColorMap[cat.category] ?? 'default'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">৳{cat.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {t('grand_total')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        ৳{summary.grandTotal.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Expense Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? t('edit_expense') : t('add_expense')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('category')}
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                select
                required
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('amount_currency')}
                name="amount"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('description')}
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('paid_by')}
                name="paidBy"
                value={form.paidBy}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label={t('date')}
                name="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                type="date"
                required
                slotProps={{ inputLabel: { shrink: true } }}
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
              !form.category || !form.description || !form.amount || createExpense.isPending || updateExpense.isPending
            }
          >
            {createExpense.isPending || updateExpense.isPending ? t('saving') : editingId ? t('save_changes') : t('save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs">
        <DialogTitle>{t('delete_expense')}</DialogTitle>
        <DialogContent>
          <Typography>{t('delete_confirm_msg')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel')}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteExpense.isPending}
          >
            {deleteExpense.isPending ? t('deleting') : t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpensesPage;
