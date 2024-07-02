import { ChangeEvent, Dispatch, SetStateAction } from "react"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const listenInput = <T extends { [key: string]: any }>(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  updatedDataObj: T,
  setUpdatedDataObj: Dispatch<SetStateAction<T>>,
) => {
  setUpdatedDataObj({
    ...updatedDataObj,
    [e.target.name]: e.target.value,
  })
}
