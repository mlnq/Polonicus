import { useTranslation } from 'react-i18next'
 
export const useLanguageChange = (): [(language: string) => void, string] => {
  const { i18n } = useTranslation()
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }
  const currentLanguage = i18n.language;
  
  return [changeLanguage, currentLanguage]
}