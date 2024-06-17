import { ChangeEvent } from "react"

export const setFileToUpload = (
  event: ChangeEvent,
  setFile: (file: File | null | undefined) => void,
) => {
  const input = event.target as HTMLInputElement
  const file = input.files ? input.files[0] : null
  setFile(file)
}
