import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { invoiceFooterDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const invoiceFooterSchema = yup.object().shape({
  invoiceTermsAndConditions: yup.string().required('Terms and conditions are required'),
  invoiceOtherInformation: yup.string().required('Other information is required'),
  invoiceStateRequirement: yup.string().required('State requirement is required'),
});

type InvoiceFooterFormValues = yup.InferType<typeof invoiceFooterSchema>;

const InvoiceFooter = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InvoiceFooterFormValues>({
    resolver: yupResolver(invoiceFooterSchema),
    defaultValues: invoiceFooterDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: InvoiceFooterFormValues) => {
    console.log('Invoice Footer Settings:', data);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box id="field-invoice-footer-terms" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Terms and Conditions</Typography>
          <Controller
            name="invoiceTermsAndConditions"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={300}
                initialContent={watchedValues.invoiceTermsAndConditions}
                onChange={field.onChange}
                isValid={!errors.invoiceTermsAndConditions}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 970 char</Typography>
        </Box>
        <Box id="field-invoice-footer-other-info" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Other Information</Typography>
          <Controller
            name="invoiceOtherInformation"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.invoiceOtherInformation}
                onChange={field.onChange}
                isValid={!errors.invoiceOtherInformation}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 330 char</Typography>
        </Box>
        <Box id="field-invoice-footer-state-req" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>State requirement</Typography>
          <Controller
            name="invoiceStateRequirement"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={80}
                initialContent={watchedValues.invoiceStateRequirement}
                onChange={field.onChange}
                isValid={!errors.invoiceStateRequirement}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 70 char</Typography>
        </Box>
      </Stack>
    </form>
  );
};

export default InvoiceFooter;
