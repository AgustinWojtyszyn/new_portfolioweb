export const languages = ['es', 'en'] as const;
export type Language = typeof languages[number];
export const isLanguage = (value: string): value is Language => languages.includes(value as Language);
export const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
export const identity = {
  name: 'Agustín Fernando Wojtyszyn', email: 'agustinwojtyszyn99@gmail.com',
  github: 'https://github.com/AgustinWojtyszyn',
  linkedin: 'https://www.linkedin.com/in/agustin-wojtyszyn-87b524247/',
  whatsapp: 'https://wa.me/542645085087',
};
export const pick = <T,>(lang: Language, es: T, en: T): T => lang === 'es' ? es : en;
