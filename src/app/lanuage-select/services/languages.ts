/**
 * Languages codes are ISO_639-1 codes, see http:// en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 * They are written in English to avoid character encoding issues (not a perfect solution)
 */
export const languages = new Set([
  'ru_RU',
  'en_US',
  'en_GB',
]);

export const languagesFull  = [
  {
    id   : 'en_GB',
    title: 'English (UK)',
    flag : 'en_GB',
    shortTitle : 'UK',
    link : 'en-GB'
  },
  {
    id   : 'en_US',
    title: 'English (EN)',
    flag : 'en_US',
    shortTitle : 'US',
    link : 'en-US'
  },
  {
    id   : 'ru_RU',
    title: 'Русский (RU)',
    flag : 'ru_RU',
    shortTitle : 'RU',
    link : 'ru-RU'
  }
];

