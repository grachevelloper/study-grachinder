import '~shared/config/i18n';
import Routes from '~shared/config/routes';
import {ThemeProvider} from '~shared/providers/Theme';

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
