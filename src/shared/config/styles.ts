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
    fontSizeHeading5: 32,
    fontSizeHeading6: 24,
    fontFamilyCode: 'Monomakh, monospace',
}

const DRAWER = {
    padding: 10,
}

const COLORS = {
    burgundy: '#8B2C2C',
    burgundyDark: '#5C1E1E',
    burgundyLight: '#B84C4C',
    white: '#FFFFFF',
    black: '#1A1A1A',
    grayLight: '#F5F3F0',
    gray: '#E8E6E3',
    gold: '#C9A87C',
};

const lightTheme: CustomThemeConfig = {
    name: 'light',
    token: {
        colorPrimary: COLORS.burgundy,
        colorInfo: COLORS.burgundy,
        colorSuccess: '#2D6A4F',
        colorWarning: '#E9B35F',
        colorError: '#C44536',
        colorBgBase: COLORS.white,
        colorBgContainer: COLORS.white,
        colorBgElevated: COLORS.white,
        colorTextBase: COLORS.black,
        colorBgLayout: COLORS.white,
        colorText: COLORS.black,
        colorTextSecondary: '#4A4A4A',
        colorTextTertiary: '#8A8A8A',
        colorTextDisabled: '#C4C4C4',
        colorTextLightSolid: COLORS.white,
        colorBorder: COLORS.gray,
        colorBorderSecondary: '#F0F0F0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        boxShadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.06)',
        fontSize: 16,
        fontSizeSM: 14,
        fontSizeLG: 18,
        fontFamily: 'Monomakh, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontFamilyCode: 'Monomakh, monospace',
        borderRadius: 16,
        borderRadiusSM: 12,
        borderRadiusLG: 24,
        padding: 16,
        paddingSM: 12,
        paddingLG: 24,
        controlHeight: 44,
        controlHeightSM: 36,
        controlHeightLG: 52,
    },
    components: {
        Button: {
            colorPrimary: COLORS.white,
            colorPrimaryBg: COLORS.burgundy,
            colorPrimaryHover: COLORS.burgundyLight,
            colorPrimaryActive: COLORS.burgundyDark,
            borderRadius: 24,
            controlHeight: 44,
            paddingInline: 24,
            fontWeight: 500,
        },
        Input: {
            colorBgContainer: COLORS.grayLight,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
            colorTextPlaceholder: '#8A8A8A',
            activeBorderColor: COLORS.burgundy,
            activeShadow: `0 0 0 2px ${COLORS.burgundy}20`,
            borderRadius: 12,
            controlHeight: 44,
            paddingInline: 16,
        },
        Typography: {
            ...TYPOGRAPHY,
            colorText: COLORS.black,
            colorTextHeading: COLORS.burgundy,
        },
        Card: {
            colorBgContainer: COLORS.white,
            colorBorder: COLORS.gray,
            borderRadius: 24,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        Modal: {
            colorBgMask: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 24,
        },
        Dropdown: {
            borderRadius: 12,
        },
        Menu: {
            colorBgContainer: COLORS.white,
            colorText: COLORS.black,
            colorPrimary: COLORS.burgundy,
            itemBorderRadius: 12,
        },
        Tabs: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
            inkBarColor: COLORS.burgundy,
            itemHoverColor: COLORS.burgundyLight,
            itemSelectedColor: COLORS.burgundy,
        },
        Tag: {
            colorBgBase: COLORS.grayLight,
            colorText: COLORS.black,
            colorPrimary: COLORS.burgundy,
            borderRadius: 16,
        },
        Avatar: {
            colorBgBase: COLORS.gray,
            borderRadius: 100,
        },
        Select: {
            colorBgContainer: COLORS.grayLight,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
            colorTextPlaceholder: '#8A8A8A',
            activeBorderColor: COLORS.burgundy,
            borderRadius: 12,
            controlHeight: 44,
        },
        DatePicker: {
            colorBgContainer: COLORS.grayLight,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
            activeBorderColor: COLORS.burgundy,
            activeShadow: `0 0 0 2px ${COLORS.burgundy}20`,
            borderRadius: 12,
            controlHeight: 44,
        },
        Radio: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
            radioSize: 20,
        },
        Checkbox: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
        },
        Switch: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.white,
        },
        Slider: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
        },
        Progress: {
            colorPrimary: COLORS.burgundy,
        },
        Pagination: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
        },
        Breadcrumb: {
            colorText: COLORS.black,
            colorPrimary: COLORS.burgundy,
        },
        Alert: {
            colorInfoBg: `${COLORS.burgundy}10`,
            colorInfoBorder: COLORS.burgundy,
        },
        Badge: {
            colorBgBase: COLORS.burgundy,
            colorText: COLORS.white,
        },
        Spin: {
            colorPrimary: COLORS.burgundy,
        },
        Upload: {
            colorBgContainer: COLORS.grayLight,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
        },
        Calendar: {
            colorBgContainer: COLORS.white,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
        },
        Timeline: {
            colorText: COLORS.black,
        },
        Collapse: {
            colorBgContainer: COLORS.grayLight,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
        },
        List: {
            colorText: COLORS.black,
        },
        Table: {
            colorBgContainer: COLORS.white,
            colorBorder: COLORS.gray,
            colorText: COLORS.black,
            headerBg: COLORS.grayLight,
        },
        Steps: {
            colorPrimary: COLORS.burgundy,
            colorText: COLORS.black,
        },
        Rate: {
            colorPrimary: COLORS.gold,
        },
        Result: {
            colorText: COLORS.black,
        },
        Statistic: {
            colorText: COLORS.black,
        },
        Drawer: {
            ...DRAWER,
        },
        Tooltip: {
            colorText: COLORS.white,
            borderRadius: 8,
        },
        Popover: {
            colorText: COLORS.black,
            borderRadius: 12,
        },
        Message: {
            colorBgBase: COLORS.white,
            colorText: COLORS.black,
        },
        Notification: {
            colorBgBase: COLORS.white,
            colorText: COLORS.black,
        },
    },
};

