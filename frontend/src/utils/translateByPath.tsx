/* eslint-disable @typescript-eslint/no-explicit-any */
export const translateByPath = (
  translationObj: { [key: string]: any },
  path: string,
) => {
  const splitedPathArray = path.split(".")
  const reducedObj = splitedPathArray.reduce(
    (acc, property) => (acc ? acc[property] : undefined),
    translationObj,
  )
  return reducedObj
}
