import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Counter() {
  const [count, setCount] = React.useState(0);
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
          {t('count_is', { count })}
        </Button>
      </Box>
    </>
  );
}

export default Counter;
