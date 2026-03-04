import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { statementFooterDefaultValues } from 'data/general-settings/combined';

const Editor = dynamic(() => import("components/base/Editor"), { ssr: false });

const statementFooterSchema = yup.object().shape({
  statementTermsAndConditions: yup.string().required('Terms and conditions are required'),
});

type StatementFooterFormValues = yup.InferType<typeof statementFooterSchema>;

const StatementFooter = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<StatementFooterFormValues>({
    resolver: yupResolver(statementFooterSchema),
    defaultValues: statementFooterDefaultValues,
  });

  const watchedValues = watch();

  const onSubmit = (data: StatementFooterFormValues) => {
    console.log('Statement Footer Settings:', data);
  };

  return (
    <form id="terms-and-conditions-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Box id="field-statement-terms" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Terms and Conditions</Typography>
          <Controller
            name="statementTermsAndConditions"
            control={control}
            render={({ field }) => (
              <Editor
                editorHeight={100}
                initialContent={watchedValues.statementTermsAndConditions}
                onChange={field.onChange}
                isValid={!errors.statementTermsAndConditions}
              />
            )}
          />
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '12px', fontWeight: 600, textAlign: 'right' }}>Max: 100 char</Typography>
        </Box>
      </Stack>
    </form>
  );
};

export default StatementFooter;
