/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react"

export const listenInput = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  updatedDataObj: { [key: string]: any },
  setUpdatedDataObj: React.Dispatch<
    React.SetStateAction<{ [key: string]: any }>
  >,
) => {
  setUpdatedDataObj({
    ...updatedDataObj,
    [e.target.name]: e.target.value,
  })
}
