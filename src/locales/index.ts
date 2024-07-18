interface Translation {
  translation: Record<string, unknown>;
}

interface Locale {
  [key: string]: Translation;
}

const importedLocales = import.meta.glob<Record<string, Locale>>('./*.yml', { eager: true });
const locales = {};

for (const file in importedLocales) {
  Object.assign(locales, importedLocales[file].default);
}

export const FALLBACK_LNG = 'en';

export default locales;
