import { Language, languages } from "@/context/localeContext"
import { Dispatch, SetStateAction } from "react"

export interface Translation {
  components: Components
  pages: Pages
  commonButtons: CommonButtons
  commonProperties: CommonProperties
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
  translate: (typeof languages)[Language]
}

export interface CommonButtons {
  [key: string]: string
}
export interface Pages {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export interface Components {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export interface CommonProperties {
  [key: string]: string
}
