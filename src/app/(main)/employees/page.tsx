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
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import {
  useEmployees,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from 'services/employees/employees.hooks';
import paths from 'routes/paths';
import type { CreateEmployeePayload, Employee } from 'types/petrol-pump';

const initialForm = {
  name: '',
  phone: '',
  nid: '',
  address: '',
  designation: '',
  salary: '',
  joiningDate: new Date().toISOString().split('T')[0],
};

export default function EmployeesPage() {
  const { data: employeesResponse, isLoading } = useEmployees();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  const employees: Employee[] = employeesResponse?.data ?? [];

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(initialForm);

  // Delete confirm
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      phone: employee.phone,
      nid: employee.nid ?? '',
      address: employee.address ?? '',
      designation: employee.designation ?? '',
      salary: employee.salary != null ? String(employee.salary) : '',
      joiningDate: employee.joiningDate ? employee.joiningDate.split('T')[0] : '',
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateEmployee.mutate(
        {
          id: editingId,
          data: {
            name: form.name,
            phone: form.phone,
            nid: form.nid || undefined,
            address: form.address || undefined,
            designation: form.designation || undefined,
            salary: form.salary ? Number(form.salary) : undefined,
            joiningDate: form.joiningDate,
          },
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
            resetForm();
          },
        },
      );
    } else {
      const payload: CreateEmployeePayload = {
        name: form.name,
        phone: form.phone,
        nid: form.nid || undefined,
        address: form.address || undefined,
        designation: form.designation || undefined,
        salary: form.salary ? Number(form.salary) : undefined,
        joiningDate: form.joiningDate,
      };
      createEmployee.mutate(payload, {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
        },
      });
    }
  };

  const handleDelete = () => {
    if (!deletingId) return;
    deleteEmployee.mutate(deletingId, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setDeletingId(null);
      },
    });
  };

  const columns: GridColDef<Employee>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          component={Link}
          href={`${paths.employees}/${params.row.id}`}
          sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
      minWidth: 130,
      valueFormatter: (value: string) => value || '-',
    },
    {
      field: 'salary',
      headerName: 'Salary',
      flex: 1,
      minWidth: 110,
      valueFormatter: (value: number | undefined) =>
        value != null ? `${value.toLocaleString()} BDT` : '-',
    },
    {
      field: 'joiningDate',
      headerName: 'Joining Date',
      flex: 1,
      minWidth: 120,
      valueFormatter: (value: string) =>
        value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            component={Link}
            href={`${paths.employees}/${params.row.id}`}
            color="primary"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => openEditDialog(params.row)}
            color="info"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => { setDeletingId(params.row.id); setDeleteDialogOpen(true); }}
            color="error"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openAddDialog}>
          Add Employee
        </Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : employees.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No employees found. Add your first employee to get started.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={employees}
              columns={columns}
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Employee Dialog */}
      <Dialog open={dialogOpen} onClose={() => { setDialogOpen(false); resetForm(); }} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                value={form.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="NID Number"
                value={form.nid}
                onChange={(e) => handleFormChange('nid', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Designation"
                value={form.designation}
                onChange={(e) => handleFormChange('designation', e.target.value)}
                fullWidth
                placeholder="e.g., Pump Operator, Manager, Cashier"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Salary (BDT)"
                type="number"
                value={form.salary}
                onChange={(e) => handleFormChange('salary', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Joining Date"
                type="date"
                value={form.joiningDate}
                onChange={(e) => handleFormChange('joiningDate', e.target.value)}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Address"
                value={form.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDialogOpen(false); resetForm(); }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !form.name ||
              !form.phone ||
              !form.joiningDate ||
              createEmployee.isPending ||
              updateEmployee.isPending
            }
          >
            {(createEmployee.isPending || updateEmployee.isPending) ? 'Saving...' : editingId ? 'Update' : 'Add Employee'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false); setDeletingId(null); }} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDeleteDialogOpen(false); setDeletingId(null); }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteEmployee.isPending}
          >
            {deleteEmployee.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

