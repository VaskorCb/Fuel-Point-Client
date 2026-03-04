import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TaxRateConfiguration from './TaxRateConfiguration'
import ApplyTaxes from './ApplyTaxes';
import { FormProvider, useForm } from 'react-hook-form';
import { SalesTaxFormValues } from 'types/general-settings';
import { salesTaxData } from 'data/general-settings/combined';

const SalesTax = () => {

  const taxrateCurrency = ["%", "$"];
  const taxType = ["R1", "R2", "R3"];

  const methods = useForm<SalesTaxFormValues>({
    defaultValues: salesTaxData,
  });

  const onSubmit = (data: SalesTaxFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ mx: 3 }}>
        <Box component="form" id="sales-tax-form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ maxWidth: 584, mx: 'auto', py: 4 }}>
          <TaxRateConfiguration taxrateCurrency={taxrateCurrency} />
          <Divider sx={{ my: 4 }} />
          <ApplyTaxes taxType={taxType} />
        </Box>
      </Box>
    </FormProvider>
  )
}

export default SalesTax