const darkTheme: CustomThemeConfig = {
    name: 'dark',
    token: {
        colorPrimary: COLORS.burgundyLight,
        colorInfo: COLORS.burgundyLight,
        colorSuccess: '#2D6A4F',
        colorWarning: '#E9B35F',
        colorError: '#C44536',
        colorBgBase: COLORS.black,
        colorBgContainer: '#2A2A2A',
        colorBgElevated: '#2A2A2A',
        colorTextBase: COLORS.white,
        colorText: COLORS.white,
        colorTextSecondary: '#B0B0B0',
        colorTextTertiary: '#808080',
        colorTextDisabled: '#505050',
        colorTextLightSolid: COLORS.white,
        colorBorder: '#404040',
        colorBorderSecondary: '#353535',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        boxShadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.25)',
        fontSize: 16,
        fontSizeSM: 14,
        fontSizeLG: 18,
        fontFamily: 'Monomakh, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontFamilyCode: 'Monomakh, monospace',
        borderRadius: 16,
        borderRadiusSM: 12,
        borderRadiusLG: 24,
        padding: 16,
        paddingSM: 12,
        paddingLG: 24,
        controlHeight: 44,
        controlHeightSM: 36,
        controlHeightLG: 52,
    },
    components: {
        Button: {
            colorPrimary: COLORS.white,
            colorPrimaryBg: COLORS.burgundyLight,
            colorPrimaryHover: COLORS.burgundy,
            colorPrimaryActive: COLORS.burgundyDark,
            borderRadius: 24,
            controlHeight: 44,
            paddingInline: 24,
            fontWeight: 500,
        },
        Input: {
            colorBgContainer: '#353535',
            colorBorder: '#404040',
            colorText: COLORS.white,
            colorTextPlaceholder: '#808080',
            activeBorderColor: COLORS.burgundyLight,
            activeShadow: `0 0 0 2px ${COLORS.burgundyLight}20`,
            borderRadius: 12,
            controlHeight: 44,
            paddingInline: 16,
        },
        Typography: {
            ...TYPOGRAPHY,
            colorText: COLORS.white,
            colorTextHeading: COLORS.burgundyLight,
        },
        Card: {
            colorBgContainer: '#2A2A2A',
            colorBorder: '#404040',
            borderRadius: 24,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        Modal: {
            colorBgMask: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 24,
        },
        Dropdown: {
            borderRadius: 12,
        },
        Menu: {
            colorBgContainer: '#2A2A2A',
            colorText: COLORS.white,
            colorPrimary: COLORS.burgundyLight,
            itemBorderRadius: 12,
        },
        Tabs: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
            inkBarColor: COLORS.burgundyLight,
            itemHoverColor: COLORS.burgundy,
            itemSelectedColor: COLORS.burgundyLight,
        },
        Tag: {
            colorBgBase: '#353535',
            colorText: COLORS.white,
            colorPrimary: COLORS.burgundyLight,
            borderRadius: 16,
        },
        Avatar: {
            colorBgBase: '#404040',
            borderRadius: 100,
        },
        Select: {
            colorBgContainer: '#353535',
            colorBorder: '#404040',
            colorText: COLORS.white,
            colorTextPlaceholder: '#808080',
            activeBorderColor: COLORS.burgundyLight,
            borderRadius: 12,
            controlHeight: 44,
        },
        DatePicker: {
            colorBgContainer: '#353535',
            colorBorder: '#404040',
            colorText: COLORS.white,
            activeBorderColor: COLORS.burgundyLight,
            activeShadow: `0 0 0 2px ${COLORS.burgundyLight}20`,
            borderRadius: 12,
            controlHeight: 44,
        },
        Radio: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
            radioSize: 20,
        },
        Drawer: {
            ...DRAWER
        },
        Checkbox: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Switch: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Slider: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Progress: {
            colorPrimary: COLORS.burgundyLight,
        },
        Pagination: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Breadcrumb: {
            colorText: COLORS.white,
            colorPrimary: COLORS.burgundyLight,
        },
        Alert: {
            colorInfoBg: `${COLORS.burgundyLight}20`,
            colorInfoBorder: COLORS.burgundyLight,
        },
        Badge: {
            colorBgBase: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Spin: {
            colorPrimary: COLORS.burgundyLight,
        },
        Upload: {
            colorBgContainer: '#353535',
            colorBorder: '#404040',
            colorText: COLORS.white,
        },
        Calendar: {
            colorBgContainer: '#2A2A2A',
            colorBorder: '#404040',
            colorText: COLORS.white,
        },
        Timeline: {
            colorText: COLORS.white,
        },
        Collapse: {
            colorBgContainer: '#353535',
            colorBorder: '#404040',
            colorText: COLORS.white,
        },
        List: {
            colorText: COLORS.white,
        },
        Table: {
            colorBgContainer: '#2A2A2A',
            colorBorder: '#404040',
            colorText: COLORS.white,
            headerBg: '#353535',
        },
        Steps: {
            colorPrimary: COLORS.burgundyLight,
            colorText: COLORS.white,
        },
        Rate: {
            colorPrimary: COLORS.gold,
        },
        Result: {
            colorText: COLORS.white,
        },
        Statistic: {
            colorText: COLORS.white,
        },
        Tooltip: {
            colorText: COLORS.black,
            borderRadius: 8,
        },
        Popover: {
            colorText: COLORS.white,
            borderRadius: 12,
        },
        Message: {
            colorBgBase: '#2A2A2A',
            colorText: COLORS.white,
        },
        Notification: {
            colorBgBase: '#2A2A2A',
            colorText: COLORS.white,
        },
    },
};

export const themes: Record<ThemeMode, CustomThemeConfig> = {
    light: lightTheme,
    dark: darkTheme,
};