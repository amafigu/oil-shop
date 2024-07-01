import { ChangeEvent, Dispatch, SetStateAction } from "react"

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
