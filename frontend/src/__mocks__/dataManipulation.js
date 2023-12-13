export const updateDataAndSetStates = async (
  e,
  propertyName,
  dataId,
  dataApi,
  setNonUpdatedData,
  updatedData,
  setUpdatedData,
) => {
  e.preventDefault()

  setUpdatedData((prevData) => ({
    ...prevData,
    [propertyName]: updatedData[propertyName],
  }))
  setNonUpdatedData((prevData) => ({
    ...prevData,
    [propertyName]: updatedData[propertyName],
  }))

  console.log("updatedData", updatedData)

  return {
    status: 200,
    data: {
      user: updatedData,
    },
  }
}
