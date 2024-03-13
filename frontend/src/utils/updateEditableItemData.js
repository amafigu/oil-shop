export const updateEditableItemData = (
  setUpdatedItemData,
  setNonUpdatedItemData,
  updatedData,
  setCounter,
) => {
  setUpdatedItemData(updatedData)
  setNonUpdatedItemData(updatedData)
  if (setCounter) {
    setCounter((prevState) => prevState + 1)
  }
}
