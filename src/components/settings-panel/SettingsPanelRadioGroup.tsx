import { formControlLabelClasses } from '@mui/material/FormControlLabel';
import { radioClasses } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { RadioGroupProps } from '@mui/material/RadioGroup';

const SettingsPanelRadioGroup = ({ children, ...rest }: RadioGroupProps) => {
  return (
    <RadioGroup
      sx={{
        flexDirection: 'row',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        [`& .${formControlLabelClasses.root}`]: {
          margin: 0,
        },
        [`& .${radioClasses.root}`]: {
          display: 'none',
        },
      }}
      {...rest}
    >
      {children}
    </RadioGroup>
  );
};

export default SettingsPanelRadioGroup;
