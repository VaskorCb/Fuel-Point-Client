'use client';

import { useState } from 'react';
import { Box, Typography, Button, Chip, Card, CardContent, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useShifts } from 'services/shifts/shifts.hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import paths from 'routes/paths';
import dayjs, { Dayjs } from 'dayjs';

const ShiftsPage = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const { data: shiftsData, isLoading } = useShifts(
    selectedDate?.format('YYYY-MM-DD'),
  );

  const columns: GridColDef[] = [
    {
      field: 'startTime',
      headerName: 'Date',
      width: 120,
      valueFormatter: (value: string) => (value ? dayjs(value).format('DD/MM/YYYY') : ''),
    },
    {
      field: 'employee',
      headerName: 'Employee',
      width: 160,
      valueGetter: (_value: unknown, row: { employee?: { name?: string } }) =>
        row.employee?.name ?? '',
    },
    {
      field: 'shiftType',
      headerName: 'Shift Type',
      width: 120,
    },
    {
      field: 'startTimeFormatted',
      headerName: 'Start Time',
      width: 110,
      valueGetter: (_value: unknown, row: { startTime?: string }) =>
        row.startTime ? dayjs(row.startTime).format('hh:mm A') : '',
    },
    {
      field: 'endTimeFormatted',
      headerName: 'End Time',
      width: 110,
      valueGetter: (_value: unknown, row: { endTime?: string }) =>
        row.endTime ? dayjs(row.endTime).format('hh:mm A') : '-',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'ACTIVE' ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'totalSales',
      headerName: 'Total Sales',
      width: 140,
      type: 'number',
      valueFormatter: (value: number) =>
        value != null ? `৳${value.toLocaleString()}` : '-',
    },
    {
      field: '_count',
      headerName: 'Transactions',
      width: 120,
      type: 'number',
      valueGetter: (_value: unknown, row: { _count?: { sales?: number } }) =>
        row._count?.sales ?? 0,
    },
  ];

  const shifts = shiftsData?.data ?? [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Shifts</Typography>
        <Button variant="contained" component={Link} href={paths.shifts_start}>
          Start New Shift
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <DatePicker
          label="Filter by Date"
          value={selectedDate}
          onChange={(val) => setSelectedDate(val ? dayjs(val as Dayjs | Date) : null)}
          slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
        />
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : shifts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No shifts found for the selected date.
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={shifts}
              columns={columns}
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              disableRowSelectionOnClick
              onRowClick={(params) => router.push(`/shifts/${params.id}`)}
              sx={{
                border: 'none',
                '& .MuiDataGrid-row': { cursor: 'pointer' },
              }}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShiftsPage;
