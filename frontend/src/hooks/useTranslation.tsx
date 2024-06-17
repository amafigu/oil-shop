import { useLocaleContext } from "@/context/localeContext"
import { Translation } from "@/types/Locale"

export const useTranslation = (): Translation => {
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
