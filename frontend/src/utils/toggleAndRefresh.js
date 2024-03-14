export const toggleAndRefresh = (setShowItem, showItem, setRefreshCounter) => {
  setShowItem((prevState) => !prevState)
  if (!showItem) {
    setRefreshCounter((prevCounter) => prevCounter + 1)
  }
}
