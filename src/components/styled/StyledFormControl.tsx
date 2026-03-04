'use client';

import FormControl,{ FormControlProps } from '@mui/material/FormControl';
import { formLabelClasses } from '@mui/material/FormLabel';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled((props: FormControlProps) => <FormControl {...props} />)(
  ({ theme }) => ({
    [`& .${formLabelClasses.root}`]: {
      fontWeight: theme.typography.fontWeightMedium,
      transform: 'none !important',
      position: 'static',
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
      [`&.${inputLabelClasses.shrink}`]: {
        transform: 'none !important',
      },
    },
  }),
);

export default StyledFormControl;
