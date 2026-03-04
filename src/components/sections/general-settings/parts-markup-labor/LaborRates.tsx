import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconifyIcon from 'components/base/IconifyIcon'
import NumberTextField from 'components/base/NumberTextField'
import StyledTextField from 'components/styled/StyledTextField'
import { Controller, useFormContext } from 'react-hook-form'
import { LaborHourlyRates as LaborHourlyRatesType, PartsMarkupLaborFormValues } from 'types/general-settings'

const fields: { key: keyof LaborHourlyRatesType; label: string; id: string }[] = [
    {
        key: "standard",
        label: "Standard",
        id: "field-labor-rate-standard",
    },
    {
        key: "diessel",
        label: "Diessel",
        id: "field-labor-rate-diessel",
    },
    {
        key: "euro",
        label: "Euro",
        id: "field-labor-rate-euro",
    },
    {
        key: "warranty",
        label: "Warranty",
        id: "field-labor-rate-warranty",
    },
    {
        key: "fleet",
        label: "Fleet",
        id: "field-labor-rate-fleet",
    },
    {
        key: "custom",
        label: "Custom",
        id: "field-labor-rate-custom",
    },
]

const LaborRates = ({ currency }: { currency: string[] }) => {
    const { control } = useFormContext<PartsMarkupLaborFormValues>();
    return (
        <Box>
            <Stack direction="row" gap={1} alignItems="center">
                <IconifyIcon icon="material-symbols:group-outline" sx={{ fontSize: 24, color: 'text.primary' }} />
                <Typography variant="h6" fontWeight={700}>Labor rates</Typography>
            </Stack>
            <Stack direction="column" gap={2} sx={{ mt: 3 }}>
                {
                    fields.map((field) => (

                        <Box key={field.key} id={field.id}>
                            <Typography fontWeight={500} fontSize={12} mb={1} color="text.secondary">{`Hourly rate (${field.label})`}</Typography>
                            <Stack direction="row" gap={1} alignItems="end" width="100%">
                                <Box>
                                    <Controller
                                        name={`laborHourlyRates.${field.key}.currency`}
                                        control={control}
                                        render={({ field }) => (
                                            <StyledTextField
                                                {...field}
                                                select
                                                size="large"
                                                sx={{ width: 90 }}
                                            >
                                                {currency.map((currency) => (
                                                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                                ))}
                                            </StyledTextField>
                                        )}
                                    />
                                </Box>
                                <Box sx={{ width: '100%' }}>

                                    <Controller
                                        name={`laborHourlyRates.${field.key}.rate`}
                                        control={control}
                                        render={({ field }) => (
                                            <NumberTextField
                                                {...field}
                                                variant='custom'
                                                size='large'
                                                fullWidth />
                                        )}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    ))
                }
            </Stack>
        </Box>
    )
}

export default LaborRates