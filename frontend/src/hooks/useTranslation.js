import useLocaleContext from "#context/localeContext"

export const useTranslation = () => {
  const { translate } = useLocaleContext()

  return translate
}
