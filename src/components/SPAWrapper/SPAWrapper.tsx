import React from 'react';
import { CircularProgress } from '@mui/material';
//import { AtlasThemeProvider } from '@diligentcorp/atlas-theme-mui';
import { useSession } from '../../hooks/queries/useSession';
import { muiLocales } from '../../locales/muiLocales';
import { FALLBACK_LNG } from '../../locales';
import { AtlasThemeProvider } from '@diligentcorp/atlas-theme-mui';

//import { lensThemeOptions } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/index.js';
import { lensThemeOptions } from '@diligentcorp/atlas-theme-mui/lib/themes/lens';

function SPAWrapper({ children }: { children: React.ReactNode }) {
  const { data, isFetching } = useSession();

  if (isFetching) {
    return <CircularProgress />;
  }

  //return <AtlasThemeProvider locales={muiLocales[data?.locale || FALLBACK_LNG]}>{children}</AtlasThemeProvider>;
  return (
    <AtlasThemeProvider themeOptions={lensThemeOptions} locales={muiLocales[data?.locale || FALLBACK_LNG]}>
      {children}
    </AtlasThemeProvider>
  );
}

export default SPAWrapper;
