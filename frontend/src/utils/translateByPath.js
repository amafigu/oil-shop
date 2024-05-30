export const translateByPath = (translationObj, path) => {
  const splitedPathArray = path.split(".")
  const reducedObj = splitedPathArray.reduce(
    (acc, property) => (acc ? acc[property] : undefined),
    translationObj,
  )
  return reducedObj
}
