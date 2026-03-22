import ruAuth from '~locales/ru/auth.json';
import ruCommon from '~locales/ru/common.json';
import ruCarousel from '~locales/ru/carousel.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            common: typeof ruCommon,
            auth: typeof ruAuth,
            carousel: typeof ruCarousel
        }
    }
}