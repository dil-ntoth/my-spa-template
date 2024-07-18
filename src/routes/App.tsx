import { Link, Outlet } from 'react-router-dom';
import { Box, Link as MUILink } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlobalNavigator from '../components/GlobalNav/GlobalNav';
import { useSession } from '../hooks/queries/useSession';
import React from 'react';
import { Button, ButtonGroup, Drawer, Typography, useTheme, TextField } from '@mui/material';
import type { LensTheme } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/types';

import './App.css';

function App() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const theme = useTheme<LensTheme>();

  if (theme.atlasThemeName !== 'lens') return <ThemeDisclaimer />;

  const SideSheetPresets = theme.presets.SideSheetPresets;
  const { size, components } = SideSheetPresets;
  const { Header, Content, Footer } = components;

  const DrawerExample = (
    <>
      <Header
        onClose={toggleDrawer(!open)}
        titleText="Title"
        closeButtonProps={{ 'aria-label': 'Close side sheet', 'aria-controls': 'sideSheetId' }}
      />
      <Typography variant="h3">hello</Typography>
      <TextField name="asd" inputProps={{ onBlur: () => console.log('unblur event fired') }} />
    </>
  );

  return (
    <>
      <GlobalNavigator />
      <main>
        <Typography variant="h1">{t('title')}</Typography>
        <Box>
          <code>{JSON.stringify(session)}</code>
        </Box>
        <Box>
          <MUILink component={Link} to="/counter">
            Show Counter example
          </MUILink>
        </Box>
        <Box>
          <MUILink component={Link} to="/cards">
            Show Cards example
          </MUILink>
        </Box>
        <Drawer open={open} onClose={toggleDrawer(!open)}>
          {DrawerExample}
        </Drawer>
        <Outlet />
      </main>
    </>
  );
}

export default App;
