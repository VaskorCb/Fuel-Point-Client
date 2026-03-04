import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selfCheckInTermsDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const selfCheckInTermsSchema = yup.object().shape({
  selfCheckInEstimateFooter1: yup.string().required('Estimate footer is required'),
});

type SelfCheckInTermsFormValues = yup.InferType<typeof selfCheckInTermsSchema>;

const SelfCheckInTermsTab = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SelfCheckInTermsFormValues>({
    resolver: yupResolver(selfCheckInTermsSchema),
    defaultValues: selfCheckInTermsDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: SelfCheckInTermsFormValues) => {
    console.log('Self Check-in Terms:', data);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box id="field-self-checkin-footer" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Estimate footer - 1</Typography>
          <Controller
            name="selfCheckInEstimateFooter1"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.selfCheckInEstimateFooter1}
                onChange={field.onChange}
                isValid={!errors.selfCheckInEstimateFooter1}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 1000 char</Typography>
        </Box>
      </Stack>
    </form>
  );
};

export default SelfCheckInTermsTab;
