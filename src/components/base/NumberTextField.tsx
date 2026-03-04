import { inputBaseClasses } from '@mui/material/InputBase';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import StyledTextField from 'components/styled/StyledTextField';

interface NumberTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: TextFieldProps['variant'] | 'custom';
  hideSpinButton?: boolean;
}

const NumberTextField = ({
  onChange,
  variant,
  sx,
  hideSpinButton = true,
  ref,
  ...rest
}: NumberTextFieldProps) => {
  const Component = variant === 'custom' ? StyledTextField : TextField;
  return (
    <Component
      ref={ref}
      type="number"
      variant={variant === 'custom' ? 'filled' : variant}
      onKeyDown={(e) => {
        if (["e", "E", "+", "-"].includes(e.key)) {
          e.preventDefault();
        }
      }}
      onChange={(event) => {
        let value = event.target.value;
      
        // Allow empty
        if (value === "") {
          onChange?.(event);
          return;
        }
      
        // Remove leading zeros but allow decimal like 0.5
        if (!value.startsWith("0.") && !value.includes(".")) {
          value = value.replace(/^0+(?=\d)/, "");
        }
      
        onChange?.({
          ...event,
          target: {
            ...event.target,
            value,
          },
        });
      }}
      sx={[
        hideSpinButton && {
          '& ::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
            display: 'none',
          },
          [`& .${inputBaseClasses.input}`]: {
            MozAppearance: 'textfield',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
};

export default NumberTextField;
