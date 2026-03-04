import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { warrantyDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const warrantySchema = yup.object().shape({
  warranty: yup.string().required('Warranty is required'),
  limitedWarranty: yup.string().required('Limited warranty is required'),
});

type WarrantyFormValues = yup.InferType<typeof warrantySchema>;

const WarrantyTab = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WarrantyFormValues>({
    resolver: yupResolver(warrantySchema),
    defaultValues: warrantyDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: WarrantyFormValues) => {
    console.log('Warranty Settings:', data);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box id="field-warranty" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Warranty</Typography>
          <Controller
            name="warranty"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.warranty}
                onChange={field.onChange}
                isValid={!errors.warranty}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 900 char</Typography>
        </Box>
        <Box id="field-limited-warranty" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Limited Warranty</Typography>
          <Controller
            name="limitedWarranty"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.limitedWarranty}
                onChange={field.onChange}
                isValid={!errors.limitedWarranty}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 1400 char</Typography>
        </Box>
      </Stack>

    </form>
  );
};

export default WarrantyTab;
