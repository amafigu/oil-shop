export const translateByPath = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translationObj: { [key: string]: any },
  path: string,
): string => {
  const splitedPathArray = path.split(".")
  const reducedObj = splitedPathArray.reduce(
    (acc, property) => (acc ? acc[property] : undefined),
    translationObj,
  )
  return typeof reducedObj === "string" ? reducedObj : path
}
