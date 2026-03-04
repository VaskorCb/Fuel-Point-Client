'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import { useSettingsContext } from 'providers/SettingsProvider';

const SidenavCollapse = () => {
  const [isHovered, setIsHovered] = useState(false);
  const svgRef = useRef(null);
  const {
    config: { sidenavCollapsed, textDirection },
    toggleNavbarCollapse,
  } = useSettingsContext();

  const paths = {
    vertical: 'M8 4v16',
    chevronRight: 'M8 6l6 6-6 6',
    chevronLeft: 'M14 6l-6 6 6 6',
  };

  const targetPath = isHovered
    ? sidenavCollapsed
      ? textDirection === 'rtl'
        ? paths.chevronLeft
        : paths.chevronRight
      : textDirection === 'rtl'
        ? paths.chevronRight
        : paths.chevronLeft
    : paths.vertical;

  return (
    <ButtonBase
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleNavbarCollapse}
      disableRipple
      sx={{
        width: 40,
        flexShrink: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: -30,
        height: 80,
        borderRadius: 0,
        textAlign: 'center',
        p: '0px !important',
      }}
    >
      <Tooltip
        open={isHovered}
        title={sidenavCollapsed ? 'Expand' : 'Collapse'}
        placement="right"
        slotProps={{
          tooltip: {},
          popper: {
            sx: {
              cursor: 'pointer',
            },
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -8],
                },
              },
            ],
          },
        }}
      >
        <Box
          component="svg"
          ref={svgRef}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          sx={{
            width: 24,
            stroke: (theme) => theme.vars.palette.background.elevation4,
            height: 24,
          }}
        >
          <path
            d={targetPath}
            style={{ transition: 'd 0.3s ease-out' }}
          />
        </Box>
      </Tooltip>
    </ButtonBase>
  );
};

export default SidenavCollapse;
