'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack } from '@mui/icons-material';
import { useEmployee } from 'services/employees/employees.hooks';
import paths from 'routes/paths';
import type { Employee } from 'types/petrol-pump';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = Number(params.id);

  const { data: employeeResponse, isLoading } = useEmployee(employeeId);
  const employee: Employee | undefined = employeeResponse?.data;

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

  if (!employee) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Employee not found.
        </Alert>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => router.push(paths.employees)}>
          Back to Employees
        </Button>
      </Box>
    );
  }

  const totalShifts = employee._count?.shifts ?? 0;
  const totalSales = employee._count?.sales ?? 0;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => router.push(paths.employees)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {employee.name}
        </Typography>
        <Chip
          label={employee.isActive ? 'Active' : 'Inactive'}
          color={employee.isActive ? 'success' : 'default'}
          size="small"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Employee Info Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Employee Information
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">{employee.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{employee.phone}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    NID Number
                  </Typography>
                  <Typography variant="body1">{employee.nid || '-'}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Designation
                  </Typography>
                  <Typography variant="body1">{employee.designation || '-'}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Joining Date
                  </Typography>
                  <Typography variant="body1">
                    {employee.joiningDate
                      ? new Date(employee.joiningDate).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '-'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Salary
                  </Typography>
                  <Typography variant="body1">
                    {employee.salary != null ? `৳${Number(employee.salary).toLocaleString('en-BD')}` : '-'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{employee.address || '-'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Cards */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Shifts
                </Typography>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {totalShifts.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  shifts completed
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Sales
                </Typography>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {totalSales.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  transactions processed
                </Typography>
              </CardContent>
            </Card>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
