import '~shared/config/i18n';
import {QueryClientProvider} from '@tanstack/react-query';

import Routes from './routes';

import {ErrorBoundary} from '~components/ErrorBoundary';
import {queryClient} from '~shared/config/api';
import {AuthProvider} from '~shared/providers/Auth';
import {ThemeProvider} from '~shared/providers/Theme';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary scope='global'>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
