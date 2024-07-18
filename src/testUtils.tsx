import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { InitialEntry, MemoryHistory } from 'history';
import { createMemoryHistory } from 'history';
import { Suspense } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { AtlasThemeProvider } from '@diligentcorp/atlas-theme-mui';
import { muiLocales } from './locales/muiLocales';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const cache = new Map();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function ThemeModeProvider({ children }: any) {
  return <AtlasThemeProvider locales={muiLocales['en']}>{children}</AtlasThemeProvider>;
}

export interface ProviderOptions extends RenderOptions {
  initialEntries?: Array<InitialEntry>;
  route?: string;
}

interface ProvidersProps extends ProviderOptions {
  children: React.ReactNode;
  history: MemoryHistory;
}

function Providers({ children, history, route }: ProvidersProps) {
  let Wrapper = (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </QueryClientProvider>
    </Suspense>
  );

  if (route) {
    Wrapper = (
      <Router location={history!.location} navigator={history!}>
        <Routes>
          <Route element={Wrapper} path={route} />
        </Routes>
      </Router>
    );
  }

  return Wrapper;
}

function renderWithProviders(ui: React.ReactElement, options: ProviderOptions = {}) {
  const { initialEntries = [], route, ...rest } = options;
  const history = createMemoryHistory({ initialEntries });

  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <Providers history={history} route={route}>
        {children}
      </Providers>
    ),
    ...rest,
  });

  return {
    ...rtl,
    rerender: (ui: React.ReactElement, rerenderOptions?: ProviderOptions) =>
      renderWithProviders(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
    history,
  };
}

export { renderWithProviders };
