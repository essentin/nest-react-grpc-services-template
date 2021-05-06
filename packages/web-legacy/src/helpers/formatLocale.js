export function formatLocale(locale) {
  const localeDict = {
    'en-US': 'English',
    'sv-SV': 'Svenska'
  };

  return localeDict[locale] || 'English';
}
