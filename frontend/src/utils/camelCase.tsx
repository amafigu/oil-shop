export const camelCase = (str: string, separator: string) => {
  return str
    .split(separator)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("")
}
