import { LocaleContext } from "#context/localeContext"
import { act, renderHook } from "@testing-library/react"
import { useState } from "react"
import de from "../i18n/de.json"
import en from "../i18n/en.json"
import { useTranslation } from "./useTranslation"

const languages = { en, de }

const ContextWrapper = ({ children }) => {
  const [language, setLanguage] = useState("en")

  return (
    <LocaleContext.Provider
      value={{ translate: languages[language], language, setLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

describe("useTranslation hook", () => {
  test("should use translation context", () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ContextWrapper,
    })

    expect(result.current.translate).toEqual(languages[result.current.language])
    expect(result.current.language).toBe("en")
    act(() => {
      result.current.setLanguage("de")
    })
    expect(result.current.language).toBe("de")
  })

  test("should translate common properties correctly", () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ContextWrapper,
    })

    expect(result.current.commonProperties).toEqual(
      languages.en.commonProperties,
    )
    act(() => {
      result.current.setLanguage("de")
    })
    expect(result.current.commonProperties).toEqual(
      languages.de.commonProperties,
    )
  })

  test("should translate common buttons correctly", () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ContextWrapper,
    })

    expect(result.current.commonButtons).toEqual(languages.en.commonButtons)
    act(() => {
      result.current.setLanguage("de")
    })
    expect(result.current.commonButtons).toEqual(languages.de.commonButtons)
  })

  test("should translate components correctly", () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ContextWrapper,
    })
    expect(result.current.components).toEqual(languages.en.components)
    act(() => {
      result.current.setLanguage("de")
    })
    expect(result.current.components).toEqual(languages.de.components)
  })

  test("should translate pages correctly", () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ContextWrapper,
    })
    expect(result.current.pages).toEqual(languages.en.pages)
    act(() => {
      result.current.setLanguage("de")
    })
    expect(result.current.pages).toEqual(languages.de.pages)
  })
})
