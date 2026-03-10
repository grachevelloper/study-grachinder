import {ConfigProvider} from 'antd';
import React, {createContext, useContext} from 'react';

import {
  type CustomThemeConfig,
  type ThemeMode,
  themes,
} from '~shared/config/styles';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';

interface ThemeContextType {
  theme: CustomThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'theme',
    'light'
  );

  const theme = themes[themeMode];

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
