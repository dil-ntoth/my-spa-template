import { Link, Outlet } from 'react-router-dom';
import { Box, Link as MUILink, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlobalNavigator from '../components/GlobalNav/GlobalNav';
import { useSession } from '../hooks/queries/useSession';

import './App.css';

function App() {
  const { t } = useTranslation();
  const { data: session } = useSession();

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
        <Outlet />
      </main>
    </>
  );
}

export default App;
