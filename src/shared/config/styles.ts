import { type ThemeConfig } from 'antd';

export interface CustomThemeConfig extends ThemeConfig {
    name: 'light' | 'dark';
}

export type ThemeMode = 'light' | 'dark';

const TYPOGRAPHY = {
    fontSizeHeading1: 64,
    fontSizeHeading2: 56,
    fontSizeHeading3: 48,
    fontSizeHeading4: 40,
}

const lightTheme: CustomThemeConfig = {
    name: 'light',
    token: {
        colorInfo: '#3b82f6',
        colorPrimary: '#BC203C',
        colorBgBase: '#ffffff',
        fontSize: 16,
        fontFamily: 'Monomakh, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        Input: {
            activeBg: '#FFEED1',
            addonBg: '#FFEED1',
            colorBgContainerDisabled: '#FFEED1',
            colorBgBase: '#FFEED1',
            colorBgSolid: '#FFEED1',
            colorBgContainer: '#FFEED1',
            activeBorderColor: '#4338ca',
            colorText: '#BC203C',
            colorTextPlaceholder: '##E67D4B',
            activeShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
        },
        Button: {
            colorPrimaryBg: '#BC203C',
            colorPrimary: '#fff'
        },
        Typography: {
            ...TYPOGRAPHY
        }
    },
};

const darkTheme: CustomThemeConfig = {
    name: 'dark',
    token: {
        fontFamily: 'Monomakh, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        Input: {
        },
        Button: {
            colorPrimaryBg: '#BC203C',
            colorPrimary: '#fff'
        },
    },
};

export const themes: Record<ThemeMode, CustomThemeConfig> = {
    light: lightTheme,
    dark: darkTheme,
};