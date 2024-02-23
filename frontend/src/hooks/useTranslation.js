import useLocaleContext from "#context/localeContext"

export const useTranslation = () => {
  const { translate, language, setLanguage } = useLocaleContext()

  return { translate, language, setLanguage }
}
