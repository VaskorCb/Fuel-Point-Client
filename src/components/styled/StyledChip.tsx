import Chip from '@mui/material/Chip';
import { chipClasses } from '@mui/material/Chip';
import { ChipOwnProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

interface StyledChipProps extends ChipOwnProps {
  iconPosition?: 'start' | 'end';
}

const StyledChip = styled((props: StyledChipProps) => <Chip {...props} />, {
  shouldForwardProp: (prop) => prop !== 'iconPosition',
})(({ iconPosition }) => ({
  ...(iconPosition === 'end' && {
    [`& .${chipClasses.icon}`]: {
      order: 1,
    },
  }),
}));

export default StyledChip;
