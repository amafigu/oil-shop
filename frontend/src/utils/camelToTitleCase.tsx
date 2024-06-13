export const camelToTitleCase = (str) => {
  if (!str) return str
  const spaced = str.replace(/([A-Z])/g, " $1").trim()

  return spaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
