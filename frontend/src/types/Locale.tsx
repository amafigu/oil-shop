import { Language, languages } from "@/context/localeContext"
import { Dispatch, SetStateAction } from "react"

export interface Translation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: any
  commonButtons: CommonButtons
  commonProperties: CommonProperties
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
  translate: (typeof languages)[Language]
}

interface CommonButtons {
  [key: string]: string
}

interface CommonProperties {
  [key: string]: string
}
