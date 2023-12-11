export const titleCase = (str, separator) => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const camelCaseToTitleCase = (str) => {
  const spaced = str.replace(/([A-Z])/g, " $1").trim()

  return spaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export const convertIsoToLocaleDateString = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString("de-De", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
