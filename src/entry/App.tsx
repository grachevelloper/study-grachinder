import '~shared/config/i18n';
import Routes from '~shared/config/routes';
import {AuthProvider} from '~shared/providers/Auth';
import {ThemeProvider} from '~shared/providers/Theme';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
