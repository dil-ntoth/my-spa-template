import React from 'react';
import { Box } from '@mui/material';

const GLOBAL_NAV_PLACEHOLDER = { height: '40px', background: 'grey' };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hb-global-navigator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function GlobalNavigator(): JSX.Element {
  return (
    <Box
      className="global-nav-wrapper"
      style={
        process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? GLOBAL_NAV_PLACEHOLDER : undefined
      }
    >
      <hb-global-navigator app-origin={window.location.origin} />
    </Box>
  );
}
