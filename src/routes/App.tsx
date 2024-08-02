import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlobalNavigator from '../components/GlobalNav/GlobalNav';
import { useSession } from '../hooks/queries/useSession';
import React from 'react';
import { Button, Drawer, Typography, useTheme, TextField } from '@mui/material';
import type { LensTheme } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/types';

import './App.css';

function App() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [onBlurValue, setOnBlurValue] = React.useState(0);

  const theme = useTheme<LensTheme>();

  const SideSheetPresets = theme.presets.SideSheetPresets;
  const { components } = SideSheetPresets;
  const { Header, Content, Footer } = components;

  const DrawerExample = (
    <>
      <Header
        onClose={toggleDrawer(!open)}
        titleText="Drawer tester"
        closeButtonProps={{ 'aria-label': 'Close side sheet', 'aria-controls': 'sideSheetId' }}
      />
      <Content>
        <Typography variant="h5">Blur value: {onBlurValue}</Typography>
        <TextField
          sx={{ width: '450px', p: 0.3, mt: 1 }}
          name="textfield"
          inputProps={{
            onBlur: () => {
              setOnBlurValue(onBlurValue + 1);
              console.log('onBlur event fired');
            },
          }}
        />
      </Content>
      <Footer>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Apply
        </Button>
      </Footer>
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
          <Button
            sx={{ mt: 12 }}
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Open Drawer
          </Button>
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
