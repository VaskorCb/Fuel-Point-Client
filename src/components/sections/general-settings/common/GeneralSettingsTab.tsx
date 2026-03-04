import { MouseEventHandler } from 'react';
import Tab, { tabClasses, TabOwnProps } from '@mui/material/Tab';

interface GeneralSettingsTabProps extends TabOwnProps {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}
const GeneralSettingsTab = (props: GeneralSettingsTabProps) => {
  return (
    <Tab
      {...props}
      sx={{
        px: 3,
        py: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 2,
        borderRadius: 2,
        fontWeight: 700,
        color: 'text.primary',
        bgcolor: 'background.elevation2',
        [`&.${tabClasses.selected}`]: {
          bgcolor: 'background.elevation3',
          color: 'inherit',
        },
        [`& .${tabClasses.icon}`]: {
          mb: 0,
        },
        maxWidth: 1,
        ...props.sx,
      }}
    />
  );
};

export default GeneralSettingsTab;
