import { ElementType, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import { ScrollSpyOffSet, useScrollSpyContext } from '.';

interface ScrollSpyContentInterface extends BoxProps<ElementType, { component?: ElementType }> {
  id: string;
  offset?: ScrollSpyOffSet;
}

export const ScrollSpyContent = ({
  id,
  children,
  offset,
  ...rest
}: PropsWithChildren<ScrollSpyContentInterface>) => {
  const { sectionRefs } = useScrollSpyContext();

  return (
    <Box
      id={id}
      ref={(el) => {
        sectionRefs.current[id] = { element: el as HTMLElement, offset };
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

ScrollSpyContent.componentName = 'ScrollSpyContent';
export default ScrollSpyContent;
