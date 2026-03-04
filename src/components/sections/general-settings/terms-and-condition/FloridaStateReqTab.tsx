import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { floridaStateReqDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const floridaStateReqSchema = yup.object().shape({
  writtenEstimate: yup.boolean().required(),
  paymentMethod: yup.boolean().required(),
  saveReplacementParts: yup.boolean().required(),
  estimateFooter1: yup.string().required('Estimate footer 1 is required'),
  estimateFooter2: yup.string().required('Estimate footer 2 is required'),
});

type FloridaStateReqFormValues = yup.InferType<typeof floridaStateReqSchema>;

const FloridaStateReq = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FloridaStateReqFormValues>({
    resolver: yupResolver(floridaStateReqSchema),
    defaultValues: floridaStateReqDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: FloridaStateReqFormValues) => {
    console.log('Florida State Requirements:', data);
  };

  const handleReset = () => {
    setValue('writtenEstimate', false);
    setValue('paymentMethod', false);
    setValue('saveReplacementParts', false);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1, }}>
              <Controller
                name="writtenEstimate"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="field-florida-written-estimate"
                        checked={field.value}
                        onChange={field.onChange}
                        name="writtenEstimate"
                      />
                    }
                    sx={{ color: 'text.secondary' }}
                    label="Your right to a written estimate"
                  />
                )}
              />
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="field-florida-payment-method"
                        checked={field.value}
                        onChange={field.onChange}
                        name="paymentMethod"
                      />
                    }
                    sx={{ color: 'text.secondary' }}
                    label="Intended payment method"
                  />
                )}
              />
              <Controller
                name="saveReplacementParts"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="field-florida-save-parts"
                        checked={field.value}
                        onChange={field.onChange}
                        name="saveReplacementParts"
                      />
                    }
                    sx={{ color: 'text.secondary' }}
                    label="Save replacement parts"
                  />
                )}
              />
            </FormGroup>
          </Box>
          <Box>
            <Button size="small" variant="outlined" color="neutral" sx={{ borderRadius: 1 }} onClick={handleReset}>Reset terms</Button>
          </Box>
        </Box>
        <Box id="field-florida-estimate-footer-1" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Estimate footer - 1</Typography>
          <Controller
            name="estimateFooter1"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.estimateFooter1}
                onChange={field.onChange}
                isValid={!errors.estimateFooter1}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 300 char</Typography>
        </Box>
        <Box id="field-florida-estimate-footer-2" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Estimate footer - 2</Typography>
          <Controller
            name="estimateFooter2"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={110}
                initialContent={watchedValues.estimateFooter2}
                onChange={field.onChange}
                isValid={!errors.estimateFooter2}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 300 char</Typography>
        </Box>
      </Stack>
    </form>
  );
};

export default FloridaStateReq;
