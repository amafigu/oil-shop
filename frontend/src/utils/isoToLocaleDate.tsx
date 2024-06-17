export const isoToLocaleDate = (isoDate: string) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString("de-De", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
