import useLocaleContext from "#context/localeContext"

export const useTranslation = () => {
  const { translate, language, setLanguage } = useLocaleContext()
  const commonProperties = translate.commonProperties
  const components = translate.components
  return { translate, language, setLanguage, commonProperties, components }
}
