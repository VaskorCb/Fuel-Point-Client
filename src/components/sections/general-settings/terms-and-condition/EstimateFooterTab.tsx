import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { estimateFooterDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const estimateFooterSchema = yup.object().shape({
  termsAndConditions: yup.string().required('Terms and conditions are required'),
  otherInformation: yup.string().required('Other information is required'),
});

type EstimateFooterFormValues = yup.InferType<typeof estimateFooterSchema>;

const EstimateFooter = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EstimateFooterFormValues>({
    resolver: yupResolver(estimateFooterSchema),
    defaultValues: estimateFooterDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: EstimateFooterFormValues) => {
    console.log('Estimate Footer Settings:', data);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box id="field-estimate-terms" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Terms and Conditions</Typography>
          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={300}
                initialContent={watchedValues.termsAndConditions}
                onChange={field.onChange}
                isValid={!errors.termsAndConditions}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 970 char</Typography>
        </Box>
        <Box id="field-estimate-other-info" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Other Information</Typography>
          <Controller
            name="otherInformation"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.otherInformation}
                onChange={field.onChange}
                isValid={!errors.otherInformation}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 330 char</Typography>
        </Box>
      </Stack>
    </form>
  );
};

export default EstimateFooter;
