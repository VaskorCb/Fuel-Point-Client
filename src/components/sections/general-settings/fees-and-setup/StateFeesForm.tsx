'use client';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import StyledTextField from 'components/styled/StyledTextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { stateFeesDefaultData, taxableOptions } from 'data/general-settings/combined';

const feeItemSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  autoApply: yup.boolean().required(),
  amount: yup.number().min(0, 'Amount must be 0 or greater').required('Amount is required'),
  taxable: yup.string().required('Taxable status is required'),
  enabled: yup.boolean().required(),
});

const laborItemSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  autoApply: yup.boolean().required(),
  amount: yup.number().min(0, 'Amount must be 0 or greater').required('Amount is required'),
  taxable: yup.string().required('Taxable status is required'),
  enabled: yup.boolean().required(),
});

const stateFeesSchema = yup.object().shape({
  fees: yup.array().of(feeItemSchema).required(),
  laborDescriptions: yup.array().of(laborItemSchema).required(),
});

type FeeItem = yup.InferType<typeof feeItemSchema>;
type LaborItem = yup.InferType<typeof laborItemSchema>;
type StateFeesFormValues = yup.InferType<typeof stateFeesSchema>;

const StateFeesForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StateFeesFormValues>({
    resolver: yupResolver(stateFeesSchema),
    defaultValues: stateFeesDefaultData,
  });

  const [feeRows, setFeeRows] = useState<FeeItem[]>(stateFeesDefaultData.fees);

  const [laborRows, setLaborRows] = useState<LaborItem[]>(stateFeesDefaultData.laborDescriptions);

  const onSubmit = (data: StateFeesFormValues) => {
    console.log('State Fees:', data);
  };

  const feeColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Fee',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return (
          <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#EBF2F5', px: 1.5, py: 0.4, borderRadius: 1 }}>
            <Typography variant="body2" color="text.primary" noWrap>{params.row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'autoApply',
      headerName: 'Auto apply',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      renderCell: (params) => {
        const index = feeRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`fees.${index}.autoApply`}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  const newRows = [...feeRows];
                  newRows[index].autoApply = e.target.checked;
                  setFeeRows(newRows);
                }}
                size="small"
              />
            )}
          />
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: "left",
      align: "center",
      width: 100,
      renderCell: (params) => {
        const index = feeRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`fees.${index}.amount`}
            control={control}
            render={({ field }) => (
              <StyledTextField
                value={field.value}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                  const newRows = [...feeRows];
                  newRows[index].amount = value;
                  setFeeRows(newRows);
                }}
                size="small"
                type="number"
                sx={{ width: 100 }}
                error={!!errors.fees?.[index]?.amount}
                helperText={errors.fees?.[index]?.amount?.message}
              />
            )}
          />
        );
      },
    },
    {
      field: 'taxable',
      headerName: 'Taxable',
      headerAlign: 'left',
      align: 'left',
      width: 100,
      renderCell: (params) => {
        const index = feeRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`fees.${index}.taxable`}
            control={control}
            render={({ field }) => (
              <StyledTextField
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  const newRows = [...feeRows];
                  newRows[index].taxable = e.target.value;
                  setFeeRows(newRows);
                }}
                select
                size="small"
                sx={{ width: 80 }}
              >
                {taxableOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </StyledTextField>
            )}
          />
        );
      },
    },
    {
      field: 'enabled',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: (params) => {
        const index = feeRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`fees.${index}.enabled`}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  const newRows = [...feeRows];
                  newRows[index].enabled = e.target.checked;
                  setFeeRows(newRows);
                }}
                size="small"
              />
            )}
          />
        );
      },
    },
  ];

  const laborColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Labor description (Tire installation)',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return (
          <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#EBF2F5', px: 1.5, py: 0.4, borderRadius: 1 }}>
            <Typography variant="body2" color="text.primary" noWrap>{params.row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'autoApply',
      headerName: 'Auto apply',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const index = laborRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`laborDescriptions.${index}.autoApply`}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  const newRows = [...laborRows];
                  newRows[index].autoApply = e.target.checked;
                  setLaborRows(newRows);
                }}
                size="small"
              />
            )}
          />
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: "left",
      align: "center",
      width: 100,
      renderCell: (params) => {
        const index = laborRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`laborDescriptions.${index}.amount`}
            control={control}
            render={({ field }) => (
              <StyledTextField
                value={field.value}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                  const newRows = [...laborRows];
                  newRows[index].amount = value;
                  setLaborRows(newRows);
                }}
                size="small"
                type="number"
                sx={{ width: 100 }}
                error={!!errors.laborDescriptions?.[index]?.amount}
                helperText={errors.laborDescriptions?.[index]?.amount?.message}
              />
            )}
          />
        );
      },
    },
    {
      field: 'taxable',
      headerName: 'Taxable',
      width: 100,
      renderCell: (params) => {
        const index = laborRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`laborDescriptions.${index}.taxable`}
            control={control}
            render={({ field }) => (
              <StyledTextField
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  const newRows = [...laborRows];
                  newRows[index].taxable = e.target.value;
                  setLaborRows(newRows);
                }}
                select
                size="small"
                sx={{ width: 80 }}
              >
                {taxableOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </StyledTextField>
            )}
          />
        );
      },
    },
    {
      field: 'enabled',
      headerName: 'Action',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const index = laborRows.findIndex(row => row.id === params.row.id);
        return (
          <Controller
            name={`laborDescriptions.${index}.enabled`}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  const newRows = [...laborRows];
                  newRows[index].enabled = e.target.checked;
                  setLaborRows(newRows);
                }}
                size="small"
              />
            )}
          />
        );
      },
    },
  ];

  return (
    <form id="fees-and-setup-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack id="field-state-fees-table" direction="column" spacing={4} sx={{ maxWidth: '704px', mx: 'auto', pb: 3 }}>
        <Box>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={feeRows}
              columns={feeColumns}
              autoHeight
              hideFooter
              disableRowSelectionOnClick
              disableColumnMenu
              sx={{

                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'grey.100',
                  fontWeight: 600,
                },
                '& .MuiDataGrid-cell': {
                  py: 1.5,
                },
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={laborRows}
              columns={laborColumns}
              autoHeight
              hideFooter
              disableRowSelectionOnClick
              disableColumnMenu
              sx={{

                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'grey.100',
                  fontWeight: 600,
                },
                '& .MuiDataGrid-cell': {
                  py: 1.5,
                },
              }}
            />
          </Box>
        </Box>
      </Stack>
    </form>
  );
};

export default StateFeesForm;
