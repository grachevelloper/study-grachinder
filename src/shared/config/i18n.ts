
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAuth from '~locales/en/auth.json';
import enCommon from '~locales/en/common.json';
import ruAuth from '~locales/ru/auth.json';
import ruCommon from '~locales/ru/common.json';

export const resources = {
    en: {
        common: enCommon,
        auth: enAuth,
    },
    ru: {
        common: ruCommon,
        auth: ruAuth,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
});

export default i18next;
