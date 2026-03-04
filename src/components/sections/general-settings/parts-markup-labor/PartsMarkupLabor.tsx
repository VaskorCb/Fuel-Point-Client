import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SmartMarkup from './SmartMarkup'
import { PartsMarkupLaborFormValues } from 'types/general-settings'
import { FormProvider, useForm } from 'react-hook-form'
import LaborRates from './LaborRates'
import { partsMarkupLaborData } from 'data/general-settings/combined'

const PartsMarkupLabor = () => {

  const methods = useForm<PartsMarkupLaborFormValues>({
    defaultValues: partsMarkupLaborData,
  });

  const onSubmit = (data: PartsMarkupLaborFormValues) => {
    console.log(data);
  }

  const currency = ["%", "$"];
  return (
    <FormProvider {...methods}>
      <Box sx={{ mx: 3 }}>
        <Box component="form" id="parts-markup-labor-form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ maxWidth: 584, mx: 'auto', py: 4 }}>
          <SmartMarkup currency={currency} />
          <Divider sx={{ my: 4 }} />
          <LaborRates currency={currency} />
        </Box>
      </Box>
    </FormProvider>
  )
}

export default PartsMarkupLabor