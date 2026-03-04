import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon'
import NumberTextField from 'components/base/NumberTextField'
import StyledTextField from 'components/styled/StyledTextField'
import { Controller, useFormContext } from 'react-hook-form'
import { PartsMarkupLaborFormValues, SmartMarkup as SmartMarkupType } from 'types/general-settings'

const fields: { key: keyof SmartMarkupType; label: string; id: string }[] = [
    {
        key: "partsMarkup",
        label: "Parts markup default",
        id: "field-parts-markup-default",
    },
    {
        key: "tiresMarkup",
        label: "Tires markup",
        id: "field-tires-markup",
    },
    {
        key: "fiveToTwentyParts",
        label: "$5 to $20 parts",
        id: "field-five-to-twenty-parts",
    },
    {
        key: "lessThanFiveParts",
        label: "Less than $5 parts",
        id: "field-less-than-five-parts",
    },
]

const SmartMarkup = ({ currency }: { currency: string[] }) => {

    const { control } = useFormContext<PartsMarkupLaborFormValues>();


    return (
        <Box>
            <Stack direction="row" gap={1} alignItems="center">
                <IconifyIcon icon="material-symbols:auto-awesome-outline" sx={{ fontSize: 24, color: 'text.primary' }} />
                <Typography variant="h6" fontWeight={700}>Smart markup</Typography>
            </Stack>
            <Stack direction="column" gap={2} sx={{ mt: 3 }}>
                {
                    fields.map((field) => (

                        <Box key={field.key} id={field.id}>
                            <Typography fontWeight={500} fontSize={12} mb={1} color="text.secondary">{field.label}</Typography>
                            <Stack direction="row" gap={1} alignItems="end" width="100%">
                                <Box>
                                    <Controller
                                        name={`smartMarkup.${field.key}.currency`}
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
                                        name={`smartMarkup.${field.key}.rate`}
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
    );
};

export default SmartMarkup;