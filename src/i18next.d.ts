import ruAuth from '~locales/ru/auth.json';
import ruCommon from '~locales/ru/common.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            common: typeof ruCommon,
            auth: typeof ruAuth
        }
    }
}