import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'
import enErrors from './locales/en/errors.json'
import esAuth from './locales/es/auth.json'
import esCommon from './locales/es/common.json'
import esErrors from './locales/es/errors.json'
import frAuth from './locales/fr/auth.json'
import frCommon from './locales/fr/common.json'
import frErrors from './locales/fr/errors.json'

const buildTranslation = (ns) => ({
	common: ns.common,
	auth: ns.auth,
	errors: ns.errors,
})

const resources = {
	en: {
		translation: buildTranslation({
			common: enCommon,
			auth: enAuth,
			errors: enErrors,
		}),
	},
	es: {
		translation: buildTranslation({
			common: esCommon,
			auth: esAuth,
			errors: esErrors,
		}),
	},
	fr: {
		translation: buildTranslation({
			common: frCommon,
			auth: frAuth,
			errors: frErrors,
		}),
	},
}

i18n.use(LanguageDetector).use(initReactI18next).init({
	resources,
	fallbackLng: 'en',
	debug: false,
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ['localStorage', 'navigator'],
		caches: ['localStorage'],
	},
})

export { i18n }
