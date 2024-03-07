import useLocaleContext from "#context/localeContext"

export const useTranslation = () => {
  const { translate, language, setLanguage } = useLocaleContext()
  const commonProperties = translate.commonProperties
  const commonButtons = translate.commonButtons
  const components = translate.components
  const pages = translate.pages
  return {
    translate,
    language,
    setLanguage,
    commonProperties,
    commonButtons,
    components,
    pages,
  }
}
