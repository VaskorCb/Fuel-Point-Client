import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon'
import NumberTextField from 'components/base/NumberTextField'
import StyledTextField from 'components/styled/StyledTextField'
import { Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { SalesTaxFormValues } from 'types/general-settings'

export default function TaxRateConfiguration({ taxrateCurrency }: { taxrateCurrency: string[] }) {
    const { control, setValue, unregister } = useFormContext<SalesTaxFormValues>();
    const [showAdditionalTax, setShowAdditionalTax] = useState(false);

    const handleAddAdditionalTax = () => {
        setValue('taxRateConfiguration.r2TaxRate.additionalTax', '0.00');
        setShowAdditionalTax(true);
    };

    const handleRemoveAdditionalTax = () => {
        unregister('taxRateConfiguration.r2TaxRate.additionalTax');
        setShowAdditionalTax(false);
    };

    return (
        <Box>
            <Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconifyIcon icon="material-symbols:document-scanner-outline-rounded" sx={{ fontSize: 24, color: 'text.primary' }} />
                    <Typography variant="h6" fontWeight={700}>Tax Rate Configuration</Typography>
                </Box>
                <Typography pt={1} variant="body2" color="text.secondary">Set up and tweak your tax rates easily, so your invoices stay accurate and everything stays compliant without the headache.</Typography>
            </Box>
            <Stack direction="column" gap={2} sx={{ mt: 3 }}>
                <Stack direction="row" gap={1} alignItems="end" width={'100%'}>
                    <Box>
                        <Controller
                            name="taxRateConfiguration.r1TaxRate.currency"
                            control={control}
                            render={({ field }) => (
                                <StyledTextField
                                    {...field}
                                    size="large"
                                    label="Tax Rate (R1)"
                                    select
                                    sx={{ width: 90 }}
                                >
                                    {taxrateCurrency.map((currency) => (
                                        <MenuItem key={currency} value={currency}>
                                            {currency}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            )}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Controller
                            name="taxRateConfiguration.r1TaxRate.rate"
                            control={control}
                            render={({ field }) => (
                                <NumberTextField id="field-tax-rate-r1" variant='custom' size='large' fullWidth {...field} />
                                // <StyledTextField type='number' size='large' fullWidth {...field} />
                            )}
                        />
                    </Box>
                </Stack>

                <Box>
                    <Typography fontWeight={500} fontSize={12} mb={1} color="text.secondary">Tax Rate (R2)</Typography>
                    <Stack direction="column" gap={1} width="100%">
                        <Stack direction="row" gap={1} width="100%">
                            <Box>
                                <Controller
                                    name="taxRateConfiguration.r2TaxRate.currency"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextField {...field} size="large" select sx={{ width: 90 }}>
                                            {taxrateCurrency.map((currency) => (
                                                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Controller
                                    name="taxRateConfiguration.r2TaxRate.rate"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberTextField id="field-tax-rate-r2" variant="custom" size="large" fullWidth {...field} />
                                    )}
                                />
                            </Box>
                        </Stack>
                        {showAdditionalTax ? (
                            <Box sx={{ width: '100%', pl: '98px', display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Controller
                                    name="taxRateConfiguration.r2TaxRate.additionalTax"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberTextField variant="custom" size="large" fullWidth {...field} placeholder="Additional tax" />
                                    )}
                                />
                                <IconButton onClick={handleRemoveAdditionalTax} aria-label="Remove additional tax">
                                    <IconifyIcon icon="material-symbols:delete-outline-rounded" sx={{ fontSize: 16, color: 'text.secondary' }} />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="text" size="small" onClick={handleAddAdditionalTax} startIcon={<IconifyIcon icon="material-symbols:add-rounded" sx={{ fontSize: 24 }} />}>
                                    Additional tax
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </Box>

                <Stack direction="row" gap={1} alignItems="end" width={'100%'}>
                    <Box>
                        <Controller
                            name="taxRateConfiguration.r3TaxRate.currency"
                            control={control}
                            render={({ field }) => (
                                <StyledTextField {...field} size='large' label="Tax Rate (R3)" select sx={{ width: 90 }}>
                                    {taxrateCurrency.map((currency) => (
                                        <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                    ))}
                                </StyledTextField>
                            )}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Controller
                            name="taxRateConfiguration.r3TaxRate.rate"
                            control={control}
                            render={({ field }) => (
                                <NumberTextField id="field-tax-rate-r3" variant='custom' size='large' fullWidth {...field} />
                            )}
                        />
                    </Box>
                </Stack>



            </Stack>
        </Box>
    )
}