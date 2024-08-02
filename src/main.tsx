import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './routes/App.tsx';
import SPAWrapper from './components/SPAWrapper';
import queryClient from './queryClient.ts';
import setupI18next from './helpers/setupI18next.ts';
import addScript from './helpers/addScript.ts';
import setupMSW from './helpers/setupMSW.ts';
import AppConfig from './AppConfig.ts';

import './index.css';

const Counter = lazy(() => import('./routes/Counter.tsx'));
const Cards = lazy(() => import('./routes/Cards.tsx'));

setupI18next();
addScript(AppConfig.pendoMonitorScript);
addScript(AppConfig.microFrontends['hb-global-navigator'].url);

if (process.env.NODE_ENV === 'development') {
  await setupMSW();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SPAWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
          </Routes>
        </BrowserRouter>
      </SPAWrapper>
    </QueryClientProvider>
  </React.StrictMode>,
);
