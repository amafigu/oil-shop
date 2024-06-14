export const titleCase = (str: string, separator: string) => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
