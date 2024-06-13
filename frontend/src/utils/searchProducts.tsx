export const searchProducts = (
  e,
  items,
  setSearchItemText,
  setMatches,
  setShowMatchedItemsList,
) => {
  setSearchItemText(e.target.value)
  const match = items.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase()),
  )
  if (e.target.value === "") {
    setMatches([])
  } else {
    setMatches(match.slice(0, 6))
    setShowMatchedItemsList(true)
  }
}
